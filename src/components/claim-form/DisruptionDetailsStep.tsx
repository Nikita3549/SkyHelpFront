import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AnimationTransitions } from '@/components/claim-form/types';
import NavigationButtons from './passenger-details/NavigationButtons';
import ReasonProvidedQuestion from './disruption-details/ReasonProvidedQuestion';
import AirlineReasonQuestion from './disruption-details/AirlineReasonQuestion';
import { AdditionalInfoField } from './disruption-details/AdditionalInfoField';
import DisclaimerBox from './disruption-details/DisclaimerBox';
import { Card, CardContent } from '@/components/ui/card';
import { IClaimForm } from '@/components/claim-form/interfaces/claim-form.interface.ts';
import { ReasonProvided } from '@/components/claim-form/enums/reason-provided.enum.ts';
import api from '@/api/axios.ts';
import { ICreateClaim } from '@/components/claim-form/interfaces/create-claim.interface.ts';
import { toast } from '@/components/ui/use-toast.ts';
import { AxiosResponse } from 'axios';
import { DisruptionType } from '@/components/claim-form/enums/disruption.ts';
import { AirlineReason } from '@/components/claim-form/enums/airline-reason.enum.ts';

interface DisruptionDetailsStepProps {
  onBack: () => void;
  transitions: AnimationTransitions;
  newForm: IClaimForm;
  setNewForm: (form: IClaimForm) => void;
  setStep: (step: number) => void;
}

const DisruptionDetailsStep: React.FC<DisruptionDetailsStepProps> = ({
  onBack,
  transitions,
  newForm,
  setNewForm,
  setStep,
}) => {
  const [reasonProvided, setReasonProvided] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    const issue = newForm.issue;

    setLoading(true);
    api
      .post(`/claims/${newForm.meta.flightId}/compensation`, {
        delayHours: issue.delay || null,
        cancellationNoticeDays: issue.cancellationNoticeDays || null,
        wasDeniedBoarding:
          issue.disruptionType == DisruptionType.denied_boarding,
        wasAlternativeFlightOffered: issue.wasAlternativeFlightOffered || false,
        arrivalTimeDelayOfAlternative:
          issue.arrivalTimeDelayOfAlternativeHours || 0,
        wasDisruptionDuoExtraordinaryCircumstances:
          issue.airlineReason == AirlineReason.weather ||
          issue.airlineReason == AirlineReason.strike,
      })
      .then((res: AxiosResponse) => {
        setNewForm({
          ...newForm,
          state: {
            ...newForm.state,
            amount: res.data.compensation,
          },
        });
        setStep(4);
      })
      .catch((e) => {
        toast({
          title: 'Unexpected error',
          description: 'Please try again',
          variant: 'destructive',
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    setReasonProvided(newForm.meta.reasonProvided == ReasonProvided.yes);
  }, [newForm.meta.reasonProvided]);

  return (
    <motion.div
      key="step3"
      initial={transitions.initial}
      animate={transitions.animate}
      exit={transitions.exit}
      transition={transitions.transition}
    >
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 text-black">
          Disruption Details
        </h2>
        <p className="text-gray-600">
          Please tell us more about your disruption experience to help
          strengthen your claim.
        </p>
      </div>

      <form onSubmit={handleNext} className="space-y-8">
        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <ReasonProvidedQuestion
                newForm={newForm}
                setNewForm={setNewForm}
              />
            </CardContent>
          </Card>

          {reasonProvided && (
            <Card className="animate-fade-in">
              <CardContent className="p-6">
                <AirlineReasonQuestion
                  newForm={newForm}
                  setNewForm={setNewForm}
                />
              </CardContent>
            </Card>
          )}

          <Card>
            <CardContent className="p-6">
              <AdditionalInfoField newForm={newForm} setNewForm={setNewForm} />
            </CardContent>
          </Card>

          <DisclaimerBox />
        </div>

        <NavigationButtons onBack={onBack} isSubmitting={loading} />
      </form>
    </motion.div>
  );
};

export default DisruptionDetailsStep;
