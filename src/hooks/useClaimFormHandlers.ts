
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
    
    setTimeout(() => {
      setIsEligible(true);
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
