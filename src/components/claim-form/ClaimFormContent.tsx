import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import ProgressBar from '@/components/claim-form/ProgressBar';
import PreFilledValuesSyncer from '@/components/claim-form/PreFilledValuesSyncer';
import ClaimFormTimeline from '@/components/claim-form/ClaimFormTimeline';
import StepRenderer from '@/components/claim-form/StepRenderer';
import { AnimationTransitions } from '@/components/claim-form/types';
import { UseFormReturn } from 'react-hook-form';
import { Airport } from '@/components/AirportInput.tsx';
import { IClaimForm } from '@/components/claim-form/interfaces/claim-form.interface.ts';

interface ClaimFormContentProps {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  showBoardingPassUpload: boolean;
  // flightRouteForm: UseFormReturn<any>;
  // flightDetailsForm: UseFormReturn<any>;
  // passengerDetailsForm: UseFormReturn<any>;
  // bookingReferenceForm: UseFormReturn<any>;
  // disruptionDetailsForm: UseFormReturn<any>;
  // paymentDetailsForm: UseFormReturn<any>;
  // signatureForm: UseFormReturn<any>;
  // flightDocumentsForm: UseFormReturn<any>;
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
  isChecking: boolean;
  isEligible: boolean | null;
  transitions: AnimationTransitions;
  // disruptionType: string;
  preFilledDepartureAirport: Airport;
  preFilledArrivalAirport: Airport;
  preFilledConnectingFlights: Airport[];
  preFilledFlightNumber: string;
  preFilledDepartureDate: string;
  locationState: any;
  claimId?: string;
  formData?: any;
  newForm: IClaimForm;
  setNewForm: (value: IClaimForm) => void;
}

const ClaimFormContent: React.FC<ClaimFormContentProps> = ({
  step,
  setStep,
  showBoardingPassUpload,
  // flightRouteForm,
  // flightDetailsForm,
  // passengerDetailsForm,
  // bookingReferenceForm,
  // disruptionDetailsForm,
  // paymentDetailsForm,
  // signatureForm,
  // flightDocumentsForm,
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
  isChecking,
  isEligible,
  transitions,
  // disruptionType,
  preFilledDepartureAirport,
  preFilledArrivalAirport,
  preFilledFlightNumber,
  preFilledDepartureDate,
  preFilledConnectingFlights,
  locationState,
  claimId,
  // formData,
  newForm,
  setNewForm,
}) => {
  const isMobile = useIsMobile();

  // Define the total number of steps for the progress bar calculation
  // Step 6 is the Thank You step (final step)
  const totalSteps = 6;

  return (
    <div className="py-8 md:py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container-custom px-4 md:px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8">
          {/* Timeline sidebar */}
          <div className={`${isMobile ? 'mb-6' : 'md:col-span-1 pt-6'}`}>
            <ClaimFormTimeline
              step={step}
              showBoardingPassUpload={showBoardingPassUpload}
            />
          </div>

          {/* Main form content */}
          <div className="md:col-span-3">
            {step < 6 && (
              <ProgressBar
                step={showBoardingPassUpload && step < 2 ? 1 : step}
                totalSteps={totalSteps}
              />
            )}
            <PreFilledValuesSyncer
              preFilledDepartureAirport={preFilledDepartureAirport}
              preFilledArrivalAirport={preFilledArrivalAirport}
              preFilledFlightNumber={preFilledFlightNumber}
              preFilledDepartureDate={preFilledDepartureDate}
              preFilledConnectingFlights={preFilledConnectingFlights}
              locationState={locationState}
              newForm={newForm}
              setNewForm={setNewForm}
            />
            <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
              <StepRenderer
                step={step}
                showBoardingPassUpload={showBoardingPassUpload}
                // flightRouteForm={flightRouteForm}
                // flightDetailsForm={flightDetailsForm}
                // passengerDetailsForm={passengerDetailsForm}
                // bookingReferenceForm={bookingReferenceForm}
                // disruptionDetailsForm={disruptionDetailsForm}
                // paymentDetailsForm={paymentDetailsForm}
                // signatureForm={signatureForm}
                // flightDocumentsForm={flightDocumentsForm}
                connectionFlights={connectionFlights}
                setConnectionFlights={setConnectionFlights}
                onFlightRouteSubmit={onFlightRouteSubmit}
                onFlightDetailsSubmit={onFlightDetailsSubmit}
                onDisruptionTypeSubmit={onDisruptionTypeSubmit}
                onPassengerDetailsSubmit={onPassengerDetailsSubmit}
                onBookingReferenceSubmit={onBookingReferenceSubmit}
                onSignatureSubmit={onSignatureSubmit}
                onFlightDocumentsSubmit={onFlightDocumentsSubmit}
                onDisruptionDetailsSubmit={onDisruptionDetailsSubmit}
                onPaymentDetailsSubmit={onPaymentDetailsSubmit}
                skipPaymentDetails={skipPaymentDetails}
                proceedToNextStep={proceedToNextStep}
                setStep={setStep}
                isChecking={isChecking}
                isEligible={isEligible}
                transitions={transitions}
                // disruptionType={disruptionType}
                claimId={claimId}
                // formData={formData}
                newForm={newForm}
                setNewForm={setNewForm}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClaimFormContent;
