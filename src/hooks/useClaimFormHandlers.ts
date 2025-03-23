
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
  
  const onPaymentDetailsSubmit = async (data: z.infer<typeof paymentDetailsSchema>) => {
    const finalFormData = {
      ...formData,
      paymentDetails: data,
    };
    
    setFormData(finalFormData);
    
    try {
      // Generate a unique ID for the claim
      const claimId = `CLM-${uuidv4().substring(0, 8)}`;
      
      // Build the claim data from the form data
      const { flightDetails, passengerDetails, disruptionDetails, paymentDetails } = finalFormData;
      
      // Build payment details object based on payment method
      let paymentDetailsObject = {};
      if (data.paymentMethod === "bank_transfer") {
        paymentDetailsObject = {
          bankName: data.bankName,
          accountName: data.accountName,
          accountNumber: data.accountNumber,
          routingNumber: data.routingNumber,
          iban: data.iban
        };
      } else if (data.paymentMethod === "paypal") {
        paymentDetailsObject = {
          paypalEmail: data.paypalEmail
        };
      } else {
        // For other payment methods like Wise
        paymentDetailsObject = {
          accountName: data.accountName,
          accountNumber: data.accountNumber,
          email: passengerDetails.email
        };
      }
      
      // Create the claim data structure
      const claimData = {
        id: claimId,
        customer: `${passengerDetails.firstName} ${passengerDetails.lastName}`,
        email: passengerDetails.email,
        phone: passengerDetails.phone,
        address: passengerDetails.address,
        numberOfPassengers: passengerDetails.passengers,
        airline: flightDetails.airline,
        flightnumber: flightDetails.flightNumber,
        departureAirport: flightDetails.departureAirport,
        arrivalAirport: flightDetails.arrivalAirport,
        flightIssue: flightDetails.disruptionType,
        date: flightDetails.departureDate,
        status: "pending" as Claim['status'],
        stage: "initial_review",
        amount: determineCompensationAmount(flightDetails.disruptionType, flightDetails.airline),
        lastupdated: new Date().toISOString().split('T')[0],
        reasonGivenByAirline: disruptionDetails.reasonGiven,
        additionalInformation: disruptionDetails.additionalInfo,
        paymentMethod: data.paymentMethod,
        paymentDetails: paymentDetailsObject
      };
      
      console.log("Creating claim with data:", claimData);
      
      // Submit the claim data to the database
      await claimsService.createClaim(claimData);
      
      toast.success("Claim submitted successfully", {
        description: "We'll process your claim and keep you updated.",
      });
      
      // Navigate to the dashboard page
      navigate("/dashboard");
    } catch (error) {
      console.error("Error submitting claim:", error);
      toast.error("Failed to submit claim", {
        description: "Please try again or contact support.",
      });
    }
  };
  
  // Helper function to determine compensation amount based on flight details
  const determineCompensationAmount = (disruptionType: string, airline: string): string => {
    // Simple logic to determine compensation amount
    // In a real application, this would be more complex based on flight distance, etc.
    let baseAmount = 0;
    
    if (disruptionType === "delay") {
      baseAmount = 250;
    } else if (disruptionType === "cancellation") {
      baseAmount = 600;
    } else if (disruptionType === "denied_boarding") {
      baseAmount = 400;
    }
    
    // Return formatted amount
    return `€${baseAmount}`;
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
