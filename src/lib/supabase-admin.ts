import { createClient } from '@supabase/supabase-js';

// Environment validation
if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL');
}
if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY - this is required for admin operations');
}

// Server-only admin client with service role key
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

// Re-export types for convenience
export type {
  User,
  Plan,
  Subscription,
  UsageLog,
  Item,
  Order,
  UserSettings,
  EnterpriseQuote,
  SubscriptionWithPlan
} from './supabase';