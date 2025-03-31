
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";

// Component imports
import FlightDetailsStep from "@/components/claim-form/FlightDetailsStep";
import PassengerDetailsStep from "@/components/claim-form/PassengerDetailsStep";
import DisruptionDetailsStep from "@/components/claim-form/DisruptionDetailsStep";
import PaymentDetailsStep from "@/components/claim-form/PaymentDetailsStep";
import FlightRouteStep from "@/components/claim-form/FlightRouteStep";
import BoardingPassUpload from "@/components/claim-form/BoardingPassUpload";
import { AnimationTransitions } from "@/components/claim-form/types";

interface StepRendererProps {
  step: number;
  showBoardingPassUpload: boolean;
  flightRouteForm: UseFormReturn<any>;
  flightDetailsForm: UseFormReturn<any>;
  passengerDetailsForm: UseFormReturn<any>;
  disruptionDetailsForm: UseFormReturn<any>;
  paymentDetailsForm: UseFormReturn<any>;
  connectionFlights: string[];
  setConnectionFlights: React.Dispatch<React.SetStateAction<string[]>>;
  onFlightRouteSubmit: (data: any) => void;
  onFlightDetailsSubmit: (data: any) => void;
  onPassengerDetailsSubmit: (data: any) => void;
  onDisruptionDetailsSubmit: (data: any) => void;
  onPaymentDetailsSubmit: (data: any) => void;
  proceedToNextStep: () => void;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  isChecking: boolean;
  isEligible: boolean | null;
  transitions: AnimationTransitions;
  disruptionType: string;
}

const StepRenderer: React.FC<StepRendererProps> = ({
  step,
  showBoardingPassUpload,
  flightRouteForm,
  flightDetailsForm,
  passengerDetailsForm,
  disruptionDetailsForm,
  paymentDetailsForm,
  connectionFlights,
  setConnectionFlights,
  onFlightRouteSubmit,
  onFlightDetailsSubmit,
  onPassengerDetailsSubmit,
  onDisruptionDetailsSubmit,
  onPaymentDetailsSubmit,
  proceedToNextStep,
  setStep,
  isChecking,
  isEligible,
  transitions,
  disruptionType
}) => {
  // Handle boarding pass upload
  const handleBoardingPassSubmit = (file: File) => {
    // Here we would normally process the boarding pass file
    // For now, we'll just show a toast and move to the flight details step
    toast.success("Boarding pass uploaded successfully", {
      description: "We'll extract the flight details automatically."
    });
    
    // Set some dummy data that would normally be extracted from the boarding pass
    flightDetailsForm.setValue("airline", "Extracted Airline");
    flightDetailsForm.setValue("flightNumber", "EX123");
    flightDetailsForm.setValue("departureDate", "2023-08-15");
    flightDetailsForm.setValue("departureAirport", "LHR");
    flightDetailsForm.setValue("arrivalAirport", "JFK");
    
    // Move to flight details step
    setStep(2);
  };

  if (showBoardingPassUpload && step < 2) {
    return (
      <BoardingPassUpload 
        onContinue={handleBoardingPassSubmit}
        transitions={transitions}
      />
    );
  }
  
  switch (step) {
    case 1:
      return (
        <FlightRouteStep
          form={flightRouteForm}
          onSubmit={onFlightRouteSubmit}
          transitions={transitions}
          connectionFlights={connectionFlights}
          setConnectionFlights={setConnectionFlights}
          flightDetailsForm={flightDetailsForm}
        />
      );
    case 2:
      return (
        <FlightDetailsStep
          form={flightDetailsForm}
          onSubmit={onFlightDetailsSubmit}
          isChecking={isChecking}
          isEligible={isEligible}
          onContinue={proceedToNextStep}
          transitions={transitions}
          onBack={() => setStep(1)}
          connectionFlights={connectionFlights}
          setConnectionFlights={setConnectionFlights}
        />
      );
    case 3:
      return (
        <PassengerDetailsStep
          form={passengerDetailsForm}
          onSubmit={onPassengerDetailsSubmit}
          onBack={() => setStep(2)}
          transitions={transitions}
        />
      );
    case 4:
      return (
        <DisruptionDetailsStep
          form={disruptionDetailsForm}
          onSubmit={onDisruptionDetailsSubmit}
          onBack={() => setStep(3)}
          transitions={transitions}
          disruptionType={disruptionType}
        />
      );
    case 5:
      return (
        <PaymentDetailsStep
          form={paymentDetailsForm}
          onSubmit={onPaymentDetailsSubmit}
          onBack={() => setStep(4)}
          transitions={transitions}
        />
      );
    default:
      return null;
  }
};

export default StepRenderer;
