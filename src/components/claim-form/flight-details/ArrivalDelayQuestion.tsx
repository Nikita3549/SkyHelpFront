import React from 'react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { IClaimForm } from '@/components/claim-form/interfaces/claim-form.interface';
import { DelayCategory } from '@/components/claim-form/enums/delay.enum.ts';

interface ArrivalDelayQuestionProps {
  newForm: IClaimForm;
  setNewForm: (form: IClaimForm) => void;
}

const ArrivalDelayQuestion: React.FC<ArrivalDelayQuestionProps> = ({
  newForm,
  setNewForm,
}) => {
  const handleChange = (value: DelayCategory) => {
    setNewForm({
      ...newForm,
      issue: {
        ...newForm.issue,
        delay: value,
      },
    });
  };

  const arrivalAirport =
    newForm.details.routes.find((r) => !!r.troubled).arrivalAirport.name ||
    'your destination';

  return (
    <div className="space-y-3 mt-6 p-4 bg-gray-50 rounded-lg">
      <p className="text-base font-medium">
        Sorry to hear that. How many hours late did you arrive at{' '}
        {arrivalAirport}?
      </p>
      <RadioGroup
        value={newForm.issue.delay}
        onValueChange={handleChange}
        className="flex flex-col space-y-2"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            value={DelayCategory.threehours_or_more}
            id="3hours_or_more"
          />
          <Label htmlFor="3hours_or_more">3 hours or more</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            value={DelayCategory.less_than_3hours}
            id="less_than_3hours"
          />
          <Label htmlFor="less_than_3hours">Less than 3 hours</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            value={DelayCategory.never_arrived}
            id="never_arrived"
          />
          <Label htmlFor="never_arrived">Never arrived</Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default ArrivalDelayQuestion;
