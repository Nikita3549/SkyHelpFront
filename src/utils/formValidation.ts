
import { z } from "zod";

export const newClaimSchema = z.object({
  customer: z.string().min(3, "Customer name is required"),
  email: z.string().email("Valid email is required"),
  airline: z.string().min(1, "Airline is required"),
  flightnumber: z.string().min(1, "Flight number is required"),
  date: z.date(),
  amount: z.string().min(1, "Amount is required"),
});

export type ClaimFormData = z.infer<typeof newClaimSchema>;
