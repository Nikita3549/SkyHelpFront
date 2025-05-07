
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
        <FormItem className="space-y-3">
          <FormLabel className="text-base font-medium">
            What was the reason provided by the airline?
          </FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
            >
              <FormItem className="flex items-center space-x-3 space-y-0 border rounded-md p-3">
                <FormControl>
                  <RadioGroupItem value="technical_problem" />
                </FormControl>
                <FormLabel className="font-normal cursor-pointer">Aircraft technical problem</FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-3 space-y-0 border rounded-md p-3">
                <FormControl>
                  <RadioGroupItem value="weather" />
                </FormControl>
                <FormLabel className="font-normal cursor-pointer">Bad weather conditions</FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-3 space-y-0 border rounded-md p-3">
                <FormControl>
                  <RadioGroupItem value="strike" />
                </FormControl>
                <FormLabel className="font-normal cursor-pointer">Strike</FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-3 space-y-0 border rounded-md p-3">
                <FormControl>
                  <RadioGroupItem value="airport_issues" />
                </FormControl>
                <FormLabel className="font-normal cursor-pointer">Airport issues</FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-3 space-y-0 border rounded-md p-3">
                <FormControl>
                  <RadioGroupItem value="other" />
                </FormControl>
                <FormLabel className="font-normal cursor-pointer">Other reasons</FormLabel>
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
