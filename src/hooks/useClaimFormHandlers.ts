
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { claimsService } from "@/services/claimsService";
import { 
  flightDetailsSchema,
  passengerDetailsSchema,
  disruptionDetailsSchema,
  paymentDetailsSchema
} from "@/components/claim-form/schemas";

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
    
    // Create a claim ID
    const claimId = `CLM-${Math.floor(1000 + Math.random() * 9000)}`;
    
    // Format data for the database
    const claimData = {
      id: claimId,
      customer: `${finalFormData.passengerDetails.firstName} ${finalFormData.passengerDetails.lastName}`,
      email: finalFormData.passengerDetails.email,
      phone: finalFormData.passengerDetails.phone,
      address: finalFormData.passengerDetails.address,
      numberOfPassengers: finalFormData.passengerDetails.passengers,
      airline: finalFormData.flightDetails.airline,
      flightnumber: finalFormData.flightDetails.flightNumber,
      departureAirport: finalFormData.flightDetails.departureAirport,
      arrivalAirport: finalFormData.flightDetails.arrivalAirport,
      flightIssue: finalFormData.flightDetails.disruptionType,
      date: finalFormData.flightDetails.departureDate,
      reasonGivenByAirline: finalFormData.disruptionDetails.reasonGiven,
      additionalInformation: finalFormData.disruptionDetails.additionalInfo,
      delayDuration: finalFormData.flightDetails.disruptionType === 'delay' ? finalFormData.flightDetails.delayDuration : '',
      status: "pending",
      stage: "initial_review",
      amount: "€0", // Will be calculated/updated by admin
      lastupdated: new Date().toISOString().split('T')[0],
      paymentMethod: finalFormData.paymentDetails.paymentMethod,
      paymentDetails: formatPaymentDetails(finalFormData.paymentDetails),
    };
    
    try {
      console.log("Submitting claim data:", claimData);
      await claimsService.createClaim(claimData);
      
      toast.success("Claim submitted successfully", {
        description: "We'll process your claim and keep you updated.",
      });
      
      navigate("/dashboard");
    } catch (error) {
      console.error("Error submitting claim:", error);
      toast.error("Failed to submit claim", {
        description: "Please try again or contact support.",
      });
    }
  };
  
  // Format payment details based on payment method
  const formatPaymentDetails = (paymentDetails: z.infer<typeof paymentDetailsSchema>) => {
    if (paymentDetails.paymentMethod === "bank_transfer") {
      return {
        bankName: paymentDetails.bankName,
        accountHolderName: paymentDetails.accountName,
        iban: paymentDetails.iban,
        accountNumber: paymentDetails.accountNumber,
      };
    } else if (paymentDetails.paymentMethod === "paypal") {
      return {
        paypalEmail: paymentDetails.paypalEmail,
      };
    } else {
      // For other methods like Wise
      return {};
    }
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
