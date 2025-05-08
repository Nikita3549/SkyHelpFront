
import React from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { disruptionDetailsSchema } from "@/components/claim-form/schemas";

interface AdditionalInfoFieldProps {
  form: UseFormReturn<z.infer<typeof disruptionDetailsSchema>>;
}

const AdditionalInfoField: React.FC<AdditionalInfoFieldProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="additionalInfo"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-xl font-semibold text-black block mb-2">
            Additional Information
          </FormLabel>
          <p className="text-gray-600 mb-3">
            Please provide any additional details about the disruption that might help with your claim.
          </p>
          <FormControl>
            <Textarea
              placeholder="Describe what happened during the disruption, any communications from the airline, and how it affected you..."
              className="min-h-[150px] resize-y"
              {...field}
            />
          </FormControl>
          <FormMessage />
          <p className="text-xs text-gray-500 mt-2">
            Adding details specific to your experience can significantly strengthen your claim.
          </p>
        </FormItem>
      )}
    />
  );
};

export default AdditionalInfoField;
