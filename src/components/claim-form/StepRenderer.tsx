import React from 'react';
import { UseFormReturn } from 'react-hook-form';

// Component imports
import FlightDetailsStep from '@/components/claim-form/FlightDetailsStep';
import DisruptionTypeStep from '@/components/claim-form/DisruptionTypeStep';
import PassengerDetailsStep from '@/components/claim-form/PassengerDetailsStep';
import BookingReferenceStep from '@/components/claim-form/BookingReferenceStep';
import DisruptionDetailsStep from '@/components/claim-form/DisruptionDetailsStep';
import PaymentDetailsStep from '@/components/claim-form/PaymentDetailsStep';
import FlightRouteStep from '@/components/claim-form/FlightRouteStep';
import BoardingPassUpload from '@/components/claim-form/BoardingPassUpload';
import SignatureStep from '@/components/claim-form/SignatureStep';
import FlightDocumentsStep from '@/components/claim-form/FlightDocumentsStep';
import ThankYouStep from '@/components/claim-form/ThankYouStep';
import { AnimationTransitions } from '@/components/claim-form/types';
import { useBoardingPassUpload } from '@/hooks/useBoardingPassUpload';

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
  skipPaymentDetails: () => void;
  proceedToNextStep: () => void;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  isChecking: boolean;
  isEligible: boolean | null;
  transitions: AnimationTransitions;
  disruptionType: string;
  claimId?: string;
  formData?: any;
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
  skipPaymentDetails,
  proceedToNextStep,
  setStep,
  isChecking,
  isEligible,
  transitions,
  disruptionType,
  claimId,
  formData,
}) => {
  // Use the boarding pass upload hook
  const { handleBoardingPassSubmit } = useBoardingPassUpload({
    flightDetailsForm,
    setStep,
  });

  // Get airline name from flightDetailsForm
  const airlineName = flightDetailsForm.watch('airline');

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
    case 4.5:
      return (
        <BookingReferenceStep
          form={bookingReferenceForm}
          onSubmit={onBookingReferenceSubmit}
          onBack={() => setStep(4)}
          transitions={transitions}
        />
      );
    case 4.8:
      return (
        <SignatureStep
          form={signatureForm}
          onSubmit={onSignatureSubmit}
          onBack={() => setStep(4.5)}
          transitions={transitions}
          formData={formData}
          claimId={claimId}
        />
      );
    case 4.9:
      return (
        <FlightDocumentsStep
          form={flightDocumentsForm}
          onSubmit={onFlightDocumentsSubmit}
          onBack={() => setStep(4.8)}
          transitions={transitions}
        />
      );
    case 5:
      return (
        <PaymentDetailsStep
          form={paymentDetailsForm}
          onSubmit={onPaymentDetailsSubmit}
          onBack={() => setStep(4.9)}
          transitions={transitions}
          onSkip={skipPaymentDetails}
        />
      );
    case 6:
      return (
        <ThankYouStep
          transitions={transitions}
          claimId={claimId || '5786537'}
          airlineName={airlineName || 'the airline'}
        />
      );
    default:
      return null;
  }
};

export default StepRenderer;
