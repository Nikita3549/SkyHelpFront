
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
import { Card, CardContent } from "@/components/ui/card";

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
  disruptionType,
}) => {
  const reasonProvided = form.watch("reasonProvided");

  const getDisruptionTypeLabel = () => {
    switch (disruptionType) {
      case "delay": return "flight delay";
      case "cancellation": return "flight cancellation";
      case "denied_boarding": return "denied boarding";
      case "missed_connection": return "missed connection";
      default: return "flight disruption";
    }
  };

  return (
    <motion.div
      key="step3"
      initial={transitions.initial}
      animate={transitions.animate}
      exit={transitions.exit}
      transition={transitions.transition}
    >
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-blue-800">Disruption Details</h2>
        <p className="text-gray-600">
          Please tell us more about your {getDisruptionTypeLabel()} experience to help strengthen your claim.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-8">
            <Card>
              <CardContent className="p-6">
                <ReasonProvidedQuestion form={form} />
              </CardContent>
            </Card>

            {reasonProvided === "yes" && (
              <Card className="animate-fade-in">
                <CardContent className="p-6">
                  <AirlineReasonQuestion form={form} />
                </CardContent>
              </Card>
            )}

            <Card>
              <CardContent className="p-6">
                <AdditionalInfoField form={form} />
              </CardContent>
            </Card>
            
            <DisclaimerBox />
          </div>

          <NavigationButtons onBack={onBack} />
        </form>
      </Form>
    </motion.div>
  );
};

export default DisruptionDetailsStep;
