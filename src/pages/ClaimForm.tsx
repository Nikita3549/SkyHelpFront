
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Component imports
import ProgressBar from "@/components/claim-form/ProgressBar";
import FlightDetailsStep from "@/components/claim-form/FlightDetailsStep";
import PassengerDetailsStep from "@/components/claim-form/PassengerDetailsStep";
import DisruptionDetailsStep from "@/components/claim-form/DisruptionDetailsStep";
import PaymentDetailsStep from "@/components/claim-form/PaymentDetailsStep";
import { AnimationTransitions } from "@/components/claim-form/types";

// Schema imports
import { 
  flightDetailsSchema,
  passengerDetailsSchema,
  disruptionDetailsSchema,
  paymentDetailsSchema
} from "@/components/claim-form/schemas";

const ClaimForm = () => {
  const [step, setStep] = useState(1);
  const [isEligible, setIsEligible] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [formData, setFormData] = useState({
    flightDetails: {},
    passengerDetails: {},
    disruptionDetails: {},
    paymentDetails: {},
  });
  
  const navigate = useNavigate();
  const location = useLocation();

  // Get pre-filled values from location state
  const preFilledDepartureAirport = location.state?.departureAirport || "";
  const preFilledArrivalAirport = location.state?.arrivalAirport || "";

  // Initialize form hooks
  const flightDetailsForm = useForm<z.infer<typeof flightDetailsSchema>>({
    resolver: zodResolver(flightDetailsSchema),
    defaultValues: {
      flightNumber: "",
      airline: "",
      departureDate: "",
      departureAirport: preFilledDepartureAirport,
      arrivalAirport: preFilledArrivalAirport,
      disruptionType: "delay",
    },
  });

  const passengerDetailsForm = useForm<z.infer<typeof passengerDetailsSchema>>({
    resolver: zodResolver(passengerDetailsSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      passengers: "1",
      address: "",
    },
  });

  const disruptionDetailsForm = useForm<z.infer<typeof disruptionDetailsSchema>>({
    resolver: zodResolver(disruptionDetailsSchema),
    defaultValues: {
      delayDuration: "",
      actualDepartureTime: "",
      originalDepartureTime: "",
      reasonGiven: "",
      additionalInfo: "",
    },
  });

  const paymentDetailsForm = useForm<z.infer<typeof paymentDetailsSchema>>({
    resolver: zodResolver(paymentDetailsSchema),
    defaultValues: {
      paymentMethod: "bank_transfer",
      bankName: "",
      accountName: "",
      accountNumber: "",
      routingNumber: "",
      iban: "",
      paypalEmail: "",
      termsAgreed: false,
    },
  });

  // Update form values when location state changes
  useEffect(() => {
    if (preFilledDepartureAirport) {
      flightDetailsForm.setValue('departureAirport', preFilledDepartureAirport);
    }
    if (preFilledArrivalAirport) {
      flightDetailsForm.setValue('arrivalAirport', preFilledArrivalAirport);
    }
  }, [location.state, flightDetailsForm]);

  // Form submission handlers
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
    setFormData({ ...formData, paymentDetails: data });
    
    console.log("Complete form data:", {
      ...formData,
      paymentDetails: data,
    });
    
    toast.success("Claim submitted successfully", {
      description: "We'll process your claim and keep you updated.",
    });
    
    navigate("/dashboard");
  };

  // Navigation handlers
  const proceedToNextStep = () => {
    setStep(2);
  };

  // Animation transitions
  const transitions: AnimationTransitions = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 },
  };

  // Render the current step
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <FlightDetailsStep
            form={flightDetailsForm}
            onSubmit={onFlightDetailsSubmit}
            isChecking={isChecking}
            isEligible={isEligible}
            onContinue={proceedToNextStep}
            transitions={transitions}
          />
        );
      case 2:
        return (
          <PassengerDetailsStep
            form={passengerDetailsForm}
            onSubmit={onPassengerDetailsSubmit}
            onBack={() => setStep(1)}
            transitions={transitions}
          />
        );
      case 3:
        return (
          <DisruptionDetailsStep
            form={disruptionDetailsForm}
            onSubmit={onDisruptionDetailsSubmit}
            onBack={() => setStep(2)}
            disruptionType={flightDetailsForm.getValues().disruptionType}
            transitions={transitions}
          />
        );
      case 4:
        return (
          <PaymentDetailsStep
            form={paymentDetailsForm}
            onSubmit={onPaymentDetailsSubmit}
            onBack={() => setStep(3)}
            transitions={transitions}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="py-12 md:py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <ProgressBar step={step} totalSteps={4} />
          {renderStep()}
        </div>
      </div>
    </div>
  );
};

export default ClaimForm;
