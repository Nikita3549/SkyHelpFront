
import { supabase, Claim } from '@/lib/supabase';

export const claimsService = {
  // Fetch all claims
  async getClaims(): Promise<Claim[]> {
    console.log("Fetching claims from Supabase...");
    
    try {
      // Add a small delay to ensure any recent inserts are visible
      // This is a workaround for potential eventual consistency issues
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const { data, error } = await supabase
        .from('claims')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching claims:', error);
        throw error;
      }
      
      console.log(`Retrieved ${data?.length || 0} claims from database:`, data);
      return data || [];
    } catch (error) {
      console.error('Failed to fetch claims:', error);
      throw error;
    }
  },
  
  // Create a new claim
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
    
    // Ensure date is properly formatted for DB
    let formattedDate = claim.date;
    if (formattedDate && !formattedDate.includes('.')) {
      // Convert YYYY-MM-DD to DD.MM.YY
      const dateObj = new Date(formattedDate);
      const day = dateObj.getDate().toString().padStart(2, '0');
      const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
      const year = dateObj.getFullYear().toString().slice(2);
      formattedDate = `${day}.${month}.${year}`;
    }
    
    // Convert camelCase fields to lowercase to match database column names
    const formattedClaim = {
      id: claim.id,
      customer: claim.customer,
      email: claim.email,
      airline: claim.airline,
      flightnumber: claim.flightnumber,
      date: formattedDate,
      status: claim.status || 'pending', // Set default status if not provided
      stage: claim.stage || 'initial_review', // Set default stage if not provided
      amount: claim.amount,
      lastupdated: claim.lastupdated || new Date().toISOString().split('T')[0], // Set current date if not provided
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
    
    console.log('Formatted claim for database:', formattedClaim);
    
    try {
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
      
      console.log('Claim created successfully:', data);
      return data;
    } catch (error) {
      console.error('Failed to create claim:', error);
      throw error;
    }
  },
  
  // Update a claim
  async updateClaim(id: string, updates: Partial<Claim>): Promise<Claim> {
    console.log('Updating claim with data:', updates);
    
    // Ensure we're updating lastupdated (not lastUpdated)
    const updatedData = {
      ...updates,
      lastupdated: updates.lastupdated || new Date().toISOString().split('T')[0]
    };
    
    try {
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
      
      console.log('Claim updated successfully:', data);
      return data;
    } catch (error) {
      console.error('Failed to update claim:', error);
      throw error;
    }
  },
  
  // Delete a claim
  async deleteClaim(id: string): Promise<void> {
    console.log('Deleting claim with ID:', id);
    
    try {
      const { error } = await supabase
        .from('claims')
        .delete()
        .eq('id', id);
      
      if (error) {
        console.error('Error deleting claim:', error);
        throw error;
      }
      
      console.log('Claim deleted successfully');
    } catch (error) {
      console.error('Failed to delete claim:', error);
      throw error;
    }
  }
};
