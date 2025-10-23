import { createClient } from '@supabase/supabase-js';

// ❌ Removed the server-side Supabase client (supabaseAdmin)
// This must only be used in server-side code (API routes, Server Components)
// as it requires the SUPABASE_SERVICE_ROLE_KEY which is secret.

// Client-side Supabase client function (Correct - Keep this)
// This function uses the public keys and is safe for the browser.
export const createBrowserClient = () => {
  // Ensure the environment variables are actually loaded
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Supabase URL or Anon Key is missing in environment variables.");
  }

  return createClient(supabaseUrl, supabaseAnonKey);
};

// --- Database types (Keep these as they are useful) ---

export interface User {
  id: string;
  email: string;
  full_name?: string;
  role: 'user' | 'admin';
  whop_user_id?: string;
  subscription_id?: string;
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
    api_calls: number;
    storage_gb: number;
    team_members: number;
    integrations: number;
  };
  features: {
    [key: string]: boolean;
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
  status: 'active' | 'cancelled' | 'expired' | 'past_due';
  whop_subscription_id?: string;
  custom_price?: number;
  custom_quotas?: any;
  start_date: string;
  end_date?: string;
  cancel_at_period_end: boolean;
  cancelled_at?: string;
  created_at: string;
  updated_at: string;
  plan?: Plan;
}

// ... (keep the rest of your interfaces: UsageLog, Item, Order, UserSettings, EnterpriseQuote) ...
export interface UsageLog {
 id: string;
 user_id: string;
 action: string;
 resource_type?: string;
 count: number;
 metadata: any;
 created_at: string;
}

export interface Item {
 id: string;
 user_id: string;
 title: string;
 description?: string;
 status: 'active' | 'archived' | 'draft';
 metadata: any;
 created_at: string;
 updated_at: string;
}

export interface Order {
 id: string;
 user_id: string;
 order_number: string;
 amount: number;
 currency: string;
 status: 'pending' | 'completed' | 'failed' | 'refunded';
 whop_order_id?: string;
 metadata: any;
 created_at: string;
 updated_at: string;
}

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
 created_at: string;
 updated_at: string;
}

export interface EnterpriseQuote {
 id: string;
 email: string;
 company_name: string;
 seats: number;
 integrations: string[];
 compliance_needs: string[];
 estimated_price?: number;
 status: 'pending' | 'quoted' | 'accepted' | 'rejected';
 whop_checkout_url?: string;
 metadata: any;
 created_at: string;
 updated_at: string;
}