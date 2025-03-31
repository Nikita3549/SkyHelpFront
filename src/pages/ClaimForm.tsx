import React from "react";
import { useEffect } from "react";
import { AnimationTransitions } from "@/components/claim-form/types";
import { Plane } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

// Component imports
import ProgressBar from "@/components/claim-form/ProgressBar";
import FlightDetailsStep from "@/components/claim-form/FlightDetailsStep";
import PassengerDetailsStep from "@/components/claim-form/PassengerDetailsStep";
import DisruptionDetailsStep from "@/components/claim-form/DisruptionDetailsStep";
import PaymentDetailsStep from "@/components/claim-form/PaymentDetailsStep";
import PreFilledValuesSyncer from "@/components/claim-form/PreFilledValuesSyncer";
import Timeline from "@/components/claim-form/Timeline";
import FlightRouteStep from "@/components/claim-form/FlightRouteStep";

// Custom hooks
import { useClaimFormState } from "@/hooks/useClaimFormState";
import { useClaimFormHandlers } from "@/hooks/useClaimFormHandlers";
import { useNavigate } from "react-router-dom";

const ClaimForm = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
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
    flightRouteForm,
    connectionFlights,
    setConnectionFlights,
  } = useClaimFormState();

  const {
    onFlightDetailsSubmit,
    onPassengerDetailsSubmit,
    onDisruptionDetailsSubmit,
    onPaymentDetailsSubmit,
    proceedToNextStep,
    onFlightRouteSubmit,
  } = useClaimFormHandlers({
    setFormData,
    formData,
    setStep,
    setIsEligible,
    setIsChecking,
  });

  // Get the disruption type from flight details form
  const disruptionType = flightDetailsForm.watch("disruptionType");

  // Mapping step numbers to timeline status
  const getTimelineItems = () => {
    return [
      {
        label: "Flight Route",
        status: step > 1 ? "completed" as const : step === 1 ? "active" as const : "pending" as const
      },
      {
        label: "Flight Details",
        status: step >= 2 && isEligible ? "completed" as const : step === 2 ? "active" as const : "pending" as const
      },
      {
        label: "Passenger Details",
        status: step > 3 ? "completed" as const : step === 3 ? "active" as const : "pending" as const
      },
      {
        label: "Disruption Details",
        status: step > 4 ? "completed" as const : step === 4 ? "active" as const : "pending" as const
      },
      {
        label: "Payment",
        status: step === 5 ? "active" as const : "pending" as const
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

  return (
    <div className="py-8 md:py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container-custom px-4 md:px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8">
          {/* Timeline sidebar */}
          <div className={`${isMobile ? 'mb-6' : 'md:col-span-1 pt-6'}`}>
            <Timeline items={getTimelineItems()} />
          </div>
          
          {/* Main form content */}
          <div className="md:col-span-3">
            <ProgressBar step={step} totalSteps={5} />
            <PreFilledValuesSyncer
              form={flightDetailsForm}
              flightRouteForm={flightRouteForm}
              preFilledDepartureAirport={preFilledDepartureAirport}
              preFilledArrivalAirport={preFilledArrivalAirport}
              preFilledFlightNumber={preFilledFlightNumber}
              preFilledDepartureDate={preFilledDepartureDate}
              locationState={location.state}
            />
            <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
              {renderStep()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClaimForm;
