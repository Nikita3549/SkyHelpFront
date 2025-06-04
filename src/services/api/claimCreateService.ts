import { supabase, Claim } from '@/lib/supabase';
import { baseApiClient } from './baseApiClient';

/**
 * Service for creating claims
 */
export const claimCreateService = {
  /**
   * Create a new claim
   * @param claim Claim data to create
   * @returns Promise with created claim
   */
  createClaim: async (
    claim: Omit<Claim, 'created_at'> & {
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
    },
  ): Promise<Claim> => {
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
      paymentdetails: claim.paymentDetails,
    };

    // Insert the formatted claim
    const { data, error } = await supabase
      .from('claims')
      .insert(formattedClaim)
      .select()
      .single();

    if (error) {
      baseApiClient.logError('Error creating claim', error);
      throw error;
    }

    return data;
  },
};
