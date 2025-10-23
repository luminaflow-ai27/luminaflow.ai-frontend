import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin, User, Subscription, Plan } from '@/lib/supabase'

export interface QuotaCheck {
  allowed: boolean;
  remaining?: number;
  limit?: number;
  resetDate?: Date;
  message?: string;
}

export class QuotaService {
  /**
   * Check if user has exceeded their quota for a specific action
   */
  static async checkQuota(
    userId: string,
    action: string,
    count: number = 1
  ): Promise<QuotaCheck> {
    try {
      // Get user's current subscription
      const { data: subscription, error: subError } = await supabaseAdmin
        .from('subscriptions')
        .select(`
          *,
          plan:plans(*)
        `)
        .eq('user_id', userId)
        .eq('status', 'active')
        .single();

      if (subError || !subscription) {
        return {
          allowed: false,
          message: 'No active subscription found'
        };
      }

      const plan = subscription.plan as Plan;
      const quotas = subscription.custom_quotas || plan.quotas;

      // Determine which quota to check based on action
      let quotaKey: string | null = null;
      let quotaLimit: number = 0;

      switch (action) {
        case 'api_call':
          quotaKey = 'api_calls';
          quotaLimit = quotas.api_calls;
          break;
        case 'create_item':
        case 'update_item':
          quotaKey = 'api_calls';
          quotaLimit = quotas.api_calls;
          break;
        case 'add_team_member':
          quotaKey = 'team_members';
          quotaLimit = quotas.team_members;
          break;
        case 'add_integration':
          quotaKey = 'integrations';
          quotaLimit = quotas.integrations;
          break;
        default:
          // Unknown action, allow by default
          return { allowed: true };
      }

      // -1 means unlimited
      if (quotaLimit === -1) {
        return { allowed: true, limit: -1 };
      }

      // Get current usage for this billing period
      const billingPeriodStart = new Date(subscription.start_date);
      const now = new Date();
      
      // Calculate period start (monthly reset)
      const currentPeriodStart = new Date(
        now.getFullYear(),
        now.getMonth(),
        billingPeriodStart.getDate()
      );
      
      if (currentPeriodStart > now) {
        currentPeriodStart.setMonth(currentPeriodStart.getMonth() - 1);
      }

      const { data: usageLogs, error: usageError } = await supabaseAdmin
        .from('usage_logs')
        .select('count')
        .eq('user_id', userId)
        .eq('action', action)
        .gte('created_at', currentPeriodStart.toISOString());

      if (usageError) {
        console.error('Error fetching usage:', usageError);
        return { allowed: false, message: 'Error checking quota' };
      }

      const currentUsage = usageLogs?.reduce((sum, log) => sum + log.count, 0) || 0;
      const remaining = quotaLimit - currentUsage;

      if (currentUsage + count > quotaLimit) {
        return {
          allowed: false,
          remaining: Math.max(0, remaining),
          limit: quotaLimit,
          message: `Quota exceeded. You have used ${currentUsage} of ${quotaLimit} ${quotaKey}.`
        };
      }

      // Calculate next reset date
      const nextResetDate = new Date(currentPeriodStart);
      nextResetDate.setMonth(nextResetDate.getMonth() + 1);

      return {
        allowed: true,
        remaining: remaining - count,
        limit: quotaLimit,
        resetDate: nextResetDate
      };
    } catch (error) {
      console.error('Quota check error:', error);
      return {
        allowed: false,
        message: 'Internal error checking quota'
      };
    }
  }

  /**
   * Log usage after successful operation
   */
  static async logUsage(
    userId: string,
    action: string,
    resourceType?: string,
    count: number = 1,
    metadata: any = {}
  ): Promise<void> {
    try {
      await supabaseAdmin.from('usage_logs').insert({
        user_id: userId,
        action,
        resource_type: resourceType,
        count,
        metadata
      });
    } catch (error) {
      console.error('Error logging usage:', error);
    }
  }

  /**
   * Get usage statistics for a user
   */
  static async getUsageStats(userId: string, periodStart?: Date) {
    const startDate = periodStart || new Date();
    startDate.setDate(1); // First day of current month
    startDate.setHours(0, 0, 0, 0);

    const { data: logs, error } = await supabaseAdmin
      .from('usage_logs')
      .select('action, count, created_at')
      .eq('user_id', userId)
      .gte('created_at', startDate.toISOString())
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching usage stats:', error);
      return null;
    }

    // Aggregate by action
    const stats: { [key: string]: number } = {};
    logs?.forEach(log => {
      if (!stats[log.action]) {
        stats[log.action] = 0;
      }
      stats[log.action] += log.count;
    });

    return stats;
  }

  /**
   * Reset quota for a user (admin function)
   */
  static async resetQuota(userId: string, action?: string): Promise<boolean> {
    try {
      let query = supabaseAdmin
        .from('usage_logs')
        .delete()
        .eq('user_id', userId);

      if (action) {
        query = query.eq('action', action);
      }

      const { error } = await query;
      return !error;
    } catch (error) {
      console.error('Error resetting quota:', error);
      return false;
    }
  }
}

/**
 * Middleware wrapper to enforce quotas
 */
export function withQuota(action: string, count: number = 1) {
  return async (
    request: NextRequest,
    handler: (request: NextRequest, userId: string) => Promise<NextResponse>
  ): Promise<NextResponse> => {
    try {
      // Extract user ID from request (assumes auth middleware has run)
      const userId = request.headers.get('x-user-id');
      
      if (!userId) {
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        );
      }

      // Check quota
      const quotaCheck = await QuotaService.checkQuota(userId, action, count);

      if (!quotaCheck.allowed) {
        return NextResponse.json(
          {
            error: 'Quota exceeded',
            message: quotaCheck.message,
            remaining: quotaCheck.remaining,
            limit: quotaCheck.limit
          },
          { status: 429 }
        );
      }

      // Execute handler
      const response = await handler(request, userId);

      // Log usage if successful
      if (response.status < 400) {
        await QuotaService.logUsage(userId, action, undefined, count);
      }

      // Add quota headers
      response.headers.set('X-RateLimit-Limit', quotaCheck.limit?.toString() || '0');
      response.headers.set('X-RateLimit-Remaining', quotaCheck.remaining?.toString() || '0');
      if (quotaCheck.resetDate) {
        response.headers.set('X-RateLimit-Reset', quotaCheck.resetDate.toISOString());
      }

      return response;
    } catch (error) {
      console.error('Quota middleware error:', error);
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
  };
}