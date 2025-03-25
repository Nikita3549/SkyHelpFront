
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { 
  flightDetailsSchema,
  passengerDetailsSchema,
  disruptionDetailsSchema,
  paymentDetailsSchema,
  flightRouteSchema
} from "@/components/claim-form/schemas";
import { format } from "date-fns";

interface UseClaimFormHandlersProps {
  setFormData: React.Dispatch<React.SetStateAction<{
    flightRoute: Record<string, any>;
    flightDetails: Record<string, any>;
    passengerDetails: Record<string, any>;
    disruptionDetails: Record<string, any>;
    paymentDetails: Record<string, any>;
  }>>;
  formData: {
    flightRoute: Record<string, any>;
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

  const onFlightRouteSubmit = (data: z.infer<typeof flightRouteSchema>) => {
    setFormData({ ...formData, flightRoute: data });
    setStep(2);
  };

  const onFlightDetailsSubmit = (data: z.infer<typeof flightDetailsSchema>) => {
    setIsChecking(true);
    setFormData({ ...formData, flightDetails: data });
    
    // Simulate checking eligibility based on the EU regulation
    setTimeout(() => {
      // Check for eligibility based on flight disruption type and duration
      let isEligible = false;
      
      if (data.disruptionType === "delay") {
        // Only eligible if delay is 3 hours or more (EU Regulation 261/2004)
        const delayDuration = data.delayDuration;
        // Fix the bug: "3 hours", "4+ hours" should be eligible
        isEligible = delayDuration === "3 hours" || delayDuration === "4+ hours";
      } else if (data.disruptionType === "cancellation" || 
                data.disruptionType === "denied_boarding") {
        // Cancellations and denied boarding are generally eligible
        isEligible = true;
      } else if (data.disruptionType === "missed_connection") {
        // Missed connections might be eligible depending on the total delay
        isEligible = true;
      }
      
      setIsEligible(isEligible);
      setIsChecking(false);
    }, 2000);
  };

  const onPassengerDetailsSubmit = (data: z.infer<typeof passengerDetailsSchema>) => {
    setFormData({ ...formData, passengerDetails: data });
    setStep(4);
  };
  
  const onDisruptionDetailsSubmit = (data: z.infer<typeof disruptionDetailsSchema>) => {
    setFormData({ ...formData, disruptionDetails: data });
    setStep(5);
  };
  
  const onPaymentDetailsSubmit = async (data: z.infer<typeof paymentDetailsSchema>) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      paymentDetails: data,
    }));
    
    const completeFormData = {
      ...formData,
      paymentDetails: data,
    };
    
    console.log("Complete form data:", completeFormData);
    
    // Prepare data for Supabase
    try {
      // Generate a claim ID
      const claimId = `CLM-${Math.floor(1000 + Math.random() * 9000)}`;
      
      // Format the date correctly (DD.MM.YY)
      const departureDate = completeFormData.flightDetails.departureDate;
      const dateObj = new Date(departureDate);
      const formattedDate = format(dateObj, "dd.MM.yy");
      
      // Prepare payment details object based on selected payment method
      let paymentDetails = {};
      switch (data.paymentMethod) {
        case "bank_transfer":
          paymentDetails = {
            bankName: data.bankName,
            accountHolderName: data.accountName,
            iban: data.iban,
            accountNumber: data.accountNumber
          };
          break;
        case "paypal":
          paymentDetails = {
            paypalEmail: data.paypalEmail
          };
          break;
        case "wise":
          paymentDetails = {
            accountHolderName: data.accountName,
            ibanOrAccount: data.iban,
            email: data.email
          };
          break;
      }
      
      // Create new claim object
      const newClaim = {
        id: claimId,
        customer: `${completeFormData.passengerDetails.firstName} ${completeFormData.passengerDetails.lastName}`,
        email: completeFormData.passengerDetails.email,
        phone: completeFormData.passengerDetails.phone,
        address: completeFormData.passengerDetails.address,
        numberofpassengers: completeFormData.passengerDetails.passengers,
        airline: completeFormData.flightDetails.airline,
        flightnumber: completeFormData.flightDetails.flightNumber,
        date: formattedDate,
        departureairport: completeFormData.flightRoute.departureAirport,
        arrivalairport: completeFormData.flightRoute.arrivalAirport,
        flightissue: completeFormData.flightDetails.disruptionType,
        reasongivenbyairline: completeFormData.disruptionDetails.reasonGiven,
        additionalinformation: completeFormData.disruptionDetails.additionalInfo,
        status: "pending",
        stage: "initial_review",
        amount: "€250 (estimated)", // Default estimated amount
        lastupdated: format(new Date(), "dd.MM.yy"),
        paymentmethod: data.paymentMethod,
        paymentdetails: paymentDetails
      };
      
      console.log("Submitting new claim to Supabase:", newClaim);
      
      // Insert claim into Supabase
      const { data: savedClaim, error } = await supabase
        .from('claims')
        .insert(newClaim)
        .select()
        .single();
      
      if (error) {
        console.error("Error submitting claim:", error);
        toast.error("Failed to submit claim", {
          description: error.message,
        });
        return;
      }
      
      console.log("Claim submitted successfully:", savedClaim);
      
      toast.success("Claim submitted successfully", {
        description: "We'll process your claim and keep you updated.",
      });
      
      // Navigate to dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Error in claim submission:", error);
      toast.error("Failed to submit claim", {
        description: "An unexpected error occurred. Please try again.",
      });
    }
  };

  // Navigation handlers
  const proceedToNextStep = () => {
    setStep(3);
  };

  return {
    onFlightRouteSubmit,
    onFlightDetailsSubmit,
    onPassengerDetailsSubmit,
    onDisruptionDetailsSubmit,
    onPaymentDetailsSubmit,
    proceedToNextStep,
  };
};
