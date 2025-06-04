import { supabase } from '@/lib/supabase';

/**
 * Base API client with common Supabase operations
 */
export const baseApiClient = {
  /**
   * Log an error to the console
   * @param message Error message prefix
   * @param error Error object
   */
  logError: (message: string, error: any): void => {
    console.error(`${message}:`, error);
  },
};
