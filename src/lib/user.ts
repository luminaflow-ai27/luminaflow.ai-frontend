import { supabaseAdmin, User } from './supabase';

export interface AuthUser {
  id: string;
  email: string;
  role: 'user' | 'admin';
  subscription?: any;
}

/**
 * Get user from Supabase by ID
 */
export async function getUserById(userId: string): Promise<User | null> {
  const { data, error } = await supabaseAdmin
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();

  if (error || !data) {
    return null;
  }

  return data as User;
}

/**
 * Get user with subscription details
 */
export async function getUserWithSubscription(userId: string) {
  const { data, error } = await supabaseAdmin
    .from('users')
    .select(`
      *,
      subscription:subscriptions!subscriptions_user_id_fkey(
        *,
        plan:plans(*)
      )
    `)
    .eq('id', userId)
    .single();

  if (error || !data) {
    return null;
  }

  return data;
}

/**
 * Verify if user is admin
 */
export async function isAdmin(userId: string): Promise<boolean> {
  const user = await getUserById(userId);
  return user?.role === 'admin';
}

/**
 * Check if user has active subscription
 */
export async function hasActiveSubscription(userId: string): Promise<boolean> {
  const { data, error } = await supabaseAdmin
    .from('subscriptions')
    .select('status')
    .eq('user_id', userId)
    .eq('status', 'active')
    .single();

  return !error && !!data;
}

/**
 * Create or update user from Whop webhook
 */
export async function syncUserFromWhop(whopData: {
  user_id: string;
  email: string;
  subscription_id?: string;
  plan_id?: string;
}): Promise<User | null> {
  try {
    // Check if user exists
    const { data: existingUser } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('whop_user_id', whopData.user_id)
      .single();

    if (existingUser) {
      // Update existing user
      const { data, error } = await supabaseAdmin
        .from('users')
        .update({
          email: whopData.email,
          status: 'active',
          updated_at: new Date().toISOString()
        })
        .eq('whop_user_id', whopData.user_id)
        .select()
        .single();

      if (error) throw error;
      return data as User;
    } else {
      // Create new user in auth
      const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
        email: whopData.email,
        email_confirm: true
      });

      if (authError) throw authError;

      // Create user profile
      const { data, error } = await supabaseAdmin
        .from('users')
        .insert({
          id: authData.user.id,
          email: whopData.email,
          whop_user_id: whopData.user_id,
          status: 'active',
          role: 'user'
        })
        .select()
        .single();

      if (error) throw error;
      return data as User;
    }
  } catch (error) {
    console.error('Error syncing user from Whop:', error);
    return null;
  }
}

/**
 * Admin emails check
 */
export function isAdminEmail(email: string): boolean {
  const adminEmails = process.env.ADMIN_EMAILS?.split(',').map(e => e.trim()) || [];
  return adminEmails.includes(email);
}