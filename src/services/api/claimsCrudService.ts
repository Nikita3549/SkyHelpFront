import { supabase, Claim } from '@/lib/supabase';
import { baseApiClient } from './baseApiClient';

/**
 * CRUD operations for claims
 */
export const claimsCrudService = {
  /**
   * Fetch all claims
   * @returns Promise with array of claims
   */
  getClaims: async (): Promise<Claim[]> => {
    const { data, error } = await supabase
      .from('claims')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      baseApiClient.logError('Error fetching claims', error);
      throw error;
    }

    return data || [];
  },

  /**
   * Delete a claim by ID
   * @param id Claim ID to delete
   */
  deleteClaim: async (id: string): Promise<void> => {
    const { error } = await supabase.from('claims').delete().eq('id', id);

    if (error) {
      baseApiClient.logError('Error deleting claim', error);
      throw error;
    }
  },
};
