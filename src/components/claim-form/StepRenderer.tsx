
import React from "react";
import { UseFormReturn } from "react-hook-form";

// Component imports
import FlightDetailsStep from "@/components/claim-form/FlightDetailsStep";
import DisruptionTypeStep from "@/components/claim-form/DisruptionTypeStep";
import PassengerDetailsStep from "@/components/claim-form/PassengerDetailsStep";
import DisruptionDetailsStep from "@/components/claim-form/DisruptionDetailsStep";
import PaymentDetailsStep from "@/components/claim-form/PaymentDetailsStep";
import FlightRouteStep from "@/components/claim-form/FlightRouteStep";
import BoardingPassUpload from "@/components/claim-form/BoardingPassUpload";
import { AnimationTransitions } from "@/components/claim-form/types";
import { useBoardingPassUpload } from "@/hooks/useBoardingPassUpload";

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
  onDisruptionTypeSubmit: (data: any) => void;
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
  onDisruptionTypeSubmit,
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
  // Use the boarding pass upload hook
  const { handleBoardingPassSubmit } = useBoardingPassUpload({
    flightDetailsForm,
    setStep
  });

  // Show boarding pass upload component if showBoardingPassUpload is true and step is 0 or 1
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
          transitions={transitions}
          onBack={() => setStep(1)}
          connectionFlights={connectionFlights}
          setConnectionFlights={setConnectionFlights}
        />
      );
    case 2.5:
      return (
        <DisruptionTypeStep
          form={flightDetailsForm}
          onSubmit={onDisruptionTypeSubmit}
          isChecking={isChecking}
          isEligible={isEligible}
          onContinue={proceedToNextStep}
          transitions={transitions}
          onBack={() => setStep(2)}
        />
      );
    case 3:
      return (
        <DisruptionDetailsStep
          form={disruptionDetailsForm}
          onSubmit={onDisruptionDetailsSubmit}
          onBack={() => setStep(2.5)}
          transitions={transitions}
          disruptionType={disruptionType}
        />
      );
    case 4:
      return (
        <PassengerDetailsStep
          form={passengerDetailsForm}
          onSubmit={onPassengerDetailsSubmit}
          onBack={() => setStep(3)}
          transitions={transitions}
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
