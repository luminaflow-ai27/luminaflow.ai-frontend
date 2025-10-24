// src/lib/quota.ts

import { supabaseAdmin } from "./supabase-admin"
import type { Subscription, Plan } from "./supabase"

export interface QuotaCheckResult {
  allowed: boolean
  remaining: number
  limit: number
  usage: number
  resetDate?: Date
  message?: string
}

export class QuotaService {
  /**
   * Checks quota for a given user and action.
   */
  static async checkQuota(
    userId: string,
    action: keyof Plan['quotas']
  ): Promise<QuotaCheckResult> {

    if (!userId) {
      console.error('checkQuota called with null or undefined userId');
      return { allowed: false, remaining: 0, limit: 0, usage: 0, message: "Invalid user ID provided." };
    }

    const { data: subscriptionData, error: subError } = await supabaseAdmin
      .from('subscriptions')
      .select(`
        status,
        end_date,
        plan: plans ( quotas )
      `)
      .eq('user_id', userId)
      .eq('status', 'active')
      .maybeSingle();

    if (subError) {
      console.error(`Error fetching active subscription for user ${userId}:`, subError.message);
      return { allowed: false, remaining: 0, limit: 0, usage: 0, message: "Error fetching subscription details." };
    }

    // ✅ FIX IS HERE: Access the first element of the 'plan' array
    const planQuotas = (subscriptionData?.plan as any)?.[0]?.quotas as Plan['quotas'] | undefined;

    if (!subscriptionData || !planQuotas) {
      console.warn(`No active subscription or plan quotas found for user ${userId}.`);
      return { allowed: false, remaining: 0, limit: 0, usage: 0, message: "No active subscription or plan found." };
    }

    const limit = planQuotas[action] ?? 0;

    if (limit === -1) {
        return { allowed: true, remaining: Infinity, limit: -1, usage: 0, message: "Unlimited quota." };
    }

    const { count: usageCount, error: countError } = await supabaseAdmin
      .from('usage_logs')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('action', action);

    if (countError) {
        console.error(`Error counting usage logs for user ${userId}, action ${String(action)}:`, countError.message);
        return { allowed: false, remaining: 0, limit, usage: 0, message: "Error checking usage." };
    }

    const used = usageCount ?? 0;
    const remaining = Math.max(limit - used, 0);

    return {
      allowed: remaining > 0,
      remaining,
      limit,
      usage: used,
      resetDate: subscriptionData.end_date ? new Date(subscriptionData.end_date) : undefined,
    };
  }
}