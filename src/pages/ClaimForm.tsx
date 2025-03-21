
import React from "react";
import { useEffect } from "react";
import { AnimationTransitions } from "@/components/claim-form/types";

// Component imports
import ProgressBar from "@/components/claim-form/ProgressBar";
import FlightDetailsStep from "@/components/claim-form/FlightDetailsStep";
import PassengerDetailsStep from "@/components/claim-form/PassengerDetailsStep";
import DisruptionDetailsStep from "@/components/claim-form/DisruptionDetailsStep";
import PaymentDetailsStep from "@/components/claim-form/PaymentDetailsStep";
import PreFilledValuesSyncer from "@/components/claim-form/PreFilledValuesSyncer";

// Custom hooks
import { useClaimFormState } from "@/hooks/useClaimFormState";
import { useClaimFormHandlers } from "@/hooks/useClaimFormHandlers";

const ClaimForm = () => {
  const {
    step,
    setStep,
    isEligible,
    setIsEligible,
    isChecking,
    setIsChecking,
    formData,
    setFormData,
    location,
    preFilledDepartureAirport,
    preFilledArrivalAirport,
    preFilledFlightNumber,
    preFilledDepartureDate,
    flightDetailsForm,
    passengerDetailsForm,
    disruptionDetailsForm,
    paymentDetailsForm,
  } = useClaimFormState();

  const {
    onFlightDetailsSubmit,
    onPassengerDetailsSubmit,
    onDisruptionDetailsSubmit,
    onPaymentDetailsSubmit,
    proceedToNextStep,
  } = useClaimFormHandlers({
    setFormData,
    formData,
    setStep,
    setIsEligible,
    setIsChecking,
  });

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
          <PreFilledValuesSyncer
            form={flightDetailsForm}
            preFilledDepartureAirport={preFilledDepartureAirport}
            preFilledArrivalAirport={preFilledArrivalAirport}
            preFilledFlightNumber={preFilledFlightNumber}
            preFilledDepartureDate={preFilledDepartureDate}
            locationState={location.state}
          />
          {renderStep()}
        </div>
      </div>
    </div>
  );
};

export default ClaimForm;
