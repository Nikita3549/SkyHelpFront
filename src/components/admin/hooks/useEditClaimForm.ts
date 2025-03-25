
import { useState } from "react";
import { format, parse } from "date-fns";
import { Claim } from "@/lib/supabase";
import { prepareClaimDataForSubmission } from "../utils/claimDataProcessor";

type UseEditClaimFormProps = {
  claim: Claim;
  onSubmit: (claimData: Partial<Claim>) => void;
  onClose: () => void;
};

export function useEditClaimForm({ claim, onSubmit, onClose }: UseEditClaimFormProps) {
  // Split customer name into first and last name
  const fullName = claim.customer.split(" ");
  const initialFirstName = fullName[0] || "";
  const initialLastName = fullName.slice(1).join(" ") || "";

  // Parse date string to Date object, handling both YY and YYYY formats
  const dateStr = claim.date;
  const dateParts = dateStr.split(".");
  
  let initialDate = new Date();
  
  if (dateParts.length === 3) {
    // Check if year is in YY or YYYY format
    const yearPart = dateParts[2];
    
    if (yearPart.length === 2) {
      // YY format, convert to full year (assuming 20xx for simplicity)
      initialDate = new Date(Number(`20${yearPart}`), Number(dateParts[1]) - 1, Number(dateParts[0]));
    } else {
      // YYYY format
      initialDate = new Date(Number(yearPart), Number(dateParts[1]) - 1, Number(dateParts[0]));
    }
  }

  // Initialize payment details based on claim data
  const paymentDetails = claim.paymentdetails || {};

  // Form state
  const [formState, setFormState] = useState({
    // Customer Info
    firstName: initialFirstName,
    lastName: initialLastName,
    email: claim.email || "",
    phone: claim.phone || "",
    address: claim.address || "",
    numberOfPassengers: claim.numberofpassengers || "1",
    additionalInformation: claim.additionalinformation || "",
    
    // Flight Info
    airline: claim.airline || "",
    flightnumber: claim.flightnumber || "",
    
    // Date and Amount
    date: initialDate,
    amount: claim.amount || "",
    
    // Flight Details
    departureAirport: claim.departureairport || "",
    arrivalAirport: claim.arrivalairport || "",
    flightIssue: claim.flightissue || "delayed",
    reasonGivenByAirline: claim.reasongivenbyairline || "",
    delayDuration: "",
    
    // Payment Details
    paymentMethod: claim.paymentmethod || "bank_transfer",
    bankName: paymentDetails.bankName || "",
    accountHolderName: paymentDetails.accountName || paymentDetails.accountHolderName || "",
    iban: paymentDetails.iban || "",
    accountNumber: paymentDetails.accountNumber || "",
    paypalEmail: paymentDetails.paypalEmail || "",
    wiseAccountHolder: paymentDetails.accountName || "",
    wiseIbanOrAccount: paymentDetails.ibanOrAccount || "",
    wiseEmail: paymentDetails.email || "",
    
    // Status
    status: claim.status || "pending" as 'pending' | 'in_progress' | 'escalated' | 'completed' | 'rejected',
    stage: claim.stage || "initial_review",
  });

  const handleChange = (field: string, value: any) => {
    setFormState(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prepare claim data for submission
    const claimData = prepareClaimDataForSubmission({
      ...formState,
      id: claim.id,
    });
    
    onSubmit(claimData);
    onClose();
  };

  return {
    formState,
    handleChange,
    handleSubmit
  };
}
