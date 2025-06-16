import React from 'react';
import { motion } from 'framer-motion';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';

import PaymentMethodSelector from './payment-details/PaymentMethodSelector';
import BankTransferFields from './payment-details/BankTransferFields';
import PayPalFields from './payment-details/PayPalFields';
import WiseFields from './payment-details/WiseFields';
import TermsAgreement from './payment-details/TermsAgreement';
import InfoBox from './payment-details/InfoBox';
import PaymentNavigationButtons from './payment-details/PaymentNavigationButtons';
import { AnimationTransitions } from '@/components/claim-form/types';
import { IClaimForm } from '@/components/claim-form/interfaces/claim-form.interface.ts';
import { useClaimJwt } from '@/hooks/useClaimJwt.ts';
import { PaymentMethod } from '@/components/claim-form/enums/payment-method.enum.ts';
import { toast } from '@/components/ui/use-toast.ts';
import api from '@/api/axios.ts';
import { AxiosResponse } from 'axios';

interface PaymentDetailsStepProps {
  onBack: () => void;
  transitions: AnimationTransitions;
  onSkip: () => void;
  newForm: IClaimForm;
  setNewForm: (value: IClaimForm) => void;
  setStep: (step: number) => void;
}

type PaymentFormValues = {
  accountName: string | null;
  accountNumber: string | null;
  bankName: string | null;
  email: string | null;
  iban: string | null;
  paymentMethod: PaymentMethod;
  paypalEmail: string | null;
  termsAgreed: boolean;
};

const PaymentDetailsStep: React.FC<PaymentDetailsStepProps> = ({
  onBack,
  transitions,
  onSkip: _onSkip,
  newForm,
  setNewForm,
  setStep,
}) => {
  // useForm instance
  const { removeClaimJwt, getClaimJwt } = useClaimJwt();
  const onSkip = () => {
    removeClaimJwt();
    _onSkip();
  };
  const form = useForm<PaymentFormValues>({
    mode: 'onChange',
    defaultValues: {
      accountName: newForm.payment.accountName || '',
      accountNumber: newForm.payment.accountNumber || '',
      bankName: newForm.payment.bankName || '',
      email: newForm.payment.email || '',
      iban: newForm.payment.iban || '',
      paymentMethod: newForm.payment.paymentMethod || null,
      paypalEmail: newForm.payment.paypalEmail || '',
      termsAgreed: false,
    },
  });

  const paymentMethod = form.watch('paymentMethod');

  const onSubmit: SubmitHandler<PaymentFormValues> = async (
    data: PaymentFormValues,
  ) => {
    const showToast = () => {
      toast({
        title: 'Complete the Form',
        description: 'All fields are required',
        variant: 'destructive',
      });
    };
    if (!data.termsAgreed) {
      toast({
        title: 'Please Confirm',
        description: 'Agree to the terms',
        variant: 'destructive',
      });
      return;
    }
    let payment = {
      accountName: null,
      accountNumber: null,
      bankName: null,
      email: null,
      iban: null,
      paymentMethod: null,
      paypalEmail: null,
      termsAgreed: true,
    };

    switch (data.paymentMethod) {
      case PaymentMethod.BankTransfer:
        if (
          !data.bankName ||
          !data.accountName ||
          !data.iban ||
          !data.accountNumber
        ) {
          showToast();
          return;
        }
        payment.bankName = data.bankName;
        payment.accountName = data.accountName;
        payment.iban = data.iban;
        payment.accountNumber = data.accountNumber;
        break;
      case PaymentMethod.PayPal:
        if (!data.paypalEmail) {
          showToast();
          return;
        }
        payment.paypalEmail = data.paypalEmail;
        break;
      case PaymentMethod.Wise:
        if (!data.accountName || !data.iban || !data.email) {
          showToast();
          return;
        }
        payment.accountName = data.accountName;
        payment.accountNumber = data.accountNumber;
        payment.email = data.email;
        break;
      default:
        showToast();
        return;
    }
    setNewForm({
      ...newForm,
      payment: {
        ...payment,
      },
    });

    const res: AxiosResponse = await api.put(
      `/claims/${newForm.id}/?jwt=${getClaimJwt()}&step=9`,
      {
        ...newForm,
        payment: {
          ...payment,
        },
      },
    );
    setStep(6);

    removeClaimJwt();
    console.log(res);
  };

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
          <PaymentMethodSelector form={form} />

          {paymentMethod === 'bank_transfer' && (
            <BankTransferFields form={form} />
          )}
          {paymentMethod === 'paypal' && <PayPalFields form={form} />}
          {paymentMethod === 'wise' && <WiseFields form={form} />}

          <TermsAgreement form={form} />

          <InfoBox />

          <PaymentNavigationButtons
            onBack={onBack}
            onSkip={onSkip}
            // isDisabled={!form.formState.isValid}
            // isSubmitting={form.formState.isSubmitting}
          />
        </form>
      </Form>
    </motion.div>
  );
};

export default PaymentDetailsStep;
