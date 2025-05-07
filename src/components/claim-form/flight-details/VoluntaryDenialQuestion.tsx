
import React from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { flightDetailsSchema } from "@/components/claim-form/schemas";

interface VoluntaryDenialQuestionProps {
  form: UseFormReturn<z.infer<typeof flightDetailsSchema>>;
}

const VoluntaryDenialQuestion: React.FC<VoluntaryDenialQuestionProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="voluntaryDenial"
      render={({ field }) => (
        <FormItem className="space-y-3 mt-6 p-4 bg-gray-50 rounded-lg border-t border-gray-200">
          <FormLabel className="text-base">
            Did you volunteer to give up your seat in exchange for other benefits from the airline?
          </FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="voluntary_yes" />
                <Label htmlFor="voluntary_yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="voluntary_no" />
                <Label htmlFor="voluntary_no">No</Label>
              </div>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default VoluntaryDenialQuestion;
