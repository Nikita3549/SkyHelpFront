import React from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Form } from '@/components/ui/form';
import NavigationButtons from '@/components/claim-form/passenger-details/NavigationButtons';
import SignatureField from '@/components/claim-form/signature/SignatureField';
import TermsAgreementField from '@/components/claim-form/signature/TermsAgreementField';
import InfoBox from '@/components/claim-form/signature/InfoBox';
import { AnimationTransitions } from '@/components/claim-form/types';
import { Button } from '@/components/ui/button.tsx';
import { ArrowRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile.tsx';
import { toast } from '@/components/ui/use-toast.ts';
import { IClaimForm } from './interfaces/claim-form.interface';

interface SignatureStepProps {
  onBack: () => void;
  transitions: AnimationTransitions;
  formData?: any;
  claimId?: string;
  newForm: IClaimForm;
  setStep: (step: number) => void;
}

interface SignatureFormValues {
  signature: string;
  termsAgreed: boolean;
}

const SignatureStep: React.FC<SignatureStepProps> = ({
  onBack,
  transitions,
  formData,
  claimId,
  newForm,
  setStep,
}) => {
  const isMobile = useIsMobile();
  const form = useForm<SignatureFormValues>({
    defaultValues: {
      signature: '',
      termsAgreed: false,
    },
  });

  const handleSubmit = form.handleSubmit((values) => {
    if (!values.termsAgreed) {
      toast({
        title: 'Please Confirm',
        description: 'Agree to the terms',
        variant: 'destructive',
      });
      return;
    }
    console.log('Submitted values:', values);

    setStep(4.9);
  });

  const isSignatureEmpty = !form.watch('signature');
  const isTermsChecked = form.watch('termsAgreed');
  const isContinueDisabled = isSignatureEmpty || !isTermsChecked;

  const claimData = {
    id: claimId || 'CLM' + Math.floor(100000 + Math.random() * 900000),
    customer:
      formData?.passengerDetails?.firstName &&
      formData?.passengerDetails?.lastName
        ? `${formData.passengerDetails.firstName} ${formData.passengerDetails.lastName}`
        : '',
    address: formData?.passengerDetails?.address
      ? `${formData.passengerDetails.address}, ${formData.passengerDetails.city}, ${formData.passengerDetails.postalCode}, ${formData.passengerDetails.country}`
      : '',
    airline: formData?.flightDetails?.airline || '',
    flightnumber: formData?.flightDetails?.flightNumber || '',
    date: formData?.flightDetails?.departureDate || '',
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
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
          Almost done!
        </h2>{' '}
        {newForm.state.amount == 0 ? (
          <p className="text-lg text-gray-700 mb-4">
            Good news! You may qualify for compensation under EC 261. To begin
            the process, just sign below.
          </p>
        ) : (
          <p className="text-lg text-gray-700 mb-4">
            Great news! It looks like you're entitled to{' '}
            <span className="text-blue-600 font-bold">
              €{newForm.state.amount}
            </span>{' '}
            per person under EC 261. To get the money you deserve, sign below.
          </p>
        )}
      </div>

      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <SignatureField form={form} />

          <InfoBox />

          <TermsAgreementField form={form} claimData={claimData} />

          <div className="flex justify-end">
            <Button type="submit" className={isMobile ? 'w-full' : ''}>
              Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </Form>
    </motion.div>
  );
};

export default SignatureStep;
