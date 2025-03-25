
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { toast } from "sonner";
import { 
  flightDetailsSchema,
  passengerDetailsSchema,
  disruptionDetailsSchema,
  paymentDetailsSchema,
  flightRouteSchema
} from "@/components/claim-form/schemas";

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

// Helper function to scroll to top of the page
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

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
    scrollToTop();
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
      
      if (isEligible) {
        scrollToTop();
      }
    }, 2000);
  };

  const onPassengerDetailsSubmit = (data: z.infer<typeof passengerDetailsSchema>) => {
    setFormData({ ...formData, passengerDetails: data });
    setStep(4);
    scrollToTop();
  };
  
  const onDisruptionDetailsSubmit = (data: z.infer<typeof disruptionDetailsSchema>) => {
    setFormData({ ...formData, disruptionDetails: data });
    setStep(5);
    scrollToTop();
  };
  
  const onPaymentDetailsSubmit = (data: z.infer<typeof paymentDetailsSchema>) => {
    const finalFormData = {
      ...formData,
      paymentDetails: data,
    };
    
    setFormData(finalFormData);
    
    console.log("Complete form data:", finalFormData);
    
    toast.success("Claim submitted successfully", {
      description: "We'll process your claim and keep you updated.",
    });
    
    navigate("/dashboard");
    scrollToTop();
  };

  // Navigation handlers
  const proceedToNextStep = () => {
    setStep(3);
    scrollToTop();
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
