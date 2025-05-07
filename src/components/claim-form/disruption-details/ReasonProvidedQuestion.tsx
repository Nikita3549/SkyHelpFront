
import React from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { disruptionDetailsSchema } from "@/components/claim-form/schemas";
import { Check, X, HelpCircle } from "lucide-react";

interface ReasonProvidedQuestionProps {
  form: UseFormReturn<z.infer<typeof disruptionDetailsSchema>>;
}

const ReasonProvidedQuestion: React.FC<ReasonProvidedQuestionProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="reasonProvided"
      render={({ field }) => (
        <FormItem className="space-y-4">
          <FormLabel className="text-lg font-medium block">
            Did the airline tell you why the flight was disrupted?
          </FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-6"
            >
              <FormItem className="flex items-center space-x-3 space-y-0 border rounded-md p-3 hover:bg-gray-50 transition-colors cursor-pointer">
                <FormControl>
                  <RadioGroupItem value="yes" />
                </FormControl>
                <FormLabel className="font-normal cursor-pointer flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-2" />
                  Yes
                </FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-3 space-y-0 border rounded-md p-3 hover:bg-gray-50 transition-colors cursor-pointer">
                <FormControl>
                  <RadioGroupItem value="no" />
                </FormControl>
                <FormLabel className="font-normal cursor-pointer flex items-center">
                  <X className="h-4 w-4 text-red-500 mr-2" />
                  No
                </FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-3 space-y-0 border rounded-md p-3 hover:bg-gray-50 transition-colors cursor-pointer">
                <FormControl>
                  <RadioGroupItem value="dont_remember" />
                </FormControl>
                <FormLabel className="font-normal cursor-pointer flex items-center">
                  <HelpCircle className="h-4 w-4 text-amber-500 mr-2" />
                  Don't remember
                </FormLabel>
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
