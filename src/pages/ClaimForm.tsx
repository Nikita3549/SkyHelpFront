
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
import Timeline from "@/components/claim-form/Timeline";

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

  // Mapping step numbers to timeline status
  const getTimelineItems = () => {
    return [
      {
        label: "Eligibility Check",
        status: step >= 1 && isEligible ? "completed" as const : step === 1 ? "active" as const : "pending" as const
      },
      {
        label: "Passenger Details",
        status: step > 2 ? "completed" as const : step === 2 ? "active" as const : "pending" as const
      },
      {
        label: "Disruption Details",
        status: step > 3 ? "completed" as const : step === 3 ? "active" as const : "pending" as const
      },
      {
        label: "Payment",
        status: step === 4 ? "active" as const : "pending" as const
      }
    ];
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
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Timeline sidebar */}
          <div className="md:col-span-1 pt-6">
            <Timeline items={getTimelineItems()} />
          </div>
          
          {/* Main form content */}
          <div className="md:col-span-3">
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
    </div>
  );
};

export default ClaimForm;
