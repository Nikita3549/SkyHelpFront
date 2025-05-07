
import React from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { disruptionDetailsSchema } from "@/components/claim-form/schemas";

interface AirlineReasonQuestionProps {
  form: UseFormReturn<z.infer<typeof disruptionDetailsSchema>>;
}

const AirlineReasonQuestion: React.FC<AirlineReasonQuestionProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="airlineReason"
      render={({ field }) => (
        <FormItem className="space-y-4 animate-fade-in">
          <FormLabel className="text-lg font-medium block">
            What reason did the airline provide for the disruption?
          </FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
            >
              <FormItem className="flex items-center space-x-3 space-y-0 border rounded-md p-4 hover:border-blue-300 hover:bg-blue-50 transition-colors cursor-pointer">
                <FormControl>
                  <RadioGroupItem value="technical_problem" />
                </FormControl>
                <div>
                  <FormLabel className="font-medium cursor-pointer block">Aircraft technical problem</FormLabel>
                  <p className="text-xs text-gray-500 mt-1">Issues with the aircraft that affected safety or operation</p>
                </div>
              </FormItem>
              <FormItem className="flex items-center space-x-3 space-y-0 border rounded-md p-4 hover:border-blue-300 hover:bg-blue-50 transition-colors cursor-pointer">
                <FormControl>
                  <RadioGroupItem value="weather" />
                </FormControl>
                <div>
                  <FormLabel className="font-medium cursor-pointer block">Bad weather conditions</FormLabel>
                  <p className="text-xs text-gray-500 mt-1">Storms, fog, heavy snow, or other severe weather</p>
                </div>
              </FormItem>
              <FormItem className="flex items-center space-x-3 space-y-0 border rounded-md p-4 hover:border-blue-300 hover:bg-blue-50 transition-colors cursor-pointer">
                <FormControl>
                  <RadioGroupItem value="strike" />
                </FormControl>
                <div>
                  <FormLabel className="font-medium cursor-pointer block">Strike</FormLabel>
                  <p className="text-xs text-gray-500 mt-1">Industrial action by airline staff or airport workers</p>
                </div>
              </FormItem>
              <FormItem className="flex items-center space-x-3 space-y-0 border rounded-md p-4 hover:border-blue-300 hover:bg-blue-50 transition-colors cursor-pointer">
                <FormControl>
                  <RadioGroupItem value="airport_issues" />
                </FormControl>
                <div>
                  <FormLabel className="font-medium cursor-pointer block">Airport issues</FormLabel>
                  <p className="text-xs text-gray-500 mt-1">Capacity constraints, security, or facility problems</p>
                </div>
              </FormItem>
              <FormItem className="flex items-center space-x-3 space-y-0 border rounded-md p-4 hover:border-blue-300 hover:bg-blue-50 transition-colors cursor-pointer">
                <FormControl>
                  <RadioGroupItem value="other" />
                </FormControl>
                <div>
                  <FormLabel className="font-medium cursor-pointer block">Other reasons</FormLabel>
                  <p className="text-xs text-gray-500 mt-1">Any other explanation provided by the airline</p>
                </div>
              </FormItem>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default AirlineReasonQuestion;
