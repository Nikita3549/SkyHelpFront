
import { supabase, Claim } from '@/lib/supabase';

export const claimsService = {
  // Fetch all claims
  async getClaims(): Promise<Claim[]> {
    const { data, error } = await supabase
      .from('claims')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching claims:', error);
      throw error;
    }
    
    return data || [];
  },
  
  // Create a new claim
  async createClaim(claim: Omit<Claim, 'created_at'>): Promise<Claim> {
    // Make sure the object properties match the database column names
    const { data, error } = await supabase
      .from('claims')
      .insert(claim)
      .select()
      .single();
    
    if (error) {
      console.error('Error creating claim:', error);
      throw error;
    }
    
    return data;
  },
  
  // Update a claim
  async updateClaim(id: string, updates: Partial<Claim>): Promise<Claim> {
    // Ensure we're updating lastupdated (not lastUpdated)
    const updatedData = {
      ...updates,
      lastupdated: new Date().toISOString().split('T')[0]
    };
    
    const { data, error } = await supabase
      .from('claims')
      .update(updatedData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating claim:', error);
      throw error;
    }
    
    return data;
  },
  
  // Delete a claim
  async deleteClaim(id: string): Promise<void> {
    const { error } = await supabase
      .from('claims')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting claim:', error);
      throw error;
    }
  }
};
