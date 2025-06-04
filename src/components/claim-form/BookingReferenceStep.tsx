import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Form } from '@/components/ui/form';
import NavigationButtons from '@/components/claim-form/passenger-details/NavigationButtons';
import BookingReferenceField from '@/components/claim-form/booking-reference/BookingReferenceField';
import { bookingReferenceSchema } from '@/components/claim-form/schemas';
import { AnimationTransitions } from '@/components/claim-form/types';

interface BookingReferenceStepProps {
  form: UseFormReturn<z.infer<typeof bookingReferenceSchema>>;
  onSubmit: (data: z.infer<typeof bookingReferenceSchema>) => void;
  onBack: () => void;
  transitions: AnimationTransitions;
}

const BookingReferenceStep: React.FC<BookingReferenceStepProps> = ({
  form,
  onSubmit,
  onBack,
  transitions,
}) => {
  const handleSubmit = form.handleSubmit(onSubmit);

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
          Booking Reference
        </h2>
        <p className="text-gray-600 mb-6">
          If you have your airline booking reference, please enter it below.
          This can help us verify your flight details faster.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-8">
          <BookingReferenceField form={form} />

          <NavigationButtons
            onBack={onBack}
            continueText="Continue"
            isSubmitting={form.formState.isSubmitting}
          />
        </form>
      </Form>
    </motion.div>
  );
};

export default BookingReferenceStep;
