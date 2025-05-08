import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

// Schema and types
import { flightDetailsSchema } from "@/components/claim-form/schemas";
import { AnimationTransitions } from "@/components/claim-form/types";

// Component imports
import DisruptionTypeRadioGroup from "./flight-details/DisruptionTypeRadioGroup";
import EligibilityResult from "./flight-details/EligibilityResult";
import EligibilityResultModal from "./flight-details/EligibilityResultModal";
import ArrivalDelayQuestion from "./flight-details/ArrivalDelayQuestion";
import NotificationTimeQuestion from "./flight-details/NotificationTimeQuestion";
import VoluntaryDenialQuestion from "./flight-details/VoluntaryDenialQuestion";

interface DisruptionTypeStepProps {
  form: UseFormReturn<z.infer<typeof flightDetailsSchema>>;
  onSubmit: (data: z.infer<typeof flightDetailsSchema>) => void;
  isChecking: boolean;
  isEligible: boolean | null;
  onContinue: () => void;
  transitions: AnimationTransitions;
  onBack: () => void;
}

const DisruptionTypeStep: React.FC<DisruptionTypeStepProps> = ({
  form,
  onSubmit,
  isChecking,
  isEligible,
  onContinue,
  transitions,
  onBack,
}) => {
  const [showModal, setShowModal] = useState(false);
  
  // Get the current values from the form
  const disruptionType = form.watch("disruptionType");
  const arrivalDelay = form.watch("arrivalDelay");
  const notificationTime = form.watch("notificationTime");
  const departureAirport = form.watch("departureAirport");
  const arrivalAirport = form.watch("arrivalAirport");
  
  // Check if any disruption type has been selected - fixed comparison
  const hasSelectedDisruptionType = disruptionType !== undefined;

  // Check if we should show the arrival delay question
  const showArrivalDelayQuestion = 
    hasSelectedDisruptionType &&
    (disruptionType === "delay" || 
    disruptionType === "cancellation" || 
    disruptionType === "denied_boarding" ||
    disruptionType === "missed_connection");
    
  // Check if we should show the notification time question
  const showNotificationTimeQuestion = 
    disruptionType === "cancellation" && arrivalDelay !== undefined;
    
  // Check if we should show the voluntary denial question
  const showVoluntaryDenialQuestion = 
    disruptionType === "denied_boarding" && arrivalDelay !== undefined;

  // Handle form submission
  const handleSubmit = (data: z.infer<typeof flightDetailsSchema>) => {
    // Special case: If flight was cancelled with 14+ days notice, show the modal instead
    if (data.disruptionType === "cancellation" && data.notificationTime === "14days_or_more") {
      setShowModal(true);
    } else {
      // Otherwise proceed with normal submission
      onSubmit(data);
    }
  };
  
  // Special case for cancellations with 14+ days notice
  const isCancellationWithSufficientNotice = 
    disruptionType === "cancellation" && 
    notificationTime === "14days_or_more";

  return (
    <motion.div
      key="disruptionType"
      initial={transitions.initial}
      animate={transitions.animate}
      exit={transitions.exit}
      transition={transitions.transition}
    >
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">What Happened?</h2>
        <p className="text-gray-600">
          Tell us what happened to your flight to check eligibility for compensation.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          {/* Disruption type radio group component */}
          <DisruptionTypeRadioGroup form={form} />

          {/* Conditional additional questions - only shown after a selection */}
          {showArrivalDelayQuestion && (
            <ArrivalDelayQuestion 
              form={form} 
            />
          )}

          {showNotificationTimeQuestion && (
            <NotificationTimeQuestion 
              form={form} 
            />
          )}

          {showVoluntaryDenialQuestion && (
            <VoluntaryDenialQuestion 
              form={form} 
            />
          )}

          <div className="pt-4 flex justify-between items-center">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onBack}
              className="flex items-center"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Flight Details
            </Button>
            
            <Button 
              type="submit" 
              className="w-full sm:w-auto"
              disabled={isChecking || !hasSelectedDisruptionType || (!arrivalDelay && showArrivalDelayQuestion)}
            >
              {isChecking ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Checking Eligibility
                </>
              ) : (
                <>
                  Check Eligibility
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>

      {/* Regular eligibility result (non-modal) */}
      {!isCancellationWithSufficientNotice && (
        <EligibilityResult 
          isEligible={isEligible} 
          onContinue={onContinue}
          disruptionType={disruptionType}
          notificationTime={notificationTime}
          departureAirport={departureAirport}
          arrivalAirport={arrivalAirport}
        />
      )}

      {/* Modal for cancellation with sufficient notice */}
      <EligibilityResultModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onContinue={onContinue}
        departureAirport={departureAirport}
        arrivalAirport={arrivalAirport}
      />
    </motion.div>
  );
};

export default DisruptionTypeStep;
