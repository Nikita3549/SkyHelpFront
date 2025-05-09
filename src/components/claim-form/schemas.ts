import { z } from "zod";

export const flightRouteSchema = z.object({
  departureAirport: z.string().min(2, "Please enter the departure airport"),
  arrivalAirport: z.string().min(2, "Please enter the arrival airport"),
});

export const connectingFlightSchema = z.object({
  connectionAirport: z.string().min(2, "Please enter the connection airport"),
});

export const flightDetailsSchema = z.object({
  flightNumber: z.string().min(1, "Flight number is required"),
  airline: z.string().min(1, "Airline is required"),
  departureDate: z.string().min(1, "Departure date is required"),
  departureAirport: z.string().min(1, "Departure airport is required"),
  arrivalAirport: z.string().min(1, "Arrival airport is required"),
  disruptionType: z.enum(["delay", "cancellation", "denied_boarding", "missed_connection"], {
    required_error: "Please select a disruption type",
  }),
  arrivalDelay: z.enum(["3hours_or_more", "less_than_3hours", "never_arrived"]).optional(),
  notificationTime: z.enum(["less_than_14days", "14days_or_more"]).optional(),
  voluntaryDenial: z.enum(["yes", "no"]).optional(),
  connectingFlights: z.enum(["yes", "no"]).default("no"),
  delayDuration: z.string().optional(),
  connectionAirports: z.array(z.string()).optional(),
  problematicFlightSegment: z.string().optional(),
});

export const passengerDetailsSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(6, "Please enter a valid phone number"),
  address: z.string().min(5, "Please enter your address"),
  addressLine2: z.string().optional(),
  city: z.string().min(2, "Please enter your city"),
  postalCode: z.string().min(2, "Please enter your postal code"),
  state: z.string().optional(),
  country: z.string().min(2, "Please select your country"),
  whatsappNotifications: z.boolean().default(false),
});

export const bookingReferenceSchema = z.object({
  bookingReference: z.string().optional(),
});

export const disruptionDetailsSchema = z.object({
  reasonProvided: z
    .enum(["yes", "no", "dont_remember"], {
      required_error: "Please indicate if the airline provided a reason",
    }),
  airlineReason: z
    .enum(["technical_problem", "weather", "strike", "airport_issues", "other"])
    .optional()
    .refine(
      (val) => {
        // If reasonProvided is yes, then airlineReason is required
        return true;
      },
      {
        message: "Please select the reason provided by the airline",
      }
    ),
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

export const signatureSchema = z.object({
  signature: z.string().min(1, "Your signature is required"),
  termsAgreed: z.boolean().refine(value => value === true, {
    message: "You must agree to the terms",
  }),
});

export const flightDocumentsSchema = z.object({
  documents: z.array(z.instanceof(File)).min(1, "At least one document is required")
});
