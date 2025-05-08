
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import ProgressBar from "@/components/claim-form/ProgressBar";
import PreFilledValuesSyncer from "@/components/claim-form/PreFilledValuesSyncer";
import ClaimFormTimeline from "@/components/claim-form/ClaimFormTimeline";
import StepRenderer from "@/components/claim-form/StepRenderer";
import { AnimationTransitions } from "@/components/claim-form/types";
import { UseFormReturn } from "react-hook-form";

interface ClaimFormContentProps {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  showBoardingPassUpload: boolean;
  flightRouteForm: UseFormReturn<any>;
  flightDetailsForm: UseFormReturn<any>;
  passengerDetailsForm: UseFormReturn<any>;
  bookingReferenceForm: UseFormReturn<any>;
  disruptionDetailsForm: UseFormReturn<any>;
  paymentDetailsForm: UseFormReturn<any>;
  connectionFlights: string[];
  setConnectionFlights: React.Dispatch<React.SetStateAction<string[]>>;
  onFlightRouteSubmit: (data: any) => void;
  onFlightDetailsSubmit: (data: any) => void;
  onDisruptionTypeSubmit: (data: any) => void;
  onPassengerDetailsSubmit: (data: any) => void;
  onBookingReferenceSubmit: (data: any) => void;
  onDisruptionDetailsSubmit: (data: any) => void;
  onPaymentDetailsSubmit: (data: any) => void;
  proceedToNextStep: () => void;
  isChecking: boolean;
  isEligible: boolean | null;
  transitions: AnimationTransitions;
  disruptionType: string;
  preFilledDepartureAirport: string;
  preFilledArrivalAirport: string;
  preFilledFlightNumber: string;
  preFilledDepartureDate: string;
  locationState: any;
}

const ClaimFormContent: React.FC<ClaimFormContentProps> = ({
  step,
  setStep,
  showBoardingPassUpload,
  flightRouteForm,
  flightDetailsForm,
  passengerDetailsForm,
  bookingReferenceForm,
  disruptionDetailsForm,
  paymentDetailsForm,
  connectionFlights,
  setConnectionFlights,
  onFlightRouteSubmit,
  onFlightDetailsSubmit,
  onDisruptionTypeSubmit,
  onPassengerDetailsSubmit,
  onBookingReferenceSubmit,
  onDisruptionDetailsSubmit,
  onPaymentDetailsSubmit,
  proceedToNextStep,
  isChecking,
  isEligible,
  transitions,
  disruptionType,
  preFilledDepartureAirport,
  preFilledArrivalAirport,
  preFilledFlightNumber,
  preFilledDepartureDate,
  locationState
}) => {
  const isMobile = useIsMobile();
  
  // Adjusted total steps to account for the new steps
  const totalSteps = 7;

  return (
    <div className="py-8 md:py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container-custom px-4 md:px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8">
          {/* Timeline sidebar */}
          <div className={`${isMobile ? 'mb-6' : 'md:col-span-1 pt-6'}`}>
            <ClaimFormTimeline 
              step={showBoardingPassUpload && step < 2 ? 0 : step} 
              showBoardingPassUpload={showBoardingPassUpload} 
            />
          </div>
          
          {/* Main form content */}
          <div className="md:col-span-3">
            <ProgressBar step={showBoardingPassUpload && step < 2 ? 1 : step} totalSteps={totalSteps} />
            <PreFilledValuesSyncer
              form={flightDetailsForm}
              flightRouteForm={flightRouteForm}
              preFilledDepartureAirport={preFilledDepartureAirport}
              preFilledArrivalAirport={preFilledArrivalAirport}
              preFilledFlightNumber={preFilledFlightNumber}
              preFilledDepartureDate={preFilledDepartureDate}
              locationState={locationState}
            />
            <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
              <StepRenderer
                step={step}
                showBoardingPassUpload={showBoardingPassUpload}
                flightRouteForm={flightRouteForm}
                flightDetailsForm={flightDetailsForm}
                passengerDetailsForm={passengerDetailsForm}
                bookingReferenceForm={bookingReferenceForm}
                disruptionDetailsForm={disruptionDetailsForm}
                paymentDetailsForm={paymentDetailsForm}
                connectionFlights={connectionFlights}
                setConnectionFlights={setConnectionFlights}
                onFlightRouteSubmit={onFlightRouteSubmit}
                onFlightDetailsSubmit={onFlightDetailsSubmit}
                onDisruptionTypeSubmit={onDisruptionTypeSubmit}
                onPassengerDetailsSubmit={onPassengerDetailsSubmit}
                onBookingReferenceSubmit={onBookingReferenceSubmit}
                onDisruptionDetailsSubmit={onDisruptionDetailsSubmit}
                onPaymentDetailsSubmit={onPaymentDetailsSubmit}
                proceedToNextStep={proceedToNextStep}
                setStep={setStep}
                isChecking={isChecking}
                isEligible={isEligible}
                transitions={transitions}
                disruptionType={disruptionType}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClaimFormContent;
