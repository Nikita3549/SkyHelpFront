import React from 'react';

import { RadioGroup } from '@/components/ui/radio-group';
import { AlertCircle, Clock, Plane, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { IClaimForm } from '@/components/claim-form/interfaces/claim-form.interface.ts';
import { DisruptionType } from '@/components/claim-form/enums/disruption.ts';

interface DisruptionTypeRadioGroupProps {
  newForm: IClaimForm;
  setNewForm: (value: IClaimForm) => void;
}

const DisruptionTypeRadioGroup: React.FC<DisruptionTypeRadioGroupProps> = ({
  newForm,
  setNewForm,
}) => {
  const disruptionType = newForm.issue.disruptionType;

  const handleOptionClick = (value: DisruptionType) => {
    setNewForm({
      ...newForm,
      issue: {
        ...newForm.issue,
        disruptionType: value,
      },
    });
  };

  return (
    <div className="md:col-span-2">
      <RadioGroup
        value={disruptionType}
        onValueChange={(value: DisruptionType) => handleOptionClick(value)}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2"
      >
        {/* Delay */}
        <div
          className={cn(
            'relative rounded-lg border p-4 cursor-pointer hover:bg-gray-50 transition-colors',
            disruptionType === DisruptionType.delay &&
              'bg-blue-50 border-primary',
          )}
          onClick={() => handleOptionClick(DisruptionType.delay)}
        >
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="delay"
              value={DisruptionType.delay}
              checked={disruptionType === DisruptionType.delay}
              readOnly
              className="h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <label htmlFor="delay" className="flex items-center cursor-pointer">
              <Clock className="h-4 w-4 mr-2 text-blue-500" />
              <span>Flight was delayed</span>
            </label>
          </div>
          <div
            className="absolute inset-0 cursor-pointer"
            onClick={() => handleOptionClick(DisruptionType.delay)}
          />
        </div>

        {/* Cancellation */}
        <div
          className={cn(
            'relative rounded-lg border p-4 cursor-pointer hover:bg-gray-50 transition-colors',
            disruptionType === DisruptionType.cancellation &&
              'bg-blue-50 border-primary',
          )}
          onClick={() => handleOptionClick(DisruptionType.cancellation)}
        >
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="cancellation"
              value={DisruptionType.cancellation}
              checked={disruptionType === DisruptionType.cancellation}
              readOnly
              className="h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <label
              htmlFor="cancellation"
              className="flex items-center cursor-pointer"
            >
              <AlertCircle className="h-4 w-4 mr-2 text-red-500" />
              <span>Flight was cancelled</span>
            </label>
          </div>
          <div
            className="absolute inset-0 cursor-pointer"
            onClick={() => handleOptionClick(DisruptionType.cancellation)}
          />
        </div>

        {/* Denied boarding */}
        <div
          className={cn(
            'relative rounded-lg border p-4 cursor-pointer hover:bg-gray-50 transition-colors',
            disruptionType === DisruptionType.denied_boarding &&
              'bg-blue-50 border-primary',
          )}
          onClick={() => handleOptionClick(DisruptionType.denied_boarding)}
        >
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="denied_boarding"
              value={DisruptionType.denied_boarding}
              checked={disruptionType === DisruptionType.denied_boarding}
              readOnly
              className="h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <label
              htmlFor="denied_boarding"
              className="flex items-center cursor-pointer"
            >
              <Users className="h-4 w-4 mr-2 text-orange-500" />
              <span>Denied boarding (overbooking)</span>
            </label>
          </div>
          <div
            className="absolute inset-0 cursor-pointer"
            onClick={() => handleOptionClick(DisruptionType.denied_boarding)}
          />
        </div>

        {/* Missed connection */}
        <div
          className={cn(
            'relative rounded-lg border p-4 cursor-pointer hover:bg-gray-50 transition-colors',
            disruptionType === DisruptionType.missed_connection &&
              'bg-blue-50 border-primary',
          )}
          onClick={() => handleOptionClick(DisruptionType.missed_connection)}
        >
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="missed_connection"
              value={DisruptionType.missed_connection}
              checked={disruptionType === DisruptionType.missed_connection}
              readOnly
              className="h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <label
              htmlFor="missed_connection"
              className="flex items-center cursor-pointer"
            >
              <Plane className="h-4 w-4 mr-2 text-blue-500" />
              <span>Missed connecting flight</span>
            </label>
          </div>
          <div
            className="absolute inset-0 cursor-pointer"
            onClick={() => handleOptionClick(DisruptionType.missed_connection)}
          />
        </div>
      </RadioGroup>
    </div>
  );
};

export default DisruptionTypeRadioGroup;
