
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { motion } from "framer-motion";
import { Form } from "@/components/ui/form";
import { signatureSchema } from "@/components/claim-form/schemas";
import NavigationButtons from "@/components/claim-form/passenger-details/NavigationButtons";
import SignatureField from "@/components/claim-form/signature/SignatureField";
import TermsAgreementField from "@/components/claim-form/signature/TermsAgreementField";
import InfoBox from "@/components/claim-form/signature/InfoBox";
import { AnimationTransitions } from "@/components/claim-form/types";

interface SignatureStepProps {
  form: UseFormReturn<z.infer<typeof signatureSchema>>;
  onSubmit: (data: z.infer<typeof signatureSchema>) => void;
  onBack: () => void;
  transitions: AnimationTransitions;
}

const SignatureStep: React.FC<SignatureStepProps> = ({
  form,
  onSubmit,
  onBack,
  transitions
}) => {
  const handleSubmit = form.handleSubmit(onSubmit);

  // Determine if the Continue button should be disabled
  const isSignatureEmpty = !form.watch("signature");
  const isTermsChecked = form.watch("termsAgreed");
  const isContinueDisabled = isSignatureEmpty || !isTermsChecked;

  return (
    <motion.div
      initial={transitions.initial}
      animate={transitions.animate}
      exit={transitions.exit}
      transition={transitions.transition}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          Great news! It looks like you're entitled to €250 per person under EC 261. To get the money you deserve, sign below.
        </h2>
      </div>

      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <SignatureField form={form} />
          
          <TermsAgreementField form={form} />
          
          <InfoBox />
          
          <NavigationButtons 
            onBack={onBack}
            continueText="Continue"
            isSubmitting={form.formState.isSubmitting}
            isDisabled={isContinueDisabled}
          />
        </form>
      </Form>
    </motion.div>
  );
};

export default SignatureStep;
