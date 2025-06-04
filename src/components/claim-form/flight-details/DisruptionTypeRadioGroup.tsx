import React from 'react';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup } from '@/components/ui/radio-group';
import { AlertCircle, Users, Plane, Clock } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { flightDetailsSchema } from '@/components/claim-form/schemas';
import { cn } from '@/lib/utils';

interface DisruptionTypeRadioGroupProps {
  form: UseFormReturn<z.infer<typeof flightDetailsSchema>>;
}

const DisruptionTypeRadioGroup: React.FC<DisruptionTypeRadioGroupProps> = ({
  form,
}) => {
  const disruptionType = form.watch('disruptionType');

  // Fix: Update the function to accept only valid disruption types
  const handleOptionClick = (
    value: 'delay' | 'cancellation' | 'denied_boarding' | 'missed_connection',
  ) => {
    form.setValue('disruptionType', value);

    // Reset dependent fields when changing the disruption type
    form.setValue('arrivalDelay', undefined);
    form.setValue('notificationTime', undefined);
    form.setValue('voluntaryDenial', undefined);
  };

  return (
    <FormField
      control={form.control}
      name="disruptionType"
      render={({ field }) => (
        <FormItem className="md:col-span-2">
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2"
            >
              <div
                className={cn(
                  'relative rounded-lg border p-4 cursor-pointer hover:bg-gray-50 transition-colors',
                  disruptionType === 'delay' ? 'bg-blue-50 border-primary' : '',
                )}
                onClick={() => handleOptionClick('delay')}
              >
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="delay"
                    checked={disruptionType === 'delay'}
                    onChange={() => {}}
                    className="h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                  <label
                    htmlFor="delay"
                    className="flex items-center cursor-pointer"
                  >
                    <Clock className="h-4 w-4 mr-2 text-blue-500" />
                    <span>Flight was delayed</span>
                  </label>
                </div>
                {/* Invisible overlay to cover the entire area for better clicking */}
                <div
                  className="absolute inset-0 cursor-pointer"
                  onClick={() => handleOptionClick('delay')}
                ></div>
              </div>

              <div
                className={cn(
                  'relative rounded-lg border p-4 cursor-pointer hover:bg-gray-50 transition-colors',
                  disruptionType === 'cancellation'
                    ? 'bg-blue-50 border-primary'
                    : '',
                )}
                onClick={() => handleOptionClick('cancellation')}
              >
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="cancellation"
                    checked={disruptionType === 'cancellation'}
                    onChange={() => {}}
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
                {/* Invisible overlay to cover the entire area for better clicking */}
                <div
                  className="absolute inset-0 cursor-pointer"
                  onClick={() => handleOptionClick('cancellation')}
                ></div>
              </div>

              <div
                className={cn(
                  'relative rounded-lg border p-4 cursor-pointer hover:bg-gray-50 transition-colors',
                  disruptionType === 'denied_boarding'
                    ? 'bg-blue-50 border-primary'
                    : '',
                )}
                onClick={() => handleOptionClick('denied_boarding')}
              >
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="denied_boarding"
                    checked={disruptionType === 'denied_boarding'}
                    onChange={() => {}}
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
                {/* Invisible overlay to cover the entire area for better clicking */}
                <div
                  className="absolute inset-0 cursor-pointer"
                  onClick={() => handleOptionClick('denied_boarding')}
                ></div>
              </div>

              <div
                className={cn(
                  'relative rounded-lg border p-4 cursor-pointer hover:bg-gray-50 transition-colors',
                  disruptionType === 'missed_connection'
                    ? 'bg-blue-50 border-primary'
                    : '',
                )}
                onClick={() => handleOptionClick('missed_connection')}
              >
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="missed_connection"
                    checked={disruptionType === 'missed_connection'}
                    onChange={() => {}}
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
                {/* Invisible overlay to cover the entire area for better clicking */}
                <div
                  className="absolute inset-0 cursor-pointer"
                  onClick={() => handleOptionClick('missed_connection')}
                ></div>
              </div>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DisruptionTypeRadioGroup;
