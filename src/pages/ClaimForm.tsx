
import React from "react";
import { useEffect } from "react";
import { AnimationTransitions } from "@/components/claim-form/types";

// Component imports
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
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1 bg-blue-900 text-white rounded-lg p-6">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-6">AirHelp</h2>
              
              <ul className="space-y-6">
                <li className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center">
                    <div className="w-2 h-2 bg-blue-900 rounded-full"></div>
                  </div>
                  <span className="font-medium">Eligibility Check</span>
                </li>
                <li className="flex items-center gap-2 opacity-50">
                  <div className="w-4 h-4 rounded-full border border-white"></div>
                  <span>Additional Information</span>
                </li>
                <li className="flex items-center gap-2 opacity-50">
                  <div className="w-4 h-4 rounded-full border border-white"></div>
                  <span>Documents</span>
                </li>
                <li className="flex items-center gap-2 opacity-50">
                  <div className="w-4 h-4 rounded-full border border-white"></div>
                  <span>Finish</span>
                </li>
              </ul>
            </div>
            
            <div className="mt-auto pt-20">
              <p className="text-sm mb-4">AirHelp has been featured in</p>
              <div className="space-y-4 opacity-80">
                <div className="h-6">
                  <div className="text-white font-serif italic font-bold">The Washington Post</div>
                </div>
                <div className="h-6 flex items-center">
                  <div className="w-6 h-6 bg-white rounded-full mr-2"></div>
                  <span className="font-bold">USA TODAY</span>
                </div>
                <div className="h-6">
                  <span className="font-serif font-bold">WSJ</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <div></div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-blue-600">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>We enforce your rights as a consumer</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-bold">EN</span>
                </div>
              </div>
            </div>
            
            <PreFilledValuesSyncer
              form={flightDetailsForm}
              preFilledDepartureAirport={preFilledDepartureAirport}
              preFilledArrivalAirport={preFilledArrivalAirport}
              preFilledFlightNumber={preFilledFlightNumber}
              preFilledDepartureDate={preFilledDepartureDate}
              locationState={location.state}
            />
            
            {renderStep()}
            
            <div className="flex justify-between items-center mt-10 pt-6 border-t text-sm text-gray-600">
              <div className="flex gap-6">
                <a href="#" className="hover:text-blue-700">Help</a>
                <a href="#" className="hover:text-blue-700">Terms and Conditions</a>
                <a href="#" className="hover:text-blue-700">Privacy Policy</a>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">Excellent</span>
                <div className="flex">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <span>211,063 reviews on</span>
                <span className="font-medium">Trustpilot</span>
              </div>
              <div className="text-xs">
                © 2025 AirHelp
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClaimForm;
