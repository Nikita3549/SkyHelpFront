
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { toast } from "sonner";
import { v4 as uuidv4 } from 'uuid';
import { 
  flightDetailsSchema,
  passengerDetailsSchema,
  disruptionDetailsSchema,
  paymentDetailsSchema
} from "@/components/claim-form/schemas";
import { claimsService } from "@/services/claimsService";
import { Claim } from "@/lib/supabase";

interface UseClaimFormHandlersProps {
  setFormData: React.Dispatch<React.SetStateAction<{
    flightDetails: Record<string, any>;
    passengerDetails: Record<string, any>;
    disruptionDetails: Record<string, any>;
    paymentDetails: Record<string, any>;
  }>>;
  formData: {
    flightDetails: Record<string, any>;
    passengerDetails: Record<string, any>;
    disruptionDetails: Record<string, any>;
    paymentDetails: Record<string, any>;
  };
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setIsEligible: React.Dispatch<React.SetStateAction<boolean | null>>;
  setIsChecking: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useClaimFormHandlers = ({
  setFormData,
  formData,
  setStep,
  setIsEligible,
  setIsChecking,
}: UseClaimFormHandlersProps) => {
  const navigate = useNavigate();

  const onFlightDetailsSubmit = (data: z.infer<typeof flightDetailsSchema>) => {
    setIsChecking(true);
    setFormData({ ...formData, flightDetails: data });
    
    setTimeout(() => {
      setIsEligible(true);
      setIsChecking(false);
    }, 2000);
  };

  const onPassengerDetailsSubmit = (data: z.infer<typeof passengerDetailsSchema>) => {
    setFormData({ ...formData, passengerDetails: data });
    setStep(3);
  };
  
  const onDisruptionDetailsSubmit = (data: z.infer<typeof disruptionDetailsSchema>) => {
    setFormData({ ...formData, disruptionDetails: data });
    setStep(4);
  };
  
  const onPaymentDetailsSubmit = (data: z.infer<typeof paymentDetailsSchema>) => {
    const finalFormData = {
      ...formData,
      paymentDetails: data,
    };
    
    setFormData(finalFormData);
    
    // Create a claim object to save to the database
    const { flightDetails, passengerDetails, disruptionDetails, paymentDetails } = finalFormData;
    
    // Create a unique ID for the claim
    const claimId = `CLM-${uuidv4().substring(0, 8)}`;
    const today = new Date().toISOString().split('T')[0];
    
    // Create payment details based on the selected payment method
    let paymentDetailsFormatted = {};
    if (paymentDetails.paymentMethod === "bank_transfer") {
      paymentDetailsFormatted = {
        bankName: paymentDetails.bankName,
        accountHolderName: paymentDetails.accountName, // Changed from accountHolderName to accountName
        iban: paymentDetails.iban,
      };
    } else if (paymentDetails.paymentMethod === "paypal") {
      paymentDetailsFormatted = {
        paypalEmail: paymentDetails.paypalEmail,
      };
    } else if (paymentDetails.paymentMethod === "wise") {
      paymentDetailsFormatted = {
        accountHolderName: paymentDetails.accountName, // Changed from accountHolderName to accountName
        iban: paymentDetails.iban,
        email: paymentDetails.email,
      };
    }
    
    // Construct the customer name
    const customer = `${passengerDetails.firstName} ${passengerDetails.lastName}`;
    
    // Create the claim object to save
    const claimToSave = {
      id: claimId,
      customer: customer,
      email: passengerDetails.email,
      phone: passengerDetails.phone,
      address: `${passengerDetails.address}, ${passengerDetails.city}, ${passengerDetails.postalCode}, ${passengerDetails.country}`,
      numberOfPassengers: flightDetails.passengers,
      airline: flightDetails.airline,
      flightnumber: flightDetails.flightNumber,
      departureAirport: flightDetails.departure,
      arrivalAirport: flightDetails.arrival,
      flightIssue: disruptionDetails.disruptionType,
      date: flightDetails.date,
      status: "pending" as Claim['status'],
      stage: "initial_review",
      amount: disruptionDetails.compensationAmount || "€600",
      lastupdated: today,
      reasonGivenByAirline: disruptionDetails.reasonGiven,
      additionalInformation: disruptionDetails.additionalInfo,
      paymentMethod: paymentDetails.paymentMethod,
      paymentDetails: paymentDetailsFormatted,
    };
    
    console.log("Complete form data:", finalFormData);
    console.log("Saving claim to database:", claimToSave);
    
    // Save the claim to the database
    claimsService.createClaim(claimToSave)
      .then(() => {
        toast.success("Claim submitted successfully", {
          description: "We'll process your claim and keep you updated.",
        });
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error("Error saving claim:", error);
        toast.error("Error submitting claim", {
          description: "Please try again or contact support.",
        });
      });
  };

  // Navigation handlers
  const proceedToNextStep = () => {
    setStep(2);
  };

  return {
    onFlightDetailsSubmit,
    onPassengerDetailsSubmit,
    onDisruptionDetailsSubmit,
    onPaymentDetailsSubmit,
    proceedToNextStep,
  };
};
