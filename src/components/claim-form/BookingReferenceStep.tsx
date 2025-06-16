import React, { useMemo } from 'react';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';

import NavigationButtons from '@/components/claim-form/passenger-details/NavigationButtons';
import BookingReferenceField from '@/components/claim-form/booking-reference/BookingReferenceField';
import { AnimationTransitions } from '@/components/claim-form/types';
import { Form } from '@/components/ui/form';
import { IClaimForm } from '@/components/claim-form/interfaces/claim-form.interface.ts';
import { Button } from '@/components/ui/button.tsx';
import { ArrowRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile.tsx';
import { AxiosResponse } from 'axios';
import api from '@/api/axios.ts';
import { toast } from '@/hooks/use-toast.ts';
import { useClaimJwt } from '@/hooks/useClaimJwt.ts';

interface BookingReferenceStepProps {
  transitions: AnimationTransitions;
  newForm: IClaimForm;
  setNewForm: (value: IClaimForm) => void;
  setStep: (step: number) => void;
}

const bookingReferenceSchema = z.object({
  bookingReference: z.string().optional(),
});

type BookingReferenceData = z.infer<typeof bookingReferenceSchema>;

const BookingReferenceStep: React.FC<BookingReferenceStepProps> = ({
  transitions,
  newForm,
  setNewForm,
  setStep,
}) => {
  const isMobile = useIsMobile();
  const { getClaimJwt } = useClaimJwt();
  const form = useForm<BookingReferenceData>({
    resolver: zodResolver(bookingReferenceSchema),
    defaultValues: {
      bookingReference: newForm.details.bookingRef || '',
    },
  });
  console.log(newForm);

  const onSubmit: SubmitHandler<BookingReferenceData> = async (data) => {
    setNewForm({
      ...newForm,
      details: {
        ...newForm.details,
        bookingRef: data.bookingReference || null,
      },
    });
    const res: AxiosResponse = await api
      .put(
        `/claims/${newForm.id}/`,
        {
          details: {
            routes: newForm.details.routes,
            flightNumber: newForm.details.flightNumber,
            date: newForm.details.date,
            bookingRef: data.bookingReference || null,
            airline: {
              icao: newForm.details.airline.icao,
              name: newForm.details.airline.name,
              city: newForm.details.airline.city,
              country: newForm.details.airline.country,
            },
          },
          state: {
            ...newForm.state,
          },
          customer: {
            ...newForm.customer,
          },
          issue: {
            ...newForm.issue,
          },
        },
        {
          params: {
            jwt: getClaimJwt(),
            step: 6,
          },
        },
      )

      .catch((e) => {
        toast({
          title: 'Unexpected error',
          description: 'Please try again',
          variant: 'destructive',
        });
        console.error(e);
        throw e;
      });

    console.log(res);
    setStep(4.8);
  };

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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <BookingReferenceField form={form} />

          <div className="flex justify-end">
            <Button
              type="submit"
              // disabled={isSubmitting || isDisabled}
              className={isMobile ? 'w-full' : ''}
            >
              Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </Form>
    </motion.div>
  );
};

export default BookingReferenceStep;
