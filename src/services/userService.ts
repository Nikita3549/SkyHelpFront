
import { supabase } from '@/lib/supabase';

export const userService = {
  // Create a user account for a guest who submitted a claim
  async createUserFromClaim(email: string, firstName: string, lastName: string, claimId: string): Promise<string | null> {
    try {
      const { data, error } = await supabase.functions.invoke('create-user-and-send-email', {
        body: { email, firstName, lastName, claimId },
      });
      
      if (error) {
        console.error('Error creating user from claim:', error);
        throw error;
      }
      
      console.log('User creation response:', data);
      return data.userId || null;
    } catch (error) {
      console.error('Error in createUserFromClaim:', error);
      throw error;
    }
  },
  
  // Check if a user needs to reset their password (first login)
  async checkIfFirstLogin(): Promise<boolean> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return false;
      
      return user.user_metadata?.firstLogin === true;
    } catch (error) {
      console.error('Error checking if first login:', error);
      return false;
    }
  },
  
  // Update user metadata after first login
  async markFirstLoginComplete(): Promise<void> {
    try {
      await supabase.auth.updateUser({
        data: { firstLogin: false }
      });
    } catch (error) {
      console.error('Error marking first login complete:', error);
    }
  },
  
  // Change password for the current user
  async changePassword(newPassword: string): Promise<void> {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });
      
      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Error changing password:', error);
      throw error;
    }
  }
};
