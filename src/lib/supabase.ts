
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase';

// Use the Supabase URL and key from the integration
const supabaseUrl = "https://bzbtkaltmqlvautvdrsa.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ6YnRrYWx0bXFsdmF1dHZkcnNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0ODU1NzUsImV4cCI6MjA1ODA2MTU3NX0.X8TiUuupNWKG1rWWgSRUkqCvKOwkvSRZMdcd3L4F88g";

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
