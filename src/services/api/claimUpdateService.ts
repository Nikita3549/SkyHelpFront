
import { supabase, Claim } from '@/lib/supabase';
import { baseApiClient } from './baseApiClient';

/**
 * Service for updating claims
 */
export const claimUpdateService = {
  /**
   * Update an existing claim
   * @param id Claim ID to update
   * @param updates Partial claim data to update
   * @returns Promise with updated claim
   */
  updateClaim: async (id: string, updates: Partial<Claim>): Promise<Claim> => {
    console.log('Updating claim with data:', updates);
    
    // Ensure we're updating lastupdated (not lastUpdated)
    const updatedData = {
      ...updates,
      lastupdated: updates.lastupdated || new Date().toISOString().split('T')[0]
    };
    
    const { data, error } = await supabase
      .from('claims')
      .update(updatedData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      baseApiClient.logError('Error updating claim', error);
      throw error;
    }
    
    return data;
  }
};
