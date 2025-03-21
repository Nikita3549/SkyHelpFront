
import { z } from "zod";

export const flightDetailsSchema = z.object({
  flightNumber: z.string().min(3, "Flight number must be at least 3 characters"),
  airline: z.string().min(2, "Please select an airline"),
  departureDate: z.string().min(1, "Please select a departure date"),
  departureAirport: z.string().min(2, "Please enter the departure airport"),
  arrivalAirport: z.string().min(2, "Please enter the arrival airport"),
  disruptionType: z.enum(["delay", "cancellation", "denied_boarding", "missed_connection"], {
    required_error: "Please select the type of disruption",
  }),
  delayDuration: z.string().optional(),
});

export const passengerDetailsSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(6, "Please enter a valid phone number"),
  passengers: z.string().min(1, "Please select the number of passengers"),
  address: z.string().min(5, "Please enter your address"),
});

export const disruptionDetailsSchema = z.object({
  delayDuration: z.string().optional(),
  actualDepartureTime: z.string().optional(),
  originalDepartureTime: z.string().optional(),
  reasonGiven: z.string().optional(),
  additionalInfo: z.string().optional(),
});

export const paymentDetailsSchema = z.object({
  paymentMethod: z.enum(["bank_transfer", "paypal", "wise"], {
    required_error: "Please select a payment method",
  }),
  bankName: z.string().optional(),
  accountName: z.string().optional(),
  accountNumber: z.string().optional(),
  routingNumber: z.string().optional(),
  iban: z.string().optional(),
  paypalEmail: z.string().email().optional(),
  email: z.string().email().optional(),
  termsAgreed: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms and conditions",
  }),
});
