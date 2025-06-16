import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Schema and types
import { AnimationTransitions } from '@/components/claim-form/types';

// Component imports
import DisruptionTypeRadioGroup from './flight-details/DisruptionTypeRadioGroup';
import EligibilityResult from './flight-details/EligibilityResult';
import EligibilityResultModal from './flight-details/EligibilityResultModal';
import ArrivalDelayQuestion from './flight-details/ArrivalDelayQuestion';
import NotificationTimeQuestion from './flight-details/NotificationTimeQuestion';
import AlternativeFlightOfferedQuestion from './flight-details/AlternativeFlightOfferedQuestion.tsx';
import { DisruptionType } from '@/components/claim-form/enums/disruption.ts';
import { IClaimForm } from '@/components/claim-form/interfaces/claim-form.interface.ts';
import AlternativeDaysQuestion from '@/components/claim-form/flight-details/AlternativeDaysQuestion.tsx';
import { onDisruptionTypeSubmit } from '@/components/claim-form/flight-details/handleEligble.ts';
import VolunteerQuestion from '@/components/claim-form/flight-details/VolunteerQuestion.tsx';

interface DisruptionTypeStepProps {
  isChecking: boolean;
  isEligible: boolean | null;
  onContinue: () => void;
  transitions: AnimationTransitions;
  onBack: () => void;
  newForm: IClaimForm;
  setNewForm: (form: IClaimForm) => void;
  setStep: (step: number) => void;
}

