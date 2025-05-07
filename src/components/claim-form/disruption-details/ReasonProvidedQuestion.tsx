
import React from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { disruptionDetailsSchema } from "@/components/claim-form/schemas";

interface ReasonProvidedQuestionProps {
  form: UseFormReturn<z.infer<typeof disruptionDetailsSchema>>;
}

const ReasonProvidedQuestion: React.FC<ReasonProvidedQuestionProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="reasonProvided"
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel className="text-base font-medium">
            Did the airline tell you why the flight was disrupted?
          </FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-6"
            >
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="yes" />
                </FormControl>
                <FormLabel className="font-normal cursor-pointer">Yes</FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="no" />
                </FormControl>
                <FormLabel className="font-normal cursor-pointer">No</FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value="dont_remember" />
                </FormControl>
                <FormLabel className="font-normal cursor-pointer">Don't remember</FormLabel>
              </FormItem>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ReasonProvidedQuestion;
