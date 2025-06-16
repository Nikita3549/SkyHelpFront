import React from 'react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { IClaimForm } from '@/components/claim-form/interfaces/claim-form.interface';

interface VoluntaryDenialQuestionProps {
  newForm: IClaimForm;
  setNewForm: (form: IClaimForm) => void;
}

const VoluntaryDenialQuestion: React.FC<VoluntaryDenialQuestionProps> = ({
  newForm,
  setNewForm,
}) => {
  const handleChange = (value: string) => {
    setNewForm({
      ...newForm,
      issue: {
        ...newForm.issue,
        volunteerDenial: value == 'true',
      },
    });
  };

  return (
    <div className="space-y-3 mt-6 p-4 bg-gray-50 rounded-lg border-t border-gray-200">
      <p className="text-base font-medium">
        Did you volunteer to give up your seat in exchange for other benefits
        from the airline?
      </p>
      <RadioGroup
        value={String(newForm.issue.volunteerDenial)}
        onValueChange={handleChange}
        className="flex flex-col space-y-2"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="true" id="voluntary_yes" />
          <Label htmlFor="voluntary_yes">Yes</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="false" id="voluntary_no" />
          <Label htmlFor="voluntary_no">No</Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default VoluntaryDenialQuestion;
