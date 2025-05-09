
import React from "react";
import { motion } from "framer-motion";
import { Form } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

// Schema definition and types
import { paymentDetailsSchema } from "@/components/claim-form/schemas";
import { AnimationTransitions } from "@/components/claim-form/types";

// Component imports
import PaymentMethodSelector from "./payment-details/PaymentMethodSelector";
import BankTransferFields from "./payment-details/BankTransferFields";
import PayPalFields from "./payment-details/PayPalFields";
import WiseFields from "./payment-details/WiseFields";
import TermsAgreement from "./payment-details/TermsAgreement";
import InfoBox from "./payment-details/InfoBox";
import PaymentNavigationButtons from "./payment-details/PaymentNavigationButtons";

interface PaymentDetailsStepProps {
  form: UseFormReturn<z.infer<typeof paymentDetailsSchema>>;
  onSubmit: (data: z.infer<typeof paymentDetailsSchema>) => void;
  onBack: () => void;
  transitions: AnimationTransitions;
}

const PaymentDetailsStep: React.FC<PaymentDetailsStepProps> = ({
  form,
  onSubmit,
  onBack,
  transitions,
}) => {
  return (
    <motion.div
      key="step4"
      initial={transitions.initial}
      animate={transitions.animate}
      exit={transitions.exit}
      transition={transitions.transition}
    >
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Payment Details</h2>
        <p className="text-gray-600">
          Please provide your payment details for receiving the compensation.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Payment method selector component */}
          <PaymentMethodSelector form={form} />

          {/* Conditional rendering based on payment method */}
          {form.watch("paymentMethod") === "bank_transfer" && <BankTransferFields form={form} />}
          {form.watch("paymentMethod") === "paypal" && <PayPalFields form={form} />}
          {form.watch("paymentMethod") === "wise" && <WiseFields form={form} />}

          {/* Terms agreement component */}
          <TermsAgreement form={form} />

          {/* Info box component */}
          <InfoBox />

          {/* Navigation buttons component */}
          <PaymentNavigationButtons onBack={onBack} />
        </form>
      </Form>
    </motion.div>
  );
};

export default PaymentDetailsStep;
