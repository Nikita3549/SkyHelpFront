import React from 'react';
import { IClaimForm } from '@/components/claim-form/interfaces/claim-form.interface';
import { Label } from '@/components/ui/label';

interface AlternativeDaysQuestionProps {
  newForm: IClaimForm;
  setNewForm: (form: IClaimForm) => void;
}

const AlternativeDaysQuestion: React.FC<AlternativeDaysQuestionProps> = ({
  newForm,
  setNewForm,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const parsed = parseInt(value, 10);
    if (!isNaN(parsed) && parsed >= 0) {
      setNewForm({
        ...newForm,
        issue: {
          ...newForm.issue,
          arrivalTimeDelayOfAlternativeHours: parsed,
        },
      });
    } else if (value === '') {
      setNewForm({
        ...newForm,
        issue: {
          ...newForm.issue,
          arrivalTimeDelayOfAlternativeHours: undefined,
        },
      });
    }
  };

  return (
    <div className="space-y-3 mt-6 p-4 bg-gray-50 rounded-lg border-t border-gray-200 flex flex-col">
      <Label className="text-base font-medium" htmlFor="alternative_delay">
        How many hours late did you arrive on the alternative flight?
      </Label>
      <input
        id="alternative_delay"
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        value={newForm.issue.arrivalTimeDelayOfAlternativeHours || 0}
        onChange={(e) => {
          const value = e.target.value;
          if (/^\d*$/.test(value)) {
            setNewForm({
              ...newForm,
              issue: {
                ...newForm.issue,
                arrivalTimeDelayOfAlternativeHours:
                  value === '' ? undefined : parseInt(value, 10),
              },
            });
          }
        }}
        className="border border-gray-300 rounded-md p-2 w-32"
      />
    </div>
  );
};

export default AlternativeDaysQuestion;
