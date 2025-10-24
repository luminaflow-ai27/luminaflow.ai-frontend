import { createClient } from '@supabase/supabase-js';

// Environment validation
if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL');
}
if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

// Browser-safe Supabase client
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  }
);

// TypeScript Interfaces
export interface User {
  id: string;
  email: string;
  whop_user_id?: string;
  created_at: string;
  updated_at: string;
  metadata?: Record<string, any>;
}

export interface Plan {
  id: string;
  name: string;
  whop_plan_id: string;
  price: number;
  currency: string;
  interval: 'monthly' | 'yearly' | 'lifetime';
  features: Record<string, any>;
  quota_workflows?: number;
  quota_executions?: number;
  quota_api_calls?: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  plan_id: string;
  whop_subscription_id?: string;
  status: 'active' | 'canceled' | 'past_due' | 'trialing' | 'expired';
  current_period_start: string;
  current_period_end: string;
  cancel_at_period_end: boolean;
  created_at: string;
  updated_at: string;
}

export interface UsageLog {
  id: string;
  user_id: string;
  subscription_id?: string;
  resource_type: 'workflow' | 'execution' | 'api_call' | 'storage';
  amount: number;
  metadata?: Record<string, any>;
  created_at: string;
}

export interface Item {
  id: string;
  name: string;
  description?: string;
  type: 'product' | 'service' | 'addon';
  price: number;
  currency: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  user_id: string;
  item_id: string;
  whop_order_id?: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  metadata?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface UserSettings {
  id: string;
  user_id: string;
  theme?: 'light' | 'dark' | 'system';
  notifications_enabled: boolean;
  email_notifications: boolean;
  preferences?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface EnterpriseQuote {
  id: string;
  user_id?: string;
  company_name: string;
  contact_email: string;
  contact_name: string;
  phone?: string;
  requirements: string;
  estimated_workflows?: number;
  estimated_executions?: number;
  status: 'pending' | 'reviewing' | 'quoted' | 'accepted' | 'rejected';
  quoted_price?: number;
  notes?: string;
  created_at: string;
  updated_at: string;
}

// Helper type for joined queries
export interface SubscriptionWithPlan extends Subscription {
  plan: Plan;
}