import React, { useEffect, useState } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Form } from '@/components/ui/form';
import NavigationButtons from '@/components/claim-form/passenger-details/NavigationButtons';
import SignatureField from '@/components/claim-form/signature/SignatureField';
import TermsAgreementField from '@/components/claim-form/signature/TermsAgreementField';
import InfoBox from '@/components/claim-form/signature/InfoBox';
import { AnimationTransitions } from '@/components/claim-form/types';
import { Button } from '@/components/ui/button.tsx';
import { ArrowRight, Loader, LoaderCircle } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile.tsx';
import { toast } from '@/components/ui/use-toast.ts';
import { IClaimForm } from './interfaces/claim-form.interface';
import api from '@/api/axios.ts';
import { useClaimJwt } from '@/hooks/useClaimJwt.ts';
import { useSearchParams } from 'react-router-dom';
import { Spinner } from '@/components/Spinner.tsx';

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
  newForm,
  setStep,
}) => {
  const [iframeUrl, setIframeUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const claimType = searchParams.get('test');
  const isMobile = useIsMobile();
  const { getClaimJwt } = useClaimJwt();
  const claimId = 'cmc3wd5f10000rbpzo5vqs1ep'; //newForm.id
  const form = useForm<SignatureFormValues>({
    defaultValues: {
      signature: '',
      termsAgreed: false,
    },
  });

  const handleGetIframeUrl = async () => {
    setLoading(true);
    const res = await api
      .post('/docusign/url/generate', {
        jwt:
          claimType == 'docusign'
            ? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGFpbUlkIjoiY21jM3dkNWYxMDAwMHJicHpvNXZxczFlcCIsImlhdCI6MTc1MDM2ODc1OCwiZXhwIjoxNzUyMDk2NzU4fQ.gE4uNrW-KrL-bcgjJbkGdH4z2TlCdP9MeIqNsjAEi8I'
            : getClaimJwt(),
        claimId, // || newForm.id,
      })
      .catch((e) => {
        throw e;
      })
      .finally(() => {
        setLoading(false);
      });

    setIframeUrl(res.data.url);
  };

  useEffect(() => {
    handleGetIframeUrl();
  }, []);

  const handleSubmit = form.handleSubmit(async (values) => {
    if (!values.termsAgreed) {
      toast({
        title: 'Please Confirm',
        description: 'Agree to the terms',
        variant: 'destructive',
      });
      return;
    }

    const res = await api.get(`/docusign/${claimId}/is-signed`);

    if (!res.data.isSigned) {
      toast({
        title: 'Please Sign',
        description: 'Sign a document or wait a few seconds',
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
    id: newForm.id,
    customer: newForm.customer.firstName + ' ' + newForm.customer.lastName,
    address: newForm.customer.address,
    airline: newForm.details.airline.name,
    flightnumber: newForm.details.flightNumber,
    date: newForm.details.date.toISOString().slice(0, 10),
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
          {/*<SignatureField form={form} />*/}
          <div className="w-full h-[70vh] flex justify-center align-middle">
            {loading ? (
              <LoaderCircle
                className="animate-spin mt-auto mb-auto"
                color="#2563eb"
                size={64}
              />
            ) : (
              <iframe
                className="w-full h-full rounded-3xl"
                src={iframeUrl}
              ></iframe>
            )}
          </div>

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
