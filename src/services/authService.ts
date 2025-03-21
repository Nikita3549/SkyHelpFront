
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export const authService = {
  // Get current session
  async getCurrentSession() {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) {
      console.error('Error getting session:', error);
      return null;
    }
    return session;
  },

  // Get current user
  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) {
      console.error('Error getting user:', error);
      return null;
    }
    return user;
  },

  // Register new user
  async register(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    
    if (error) {
      console.error('Error during registration:', error);
      throw error;
    }
    
    return data;
  },

  // Login user
  async login(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      console.error('Error during login:', error);
      throw error;
    }
    
    return data;
  },

  // Logout user
  async logout() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error during logout:', error);
      throw error;
    }
  },

  // Reset password
  async requestPasswordReset(email: string) {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    
    if (error) {
      console.error('Error requesting password reset:', error);
      throw error;
    }
    
    return data;
  },

  // Update password
  async updatePassword(newPassword: string) {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    
    if (error) {
      console.error('Error updating password:', error);
      throw error;
    }
    
    return data;
  }
};
