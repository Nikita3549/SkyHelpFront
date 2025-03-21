
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

// Используем переменные окружения, предоставленные Lovable для Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
