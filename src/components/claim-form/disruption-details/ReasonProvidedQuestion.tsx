import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Check, HelpCircle, X } from 'lucide-react';
import { IClaimForm } from '@/components/claim-form/interfaces/claim-form.interface.ts';
import { ReasonProvided } from '@/components/claim-form/enums/reason-provided.enum.ts';

interface ReasonProvidedQuestionProps {
  newForm: IClaimForm;
  setNewForm: (form: IClaimForm) => void;
}

const ReasonProvidedQuestion: React.FC<ReasonProvidedQuestionProps> = ({
  newForm,
  setNewForm,
}) => {
  const value = newForm.meta.reasonProvided ?? '';

  const handleChange = (val: string) => {
    setNewForm({
      ...newForm,
      issue: {
        ...newForm.issue,
        airlineReason:
          val != ReasonProvided.yes ? null : newForm.issue.airlineReason,
      },
      meta: {
        ...newForm.meta,
        reasonProvided: val as ReasonProvided,
      },
    });
  };

  return (
    <div className="space-y-4">
      <label className="text-xl font-semibold text-black block">
        Did the airline tell you why the flight was disrupted?
      </label>

      <RadioGroup
        value={value}
        onValueChange={handleChange}
        className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-6"
      >
        <label
          htmlFor="reason-yes"
          className={`flex items-center space-x-3 p-4 border rounded-md cursor-pointer hover:bg-gray-50 transition ${
            value === ReasonProvided.yes
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300'
          }`}
        >
          <RadioGroupItem value={ReasonProvided.yes} id="reason-yes" />
          <span className="flex items-center">
            <Check className="h-4 w-4 text-green-500 mr-2" />
            Yes
          </span>
        </label>

        <label
          htmlFor="reason-no"
          className={`flex items-center space-x-3 p-4 border rounded-md cursor-pointer hover:bg-gray-50 transition ${
            value === ReasonProvided.no
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300'
          }`}
        >
          <RadioGroupItem value={ReasonProvided.no} id="reason-no" />
          <span className="flex items-center">
            <X className="h-4 w-4 text-red-500 mr-2" />
            No
          </span>
        </label>

        <label
          htmlFor="reason-dont-remember"
          className={`flex items-center space-x-3 p-4 border rounded-md cursor-pointer hover:bg-gray-50 transition ${
            value === ReasonProvided.dont_remember
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300'
          }`}
        >
          <RadioGroupItem
            value={ReasonProvided.dont_remember}
            id="reason-dont-remember"
          />
          <span className="flex items-center">
            <HelpCircle className="h-4 w-4 text-amber-500 mr-2" />
            Don't remember
          </span>
        </label>
      </RadioGroup>
    </div>
  );
};

export default ReasonProvidedQuestion;
