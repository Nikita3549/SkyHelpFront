
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
          <FormLabel className="text-xl font-semibold text-blue-800 block">
            Did the airline tell you why the flight was disrupted?
          </FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-6"
            >
              {/* Wrap each item in a clickable div that triggers the radio selection */}
              <div 
                onClick={() => field.onChange("yes")}
                className="flex items-center space-x-3 space-y-0 border rounded-md p-4 hover:bg-gray-50 transition-colors cursor-pointer data-[state=checked]:border-blue-500 data-[state=checked]:bg-blue-50"
                data-state={field.value === "yes" ? "checked" : "unchecked"}
              >
                <FormItem className="flex items-center space-x-3 space-y-0 m-0 cursor-pointer">
                  <FormControl>
                    <RadioGroupItem value="yes" id="reason-yes" />
                  </FormControl>
                  <FormLabel htmlFor="reason-yes" className="font-normal cursor-pointer flex items-center">
                    <Check className="h-4 w-4 text-green-500 mr-2" />
                    Yes
                  </FormLabel>
                </FormItem>
              </div>
              
              <div 
                onClick={() => field.onChange("no")}
                className="flex items-center space-x-3 space-y-0 border rounded-md p-4 hover:bg-gray-50 transition-colors cursor-pointer data-[state=checked]:border-blue-500 data-[state=checked]:bg-blue-50"
                data-state={field.value === "no" ? "checked" : "unchecked"}
              >
                <FormItem className="flex items-center space-x-3 space-y-0 m-0 cursor-pointer">
                  <FormControl>
                    <RadioGroupItem value="no" id="reason-no" />
                  </FormControl>
                  <FormLabel htmlFor="reason-no" className="font-normal cursor-pointer flex items-center">
                    <X className="h-4 w-4 text-red-500 mr-2" />
                    No
                  </FormLabel>
                </FormItem>
              </div>
              
              <div 
                onClick={() => field.onChange("dont_remember")}
                className="flex items-center space-x-3 space-y-0 border rounded-md p-4 hover:bg-gray-50 transition-colors cursor-pointer data-[state=checked]:border-blue-500 data-[state=checked]:bg-blue-50"
                data-state={field.value === "dont_remember" ? "checked" : "unchecked"}
              >
                <FormItem className="flex items-center space-x-3 space-y-0 m-0 cursor-pointer">
                  <FormControl>
                    <RadioGroupItem value="dont_remember" id="reason-dont-remember" />
                  </FormControl>
                  <FormLabel htmlFor="reason-dont-remember" className="font-normal cursor-pointer flex items-center">
                    <HelpCircle className="h-4 w-4 text-amber-500 mr-2" />
                    Don't remember
                  </FormLabel>
                </FormItem>
              </div>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ReasonProvidedQuestion;
