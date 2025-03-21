
import { createClient } from '@supabase/supabase-js';

// Replace these with your Supabase URL and anon key
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase credentials missing. Please check your environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for our database tables
export type Claim = {
  id: string;
  customer: string;
  email: string;
  airline: string;
  flightNumber: string;
  date: string;
  status: 'pending' | 'in_progress' | 'escalated' | 'completed' | 'rejected';
  stage: string;
  amount: string;
  lastUpdated: string;
  created_at?: string;
};
