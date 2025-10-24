import { supabaseAdmin } from './supabase-admin';
import type { User, UserSettings } from './supabase';

/**
 * Check if email is an admin email
 */
export function isAdminEmail(email: string): boolean {
  const adminEmails = process.env.ADMIN_EMAILS?.split(',') || [];
  return adminEmails.includes(email.toLowerCase().trim());
}

export class UserService {
  /**
   * Get user by ID with admin privileges
   */
  static async getUser(userId: string): Promise<User | null> {
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching user:', error);
      return null;
    }

    return data;
  }

  /**
   * Get user by Whop user ID
   */
  static async getUserByWhopId(whopUserId: string): Promise<User | null> {
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('whop_user_id', whopUserId)
      .single();

    if (error) {
      console.error('Error fetching user by Whop ID:', error);
      return null;
    }

    return data;
  }

  /**
   * Get user by email
   */
  static async getUserByEmail(email: string): Promise<User | null> {
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error) {
      console.error('Error fetching user by email:', error);
      return null;
    }

    return data;
  }

  /**
   * Create or update user from Whop webhook
   */
  static async upsertUser(userData: {
    id?: string;
    email: string;
    whop_user_id: string;
    metadata?: Record<string, any>;
  }): Promise<User | null> {
    const { data, error } = await supabaseAdmin
      .from('users')
      .upsert(
        {
          ...userData,
          updated_at: new Date().toISOString()
        },
        {
          onConflict: 'whop_user_id'
        }
      )
      .select()
      .single();

    if (error) {
      console.error('Error upserting user:', error);
      return null;
    }

    return data;
  }

  /**
   * Get user settings
   */
  static async getUserSettings(userId: string): Promise<UserSettings | null> {
    const { data, error } = await supabaseAdmin
      .from('user_settings')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) {
      console.error('Error fetching user settings:', error);
      return null;
    }

    return data;
  }

  /**
   * Create default settings for new user
   */
  static async createDefaultSettings(userId: string): Promise<UserSettings | null> {
    const { data, error } = await supabaseAdmin
      .from('user_settings')
      .insert({
        user_id: userId,
        theme: 'system',
        notifications_enabled: true,
        email_notifications: true,
        preferences: {}
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating user settings:', error);
      return null;
    }

    return data;
  }

  /**
   * Update user settings
   */
  static async updateSettings(
    userId: string,
    settings: Partial<UserSettings>
  ): Promise<UserSettings | null> {
    const { data, error } = await supabaseAdmin
      .from('user_settings')
      .update({
        ...settings,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', userId)
      .select()
      .single();

    if (error) {
      console.error('Error updating user settings:', error);
      return null;
    }

    return data;
  }
}