
import { supabase, Claim } from '@/lib/supabase';
import { toast } from "sonner";

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
  
  // Fetch claims for a specific user
  async getUserClaims(email: string): Promise<Claim[]> {
    const { data, error } = await supabase
      .from('claims')
      .select('*')
      .eq('email', email)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching user claims:', error);
      throw error;
    }
    
    return data || [];
  },

  // Create a new claim and link to user account
  async createClaim(claim: Omit<Claim, 'created_at'> & { 
    phone?: string; 
    address?: string;
    numberOfPassengers?: string;
    departureAirport?: string;
    arrivalAirport?: string;
    flightIssue?: string;
    reasonGivenByAirline?: string;
    additionalInformation?: string;
    paymentMethod?: string;
    paymentDetails?: any;
  }): Promise<Claim> {
    console.log('Creating claim with data:', claim);
    
    // Convert camelCase fields to lowercase to match database column names
    const formattedClaim = {
      id: claim.id,
      customer: claim.customer,
      email: claim.email,
      airline: claim.airline,
      flightnumber: claim.flightnumber,
      date: claim.date,
      status: claim.status,
      stage: claim.stage,
      amount: claim.amount,
      lastupdated: claim.lastupdated,
      // Convert camelCase to lowercase for all the new fields
      phone: claim.phone,
      address: claim.address,
      numberofpassengers: claim.numberOfPassengers,
      departureairport: claim.departureAirport,
      arrivalairport: claim.arrivalAirport,
      flightissue: claim.flightIssue,
      reasongivenbyairline: claim.reasonGivenByAirline,
      additionalinformation: claim.additionalInformation,
      paymentmethod: claim.paymentMethod,
      paymentdetails: claim.paymentDetails
    };
    
    // Insert the formatted claim
    const { data, error } = await supabase
      .from('claims')
      .insert(formattedClaim)
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
  },

  // Create an account or get magic link for existing account
  async createOrSignInUser(email: string): Promise<void> {
    // Check if user already exists
    const { data: existingUsers, error: checkError } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();
    
    if (checkError && checkError.code !== 'PGRST116') { // PGRST116 = not found
      console.error('Error checking for existing user:', checkError);
      throw checkError;
    }

    // Send magic link to user's email
    const { error } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
      },
    });

    if (error) {
      console.error('Error sending magic link:', error);
      throw error;
    }

    toast.success("Sign-in link sent", {
      description: `We've sent a login link to ${email}. Check your inbox to sign in.`,
    });
  }
};
