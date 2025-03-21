
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      claims: {
        Row: {
          id: string
          created_at: string
          customer: string
          email: string
          airline: string
          flight_number: string
          departure_date: string
          status: 'pending' | 'in_progress' | 'approved' | 'rejected'
          stage: 'initial_review' | 'documentation' | 'airline_submission' | 'negotiation' | 'payment'
          amount: string
          last_updated: string
          user_id?: string
          disruption_type: string
          departure_airport: string
          arrival_airport: string
          notes?: string
        }
        Insert: {
          id?: string
          created_at?: string
          customer: string
          email: string
          airline: string
          flight_number: string
          departure_date: string
          status?: 'pending' | 'in_progress' | 'approved' | 'rejected'
          stage?: 'initial_review' | 'documentation' | 'airline_submission' | 'negotiation' | 'payment'
          amount: string
          last_updated?: string
          user_id?: string
          disruption_type: string
          departure_airport: string
          arrival_airport: string
          notes?: string
        }
        Update: {
          id?: string
          created_at?: string
          customer?: string
          email?: string
          airline?: string
          flight_number?: string
          departure_date?: string
          status?: 'pending' | 'in_progress' | 'approved' | 'rejected'
          stage?: 'initial_review' | 'documentation' | 'airline_submission' | 'negotiation' | 'payment'
          amount?: string
          last_updated?: string
          user_id?: string
          disruption_type?: string
          departure_airport?: string
          arrival_airport?: string
          notes?: string
        }
      }
      profiles: {
        Row: {
          id: string
          created_at: string
          first_name: string
          last_name: string
          email: string
          phone: string
          address: string
        }
        Insert: {
          id: string
          created_at?: string
          first_name: string
          last_name: string
          email: string
          phone: string
          address: string
        }
        Update: {
          id?: string
          created_at?: string
          first_name?: string
          last_name?: string
          email?: string
          phone?: string
          address?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
