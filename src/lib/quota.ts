import { supabaseAdmin } from './supabase-admin';
import type { Subscription, Plan, UsageLog } from './supabase';

export interface QuotaCheckResult {
  allowed: boolean;
  remaining: number;
  limit: number;
  usage: number;
  resetDate: string;
}

export class QuotaService {
  /**
   * Check if user has quota available for a resource type
   */
  static async checkQuota(
    userId: string,
    resourceType: 'workflow' | 'execution' | 'api_call',
    amount: number = 1
  ): Promise<QuotaCheckResult> {
    // Get active subscription with plan details
    const { data: subscription, error: subError } = await supabaseAdmin
      .from('subscriptions')
      .select('*, plan:plans(*)')
      .eq('user_id', userId)
      .eq('status', 'active')
      .single();

    if (subError || !subscription) {
      console.error('No active subscription found:', subError);
      return {
        allowed: false,
        remaining: 0,
        limit: 0,
        usage: 0,
        resetDate: new Date().toISOString()
      };
    }

    const plan = (subscription as any).plan as Plan;
    
    // Determine quota limit based on resource type
    let quotaLimit = 0;
    switch (resourceType) {
      case 'workflow':
        quotaLimit = plan.quota_workflows || 0;
        break;
      case 'execution':
        quotaLimit = plan.quota_executions || 0;
        break;
      case 'api_call':
        quotaLimit = plan.quota_api_calls || 0;
        break;
    }

    // Unlimited quota (0 or null means unlimited)
    if (quotaLimit === 0 || quotaLimit === null) {
      return {
        allowed: true,
        remaining: -1, // Indicates unlimited
        limit: -1,
        usage: 0,
        resetDate: subscription.current_period_end
      };
    }

    // Get usage for current period
    const { data: usageLogs, error: usageError } = await supabaseAdmin
      .from('usage_logs')
      .select('amount')
      .eq('user_id', userId)
      .eq('resource_type', resourceType)
      .gte('created_at', subscription.current_period_start)
      .lte('created_at', subscription.current_period_end);

    if (usageError) {
      console.error('Error fetching usage logs:', usageError);
      return {
        allowed: false,
        remaining: 0,
        limit: quotaLimit,
        usage: 0,
        resetDate: subscription.current_period_end
      };
    }

    // Calculate total usage
    const totalUsed = usageLogs?.reduce((sum, log) => sum + log.amount, 0) || 0;
    const remaining = quotaLimit - totalUsed;

    return {
      allowed: remaining >= amount,
      remaining: Math.max(0, remaining),
      limit: quotaLimit,
      usage: totalUsed,
      resetDate: subscription.current_period_end
    };
  }

  /**
   * Log usage for a resource
   */
  static async logUsage(
    userId: string,
    resourceType: 'workflow' | 'execution' | 'api_call' | 'storage',
    amount: number = 1,
    metadata?: Record<string, any>
  ): Promise<UsageLog | null> {
    // Get subscription ID
    const { data: subscription } = await supabaseAdmin
      .from('subscriptions')
      .select('id')
      .eq('user_id', userId)
      .eq('status', 'active')
      .single();

    const { data, error } = await supabaseAdmin
      .from('usage_logs')
      .insert({
        user_id: userId,
        subscription_id: subscription?.id,
        resource_type: resourceType,
        amount,
        metadata: metadata || {}
      })
      .select()
      .single();

    if (error) {
      console.error('Error logging usage:', error);
      return null;
    }

    return data;
  }

  /**
   * Get usage summary for current period
   */
  static async getUsageSummary(userId: string) {
    const { data: subscription } = await supabaseAdmin
      .from('subscriptions')
      .select('*, plan:plans(*)')
      .eq('user_id', userId)
      .eq('status', 'active')
      .single();

    if (!subscription) {
      return null;
    }

    const { data: usageLogs } = await supabaseAdmin
      .from('usage_logs')
      .select('resource_type, amount')
      .eq('user_id', userId)
      .gte('created_at', subscription.current_period_start)
      .lte('created_at', subscription.current_period_end);

    // Aggregate by resource type
    const summary = usageLogs?.reduce((acc, log) => {
      if (!acc[log.resource_type]) {
        acc[log.resource_type] = 0;
      }
      acc[log.resource_type] += log.amount;
      return acc;
    }, {} as Record<string, number>);

    const plan = (subscription as any).plan as Plan;

    return {
      workflows: {
        used: summary?.workflow || 0,
        limit: plan.quota_workflows || -1
      },
      executions: {
        used: summary?.execution || 0,
        limit: plan.quota_executions || -1
      },
      api_calls: {
        used: summary?.api_call || 0,
        limit: plan.quota_api_calls || -1
      },
      period_start: subscription.current_period_start,
      period_end: subscription.current_period_end
    };
  }

  /**
   * Reset usage for a user (typically called at period end)
   */
  static async resetUsage(userId: string): Promise<boolean> {
    const { error } = await supabaseAdmin
      .from('usage_logs')
      .delete()
      .eq('user_id', userId)
      .lt('created_at', new Date().toISOString());

    if (error) {
      console.error('Error resetting usage:', error);
      return false;
    }

    return true;
  }
}