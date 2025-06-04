import React from 'react';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { flightDetailsSchema } from '@/components/claim-form/schemas';

interface ArrivalDelayQuestionProps {
  form: UseFormReturn<z.infer<typeof flightDetailsSchema>>;
}

const ArrivalDelayQuestion: React.FC<ArrivalDelayQuestionProps> = ({
  form,
}) => {
  // Get the arrival airport from the form to display it in the question
  const arrivalAirport = form.watch('arrivalAirport') || 'your destination';
  const displayAirport =
    arrivalAirport && arrivalAirport.length > 0
      ? `${arrivalAirport}`
      : 'your destination';

  return (
    <FormField
      control={form.control}
      name="arrivalDelay"
      render={({ field }) => (
        <FormItem className="space-y-3 mt-6 p-4 bg-gray-50 rounded-lg">
          <FormLabel className="text-base">
            Sorry to hear that. How many hours late did you arrive at{' '}
            {displayAirport}?
          </FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="3hours_or_more" id="3hours_or_more" />
                <Label htmlFor="3hours_or_more">3 hours or more</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="less_than_3hours"
                  id="less_than_3hours"
                />
                <Label htmlFor="less_than_3hours">Less than 3 hours</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="never_arrived" id="never_arrived" />
                <Label htmlFor="never_arrived">Never arrived</Label>
              </div>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ArrivalDelayQuestion;
