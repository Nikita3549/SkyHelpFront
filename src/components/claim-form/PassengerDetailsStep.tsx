
import React from "react";
import { motion } from "framer-motion";
import { Form } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

// Schema and components
import { passengerDetailsSchema } from "@/components/claim-form/schemas";
import { AnimationTransitions } from "@/components/claim-form/types";
import PersonalInfoFields from "./passenger-details/PersonalInfoFields";
import AddressFields from "./passenger-details/AddressFields";
import NavigationButtons from "./passenger-details/NavigationButtons";

interface PassengerDetailsStepProps {
  form: UseFormReturn<z.infer<typeof passengerDetailsSchema>>;
  onSubmit: (data: z.infer<typeof passengerDetailsSchema>) => void;
  onBack: () => void;
  transitions: AnimationTransitions;
}

const PassengerDetailsStep: React.FC<PassengerDetailsStepProps> = ({
  form,
  onSubmit,
  onBack,
  transitions,
}) => {
  return (
    <motion.div
      key="step2"
      initial={transitions.initial}
      animate={transitions.animate}
      exit={transitions.exit}
      transition={transitions.transition}
    >
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Passenger Details</h2>
        <p className="text-gray-600">
          Please provide your contact information so we can process your claim.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal information fields component */}
            <PersonalInfoFields form={form} />
            
            {/* Address fields component */}
            <AddressFields form={form} />
          </div>

          {/* Navigation buttons component */}
          <NavigationButtons onBack={onBack} />
        </form>
      </Form>
    </motion.div>
  );
};

export default PassengerDetailsStep;
