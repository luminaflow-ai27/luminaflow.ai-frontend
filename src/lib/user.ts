import { supabaseAdmin } from '@/lib/supabase-admin';
import type { User, UserSettings } from '@/lib/supabase'; 

export class UserService {
  /**
   * Get user by ID using admin privileges
   */
  static async getUser(userId: string): Promise<User | null> {
    if (!userId) {
        console.error('getUser called with invalid userId');
        return null;
    }
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      if (error.code !== 'PGRST116') { // PGRST116 = Row not found
        console.error('Error fetching user:', error.message);
      }
      return null;
    }
    return data as User | null; 
  }

  /**
   * Get user by Whop user ID using admin privileges
   */
  static async getUserByWhopId(whopUserId: string): Promise<User | null> {
     if (!whopUserId) {
        console.error('getUserByWhopId called with invalid whopUserId');
        return null;
    }
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('whop_user_id', whopUserId)
      .maybeSingle();

    if (error) {
      console.error('Error fetching user by Whop ID:', error.message);
      return null;
    }
    return data as User | null;
  }

  /**
   * Get user settings using admin privileges
   */
  static async getUserSettings(userId: string): Promise<UserSettings | null> {
     if (!userId) {
        console.error('getUserSettings called with invalid userId');
        return null;
    }
    const { data, error } = await supabaseAdmin
      .from('user_settings')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();

    if (error) {
       if (error.code !== 'PGRST116') {
         console.error('Error fetching user settings:', error.message);
       }
      return null;
    }
    return data as UserSettings | null;
  }
}

/**
 * Checks if an email belongs to a configured admin.
 */
export function isAdminEmail(email: string): boolean {
  if (!email) return false;
  const adminEmailsRaw = process.env.ADMIN_EMAILS;
  if (!adminEmailsRaw) {
      console.warn("ADMIN_EMAILS environment variable not set.");
      return false;
  }

  const adminEmails = adminEmailsRaw.split(',').map(e => e.trim().toLowerCase());
  return adminEmails.includes(email.toLowerCase());
}