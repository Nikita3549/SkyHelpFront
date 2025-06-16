import React from 'react';
import { Building, CloudRain, HelpCircle, Users, Wrench } from 'lucide-react';
import { cn } from '@/lib/utils';
import { IClaimForm } from '@/components/claim-form/interfaces/claim-form.interface.ts';
import { AirlineReason } from '@/components/claim-form/enums/airline-reason.enum.ts';

interface AirlineReasonQuestionProps {
  newForm: IClaimForm;
  setNewForm: (form: IClaimForm) => void;
}

const reasonOptions = [
  {
    value: AirlineReason.technical_problems,
    title: 'Aircraft technical problem',
    subtitle: 'Issues with the aircraft that affected safety or operation',
    icon: <Wrench className="h-6 w-6 text-blue-600" />,
  },
  {
    value: AirlineReason.weather,
    title: 'Bad weather conditions',
    subtitle: 'Storms, fog, heavy snow, or other severe weather',
    icon: <CloudRain className="h-6 w-6 text-blue-600" />,
  },
  {
    value: AirlineReason.strike,
    title: 'Strike',
    subtitle: 'Industrial action by airline staff or airport workers',
    icon: <Users className="h-6 w-6 text-blue-600" />,
  },
  {
    value: AirlineReason.issues,
    title: 'Airport issues',
    subtitle: 'Capacity constraints, security, or facility problems',
    icon: <Building className="h-6 w-6 text-blue-600" />,
  },
  {
    value: AirlineReason.other,
    title: 'Other reasons',
    subtitle: 'Any other explanation provided by the airline',
    icon: <HelpCircle className="h-6 w-6 text-blue-600" />,
  },
];

const AirlineReasonQuestion: React.FC<AirlineReasonQuestionProps> = ({
  newForm,
  setNewForm,
}) => {
  const value = newForm.issue.airlineReason ?? '';

  const handleChange = (val: string) => {
    setNewForm({
      ...newForm,
      issue: {
        ...newForm.issue,
        airlineReason: val as AirlineReason,
      },
    });
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <label className="text-xl font-semibold text-black block">
        What reason did the airline provide for the disruption?
      </label>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reasonOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            className={cn(
              'flex items-start space-x-3 p-4 border rounded-lg text-left w-full transition-all duration-200',
              'hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50',
              value === option.value
                ? 'border-blue-500 bg-blue-50 shadow-sm'
                : 'border-gray-200',
            )}
            onClick={() => handleChange(option.value)}
            role="radio"
            aria-checked={value === option.value}
            tabIndex={0}
          >
            <div className="flex-shrink-0 p-2 bg-blue-50 rounded-full">
              {option.icon}
            </div>
            <div className="flex-grow">
              <div className="font-medium text-gray-900 mb-1">
                {option.title}
              </div>
              <p className="text-sm text-gray-500">{option.subtitle}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default AirlineReasonQuestion;
