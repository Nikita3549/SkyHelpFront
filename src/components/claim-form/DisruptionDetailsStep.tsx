
import React from "react";
import { motion } from "framer-motion";
import { Form } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { disruptionDetailsSchema } from "@/components/claim-form/schemas";
import { AnimationTransitions } from "@/components/claim-form/types";
import NavigationButtons from "./passenger-details/NavigationButtons";
import ReasonProvidedQuestion from "./disruption-details/ReasonProvidedQuestion";
import AirlineReasonQuestion from "./disruption-details/AirlineReasonQuestion";
import AdditionalInfoField from "./disruption-details/AdditionalInfoField";
import DisclaimerBox from "./disruption-details/DisclaimerBox";

interface DisruptionDetailsStepProps {
  form: UseFormReturn<z.infer<typeof disruptionDetailsSchema>>;
  onSubmit: (data: z.infer<typeof disruptionDetailsSchema>) => void;
  onBack: () => void;
  transitions: AnimationTransitions;
  disruptionType: string;
}

const DisruptionDetailsStep: React.FC<DisruptionDetailsStepProps> = ({
  form,
  onSubmit,
  onBack,
  transitions,
}) => {
  const reasonProvided = form.watch("reasonProvided");

  return (
    <motion.div
      key="step3"
      initial={transitions.initial}
      animate={transitions.animate}
      exit={transitions.exit}
      transition={transitions.transition}
    >
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Disruption Details</h2>
        <p className="text-gray-600">
          Please provide more details about the flight disruption you experienced.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-8">
            {/* Question 1: Did the airline tell you why the flight was disrupted? */}
            <ReasonProvidedQuestion form={form} />

            {/* Question 2: What was the reason provided by the airline? - Only shown if "Yes" selected */}
            {reasonProvided === "yes" && <AirlineReasonQuestion form={form} />}

            {/* Free-text field with tooltip */}
            <AdditionalInfoField form={form} />
            
            {/* Disclaimer text */}
            <DisclaimerBox />
          </div>

          <NavigationButtons onBack={onBack} />
        </form>
      </Form>
    </motion.div>
  );
};

export default DisruptionDetailsStep;
