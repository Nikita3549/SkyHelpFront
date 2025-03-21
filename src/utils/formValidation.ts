
import { z } from "zod";

export const newClaimSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(1, "Phone number is required"),
  address: z.string().min(1, "Address is required"),
  numberOfPassengers: z.string().min(1, "Number of passengers is required"),
  
  airline: z.string().min(1, "Airline is required"),
  flightnumber: z.string().min(1, "Flight number is required"),
  departureAirport: z.string().min(1, "Departure airport is required"),
  arrivalAirport: z.string().min(1, "Arrival airport is required"),
  flightIssue: z.string().min(1, "Please select what happened with the flight"),
  reasonGivenByAirline: z.string().optional(),
  
  date: z.date(),
  amount: z.string().min(1, "Amount is required"),
  additionalInformation: z.string().optional(),
  
  paymentMethod: z.string().min(1, "Payment method is required"),
  // Bank Transfer fields
  bankName: z.string().optional(),
  accountHolderName: z.string().optional(),
  iban: z.string().optional(),
  accountNumber: z.string().optional(),
  // PayPal fields
  paypalEmail: z.string().optional(),
  // Wise fields
  wiseAccountHolder: z.string().optional(),
  wiseIbanOrAccount: z.string().optional(),
  wiseEmail: z.string().optional(),
});

export type ClaimFormData = z.infer<typeof newClaimSchema>;
