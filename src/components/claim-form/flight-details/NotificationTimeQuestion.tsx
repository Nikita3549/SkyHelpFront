import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { IClaimForm } from '@/components/claim-form/interfaces/claim-form.interface';
import { CancellationNotice } from '@/components/claim-form/enums/cancellation.enum.ts';

interface NotificationTimeQuestionProps {
  newForm: IClaimForm;
  setNewForm: (value: IClaimForm) => void;
}

const NotificationTimeQuestion: React.FC<NotificationTimeQuestionProps> = ({
  newForm,
  setNewForm,
}) => {
  const handleChange = (value: CancellationNotice) => {
    setNewForm({
      ...newForm,
      issue: {
        ...newForm.issue,
        cancellationNoticeDays: value,
      },
    });
  };

  return (
    <div className="space-y-3 mt-6 p-4 bg-gray-50 rounded-lg border-t border-gray-200">
      <div className="text-base font-medium">
        How many days before the departure were you informed about the flight
        change?
      </div>
      <RadioGroup
        value={newForm.issue.cancellationNoticeDays ?? ''}
        onValueChange={handleChange}
        className="flex flex-col space-y-2"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            value={CancellationNotice.less_than_14days}
            id="less_than_14days"
          />
          <Label htmlFor="less_than_14days">Less than 14 days</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            value={CancellationNotice.fourteen_days_or_more}
            id="fourteen_days_or_more"
          />
          <Label htmlFor="fourteen_days_or_more">14 days or more</Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default NotificationTimeQuestion;
