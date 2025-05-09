
import React from "react";
import { AnimatePresence } from "framer-motion";
import BoardingPassUpload from "./BoardingPassUpload";
import FlightRouteStep from "./FlightRouteStep";
import FlightDetailsStep from "./FlightDetailsStep";
import DisruptionTypeStep from "./DisruptionTypeStep";
import EligibilityResult from "./flight-details/EligibilityResult";
import PassengerDetailsStep from "./PassengerDetailsStep";
import DisruptionDetailsStep from "./DisruptionDetailsStep";
import PaymentDetailsStep from "./PaymentDetailsStep";
import BookingReferenceStep from "./BookingReferenceStep";
import SignatureStep from "./SignatureStep";
import FlightDocumentsStep from "./FlightDocumentsStep";
import { useBoardingPassUpload } from "@/hooks/useBoardingPassUpload";
import { AnimationTransitions } from "@/components/claim-form/types";
import { UseFormReturn } from "react-hook-form";

interface StepRendererProps {
  step: number;
  showBoardingPassUpload: boolean;
  flightRouteForm: UseFormReturn<any>;
  flightDetailsForm: UseFormReturn<any>;
  passengerDetailsForm: UseFormReturn<any>;
  bookingReferenceForm: UseFormReturn<any>;
  disruptionDetailsForm: UseFormReturn<any>;
  paymentDetailsForm: UseFormReturn<any>;
  signatureForm: UseFormReturn<any>;
  flightDocumentsForm: UseFormReturn<any>;
  connectionFlights: string[];
  setConnectionFlights: React.Dispatch<React.SetStateAction<string[]>>;
  onFlightRouteSubmit: (data: any) => void;
  onFlightDetailsSubmit: (data: any) => void;
  onDisruptionTypeSubmit: (data: any) => void;
  onPassengerDetailsSubmit: (data: any) => void;
  onBookingReferenceSubmit: (data: any) => void;
  onSignatureSubmit: (data: any) => void;
  onFlightDocumentsSubmit: (data: any) => void;
  onDisruptionDetailsSubmit: (data: any) => void;
  onPaymentDetailsSubmit: (data: any) => void;
  proceedToNextStep: () => void;
  skipPaymentDetails: () => void; // Add this property
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
  bookingReferenceForm,
  disruptionDetailsForm,
  paymentDetailsForm,
  signatureForm,
  flightDocumentsForm,
  connectionFlights,
  setConnectionFlights,
  onFlightRouteSubmit,
  onFlightDetailsSubmit,
  onDisruptionTypeSubmit,
  onPassengerDetailsSubmit,
  onBookingReferenceSubmit,
  onSignatureSubmit,
  onFlightDocumentsSubmit,
  onDisruptionDetailsSubmit,
  onPaymentDetailsSubmit,
  proceedToNextStep,
  skipPaymentDetails, // Add this parameter
  setStep,
  isChecking,
  isEligible,
  transitions,
  disruptionType,
}) => {
  // Custom hook for boarding pass upload
  const { handleBoardingPassSubmit } = useBoardingPassUpload({
    flightDetailsForm,
    setStep,
  });

  const renderStepContent = () => {
    if (showBoardingPassUpload && step < 2) {
      // Step 0: Boarding Pass Upload (Optional/Conditional)
      return (
        <BoardingPassUpload
          onSubmit={handleBoardingPassSubmit}
          transitions={transitions}
          onNext={() => setStep(1)}
        />
      );
    } else if (step === 1) {
      // Step 1: Flight Route Selection
      return (
        <FlightRouteStep
          form={flightRouteForm}
          onSubmit={onFlightRouteSubmit}
          transitions={transitions}
        />
      );
    } else if (step === 2) {
      // Step 2: Flight Details
      return (
        <FlightDetailsStep
          form={flightDetailsForm}
          onSubmit={onFlightDetailsSubmit}
          onBack={() => setStep(1)}
          transitions={transitions}
          connectionFlights={connectionFlights}
          setConnectionFlights={setConnectionFlights}
        />
      );
    } else if (step === 2.5) {
      // Step 2.5: Disruption Type
      return (
        <DisruptionTypeStep
          form={flightDetailsForm}
          onSubmit={onDisruptionTypeSubmit}
          onBack={() => setStep(2)}
          transitions={transitions}
          isChecking={isChecking}
          isEligible={isEligible}
        />
      );
    } else if (step === 2.75) {
      // Step 2.75: Eligibility Result
      return (
        <EligibilityResult
          onProceed={proceedToNextStep}
          transitions={transitions}
          isEligible={isEligible}
          disruptionType={disruptionType}
        />
      );
    } else if (step === 3) {
      // Step 3: Passenger Details
      return (
        <PassengerDetailsStep
          form={passengerDetailsForm}
          onSubmit={onPassengerDetailsSubmit}
          onBack={() => setStep(2.75)}
          transitions={transitions}
        />
      );
    } else if (step === 4) {
      // Step 4: Disruption Details
      return (
        <DisruptionDetailsStep
          form={disruptionDetailsForm}
          onSubmit={onDisruptionDetailsSubmit}
          onBack={() => setStep(3)}
          transitions={transitions}
          disruptionType={disruptionType}
        />
      );
    } else if (step === 4.5) {
      // Step 4.5: Booking Reference
      return (
        <BookingReferenceStep
          form={bookingReferenceForm}
          onSubmit={onBookingReferenceSubmit}
          onBack={() => setStep(4)}
          transitions={transitions}
        />
      );
    } else if (step === 4.8) {
      // Step 4.8: Signature
      return (
        <SignatureStep
          form={signatureForm}
          onSubmit={onSignatureSubmit}
          onBack={() => setStep(4.5)}
          transitions={transitions}
        />
      );
    } else if (step === 4.9) {
      // Step 4.9: Flight Documents
      return (
        <FlightDocumentsStep
          form={flightDocumentsForm}
          onSubmit={onFlightDocumentsSubmit}
          onBack={() => setStep(4.8)}
          transitions={transitions}
        />
      );
    } else if (step === 5) {
      // Step 5: Payment Details
      return (
        <PaymentDetailsStep
          form={paymentDetailsForm}
          onSubmit={onPaymentDetailsSubmit}
          onBack={() => setStep(4.9)}
          onSkip={skipPaymentDetails} // Pass the skip function
          transitions={transitions}
        />
      );
    }
    return null;
  };

  return <AnimatePresence mode="wait">{renderStepContent()}</AnimatePresence>;
};

export default StepRenderer;
