
import React from "react";
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
  // Get the current values from the form
  const disruptionType = form.watch("disruptionType");
  const arrivalDelay = form.watch("arrivalDelay");
  
  // Check if we should show the arrival delay question
  const showArrivalDelayQuestion = 
    disruptionType === "delay" || 
    disruptionType === "cancellation" || 
    disruptionType === "denied_boarding";
    
  // Check if we should show the notification time question
  const showNotificationTimeQuestion = 
    disruptionType === "cancellation" && arrivalDelay !== undefined;
    
  // Check if we should show the voluntary denial question
  const showVoluntaryDenialQuestion = 
    disruptionType === "denied_boarding" && arrivalDelay !== undefined;

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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Disruption type radio group component */}
          <DisruptionTypeRadioGroup form={form} />

          {/* Conditional additional questions */}
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
              disabled={isChecking}
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

      {/* Eligibility result component */}
      <EligibilityResult isEligible={isEligible} onContinue={onContinue} />
    </motion.div>
  );
};

export default DisruptionTypeStep;
