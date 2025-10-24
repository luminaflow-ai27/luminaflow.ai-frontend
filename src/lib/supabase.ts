import { createClient } from '@supabase/supabase-js';

// Environment validation for client-side keys
if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL');
}
if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

// Browser-safe Supabase client (uses anon key)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const createBrowserClient = () => {
  return createClient(supabaseUrl, supabaseAnonKey);
};

// --- Database types ---
// (Keep all your interfaces like User, Plan, Subscription, etc. here)
export interface User {
  id: string;
  email: string;
  full_name?: string;
  role: 'user' | 'admin';
  whop_user_id?: string;
  subscription_id?: string; // This might be better on the Subscription table
  status: 'trial' | 'active' | 'cancelled' | 'expired' | 'suspended';
  trial_ends_at?: string;
  created_at: string;
  updated_at: string;
}

export interface Plan {
  id: string;
  name: string;
  display_name: string;
  price: number;
  billing_period: 'monthly' | 'yearly';
  quotas: {
    // Define specific quota types
    api_calls?: number; // Example
    storage_gb?: number; // Example
    team_members?: number; // Example
    integrations?: number; // Example
    // Add other quota keys your plans use
    [key: string]: number | undefined; // Allow arbitrary keys but prefer specific ones
  };
  features: {
    [key: string]: boolean; // e.g., analytics: true
  };
  whop_plan_id?: string;
  is_custom: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  plan_id: string;
  status: 'active' | 'cancelled' | 'expired' | 'past_due' | 'trialing'; // Added trialing
  whop_subscription_id?: string;
  custom_price?: number;
  custom_quotas?: any; // Consider defining a structure if possible
  start_date: string; // Or Date
  end_date?: string; // Or Date (often current_period_end)
  cancel_at_period_end: boolean;
  cancelled_at?: string; // Or Date
  created_at: string; // Or Date
  updated_at: string; // Or Date
  plan?: Plan; // For joined queries
}

export interface UsageLog {
  id: string;
  user_id: string;
  action: string;
  resource_type?: string;
  count: number;
  metadata?: any;
  created_at: string; // Or Date
}

// Add other interfaces: Item, Order, UserSettings, EnterpriseQuote
export interface UserSettings {
 id: string;
 user_id: string;
 notifications: {
   email: boolean;
   push: boolean;
   marketing: boolean;
 };
 appearance: {
   theme: string;
   language: string;
 };
 security: {
   two_factor_enabled: boolean;
   session_timeout: number;
 };
 privacy: {
   profile_visibility: string;
   data_collection: boolean;
 };
 created_at: string; // Or Date
 updated_at: string; // Or Date
}

// Helper type for joined queries
export interface SubscriptionWithPlan extends Subscription {
  plan: Plan;
}