const DisruptionTypeStep: React.FC<DisruptionTypeStepProps> = ({
  transitions,
  onBack,
  newForm,
  setNewForm,
  setStep,
}) => {
  console.log(newForm);
  const [showModal, setShowModal] = useState(false);
  const [showNotificationTimeQuestion, setShowNotificationTimeQuestion] =
    useState<boolean>(false);
  const [showArrivalDelayQuestion, setShowArrivalDelayQuestion] =
    useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [showAlternativeFlightOffered, setShowAlternativeFlightOffered] =
    useState<boolean>(false);
  const [showAlternativeLateHours, setShowAlternativeLateHours] =
    useState<boolean>(false);
  const [showVolunteerQuestion, setShowVolunteerQuestion] =
    useState<boolean>(false);
  const [isEligible, setIsEligible] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState<boolean>(false);

  const departureAirport = newForm.meta.departureAirport.name;
  const arrivalAirport = newForm.meta.arrivalAirport.name;

  const onContinue = () => {
    const disruptionType = newForm.issue.disruptionType;
    switch (disruptionType) {
      case DisruptionType.missed_connection:
        setNewForm({
          ...newForm,
          issue: {
            ...newForm.issue,
            delay: newForm.issue.delay,
            volunteerDenial: null,
            cancellationNoticeDays: null,
            disruptionType: newForm.issue.disruptionType,
            wasAlternativeFlightOffered: null,
            arrivalTimeDelayOfAlternativeHours: null,
          },
        });
        break;

      case DisruptionType.cancellation:
        setNewForm({
          ...newForm,
          issue: {
            ...newForm.issue,
            delay: null,
            volunteerDenial: null,
            cancellationNoticeDays: newForm.issue.cancellationNoticeDays,
            disruptionType: newForm.issue.disruptionType,
            wasAlternativeFlightOffered:
              newForm.issue.wasAlternativeFlightOffered,
            arrivalTimeDelayOfAlternativeHours: newForm.issue
              .wasAlternativeFlightOffered
              ? newForm.issue.arrivalTimeDelayOfAlternativeHours
              : 0,
          },
        });
        break;

      case DisruptionType.delay:
        setNewForm({
          ...newForm,
          issue: {
            ...newForm.issue,
            delay: newForm.issue.delay,
            volunteerDenial: null,
            cancellationNoticeDays: null,
            disruptionType: newForm.issue.disruptionType,
            wasAlternativeFlightOffered: null,
            arrivalTimeDelayOfAlternativeHours: null,
          },
        });
        break;

      case DisruptionType.denied_boarding:
        setNewForm({
          ...newForm,
          issue: {
            ...newForm.issue,
            delay: null,
            volunteerDenial: newForm.issue.volunteerDenial,
            cancellationNoticeDays: null,
            disruptionType: newForm.issue.disruptionType,
            wasAlternativeFlightOffered: null,
            arrivalTimeDelayOfAlternativeHours: null,
          },
        });
        break;
    }
    setStep(3);
  };

  useEffect(() => {
    // setNewForm({
    //   ...newForm,
    //   issue: {
    //     ...newForm.issue,
    //     delay: null,
    //     cancellationNoticeDays: null,
    //     wasAlternativeFlightOffered: false,
    //     arrivalTimeDelayOfAlternativeHours: 0,
    //   },
    // });
    setShowNotificationTimeQuestion(
      newForm.issue.disruptionType == DisruptionType.cancellation, //&& arrivalDelay !== ''
    );
    setShowArrivalDelayQuestion(
      newForm.issue.disruptionType == DisruptionType.delay ||
        newForm.issue.disruptionType == DisruptionType.missed_connection,
    );
    setShowAlternativeFlightOffered(
      newForm.issue.disruptionType == DisruptionType.cancellation,
    );
    setShowVolunteerQuestion(
      newForm.issue.disruptionType == DisruptionType.denied_boarding,
    );
  }, [newForm.issue.disruptionType]);

  useEffect(() => {
    const disruptionType = newForm.issue.disruptionType;
    const issue = newForm.issue;
    setShowAlternativeLateHours(
      newForm.issue.wasAlternativeFlightOffered &&
        disruptionType == DisruptionType.cancellation,
    );

    switch (disruptionType) {
      case DisruptionType.missed_connection:
        setIsDisabled(!issue.delay);
        break;

      case DisruptionType.cancellation:
        setIsDisabled(
          !(
            issue.wasAlternativeFlightOffered != null &&
            issue.cancellationNoticeDays
          ),
        );
        break;

      case DisruptionType.delay:
        setIsDisabled(!issue.delay);
        break;

      case DisruptionType.denied_boarding:
        setIsDisabled(!(issue.volunteerDenial != null));
        break;

      default:
        setIsDisabled(true);
    }
  }, [newForm.issue]);

  const handleSubmit = () => {
    const issue = newForm.issue;

    setIsEligible(
      onDisruptionTypeSubmit(
        {
          voluntaryDenial: false,
          disruptionType: issue.disruptionType,
          notificationTime: issue.cancellationNoticeDays,
          arrivalDelay: issue.delay,
        },
        setIsChecking,
      ),
    );
  };

  const followUpQuestionAnimations = {
    initial: { opacity: 0, height: 0, overflow: 'hidden' },
    animate: { opacity: 1, height: 'auto', transition: { duration: 0.3 } },
    exit: { opacity: 0, height: 0, transition: { duration: 0.2 } },
  };

  useEffect(() => {}, [newForm.issue]);

  return (
    <motion.div
      key="disruptionType"
      initial={transitions.initial}
      animate={transitions.animate}
      exit={transitions.exit}
      transition={transitions.transition}
    >
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">What Happened?</h2>
        <p className="text-gray-600">
          Tell us what happened to your flight to check eligibility for
          compensation.
        </p>
      </div>

      <DisruptionTypeRadioGroup newForm={newForm} setNewForm={setNewForm} />

      <AnimatePresence>
        {/*{showArrivalDelayQuestion && (*/}
        {showArrivalDelayQuestion && (
          <motion.div
            key="arrivalDelayQuestion"
            {...followUpQuestionAnimations}
          >
            <ArrivalDelayQuestion
              // value={arrivalDelay}
              // onChange={setArrivalDelay}
              newForm={newForm}
              setNewForm={setNewForm}
            />
          </motion.div>
        )}
        {/*)}*/}

        {showNotificationTimeQuestion && (
          <motion.div
            key="notificationTimeQuestion"
            {...followUpQuestionAnimations}
          >
            <NotificationTimeQuestion
              // value={notificationTime}
              // onChange={setNotificationTime}
              newForm={newForm}
              setNewForm={setNewForm}
            />
          </motion.div>
        )}

        {showAlternativeFlightOffered && (
          <motion.div
            key="voluntaryDenialQuestion"
            {...followUpQuestionAnimations}
          >
            <AlternativeFlightOfferedQuestion
              // value={voluntaryDenial}
              // onChange={setVoluntaryDenial}
              newForm={newForm}
              setNewForm={setNewForm}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {showAlternativeLateHours && (
        <motion.div
          key="voluntaryDenialQuestion"
          {...followUpQuestionAnimations}
        >
          <AlternativeDaysQuestion newForm={newForm} setNewForm={setNewForm} />
        </motion.div>
      )}

      {showVolunteerQuestion && (
        <VolunteerQuestion newForm={newForm} setNewForm={setNewForm} />
      )}

      <div className="pt-4 flex justify-between items-center">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="flex items-center"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Flight Details
        </Button>

        <Button
          type="button"
          className="w-full sm:w-auto"
          disabled={isChecking || isDisabled}
          onClick={handleSubmit}
        >
          {isChecking ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Checking Eligibility
            </>
          ) : (
            <>
              Check Eligibility
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>

      <EligibilityResult
        isEligible={isEligible}
        onContinue={onContinue}
        disruptionType={newForm.issue.disruptionType}
        notificationTime={newForm.issue.cancellationNoticeDays}
        departureAirport={departureAirport}
        arrivalAirport={arrivalAirport}
        isDisabled={isDisabled}
      />

      <EligibilityResultModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onContinue={onContinue}
        departureAirport={departureAirport}
        arrivalAirport={arrivalAirport}
      />
    </motion.div>
  );
};

export default DisruptionTypeStep;
