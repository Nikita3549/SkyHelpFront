
import { supabase, Claim } from '@/lib/supabase';

export const claimsService = {
  // Fetch all claims for admin
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
  
  // Fetch claims for the current user
  async getUserClaims(): Promise<Claim[]> {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('No authenticated user found');
    }
    
    const { data, error } = await supabase
      .from('claims')
      .select('*')
      .eq('customer', user.id)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching user claims:', error);
      throw error;
    }
    
    return data || [];
  },
  
  // Fetch a single claim
  async getClaim(id: string): Promise<Claim> {
    const { data, error } = await supabase
      .from('claims')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Error fetching claim:', error);
      throw error;
    }
    
    return data;
  },
  
  // Create a new claim for authenticated user
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
    firstName?: string;
    lastName?: string;
  }): Promise<Claim> {
    console.log('Creating claim with data:', claim);
    
    // Get the current user
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('No authenticated user found');
    }
    
    // Construct the customer name from first and last name if provided, otherwise use email
    const customerName = claim.firstName && claim.lastName 
      ? `${claim.firstName} ${claim.lastName}`
      : user.email?.split('@')[0] || 'Unknown';
    
    // Convert camelCase fields to lowercase to match database column names
    const formattedClaim = {
      id: claim.id,
      customer: user.id, // Store user ID for RLS
      email: claim.email || user.email,
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
  }
};
