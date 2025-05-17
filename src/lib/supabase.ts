
import { createClient } from '@supabase/supabase-js';

// Use the direct Supabase URL and anon key instead of environment variables
const supabaseUrl = "https://lyxhxlvshcsvoqdicqhm.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5eGh4bHZzaGNzdm9xZGljcWhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI1NDY3ODAsImV4cCI6MjA1ODEyMjc4MH0.pV26CUDC1Igsr2lKOB3AKGT3bAsqAB20YEw8PTyAzBU";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for our database tables
export type Claim = {
  id: string;
  customer: string;
  email: string;
  airline: string;
  flightnumber: string; 
  date: string;
  status: 'pending' | 'in_progress' | 'escalated' | 'completed' | 'rejected' | 'not_eligible';
  stage: string;
  amount: string;
  lastupdated: string;
  created_at?: string;
  // Additional fields with lowercase names to match database columns
  phone?: string;
  address?: string;
  numberofpassengers?: string;
  departureairport?: string;
  arrivalairport?: string;
  flightissue?: string;
  reasongivenbyairline?: string;
  additionalinformation?: string;
  paymentmethod?: string;
  paymentdetails?: any;
  communicationlog?: string; // Field for storing communication history (emails and messages)
  progressSteps?: string; // Field for storing claim progress steps as JSON string
};
