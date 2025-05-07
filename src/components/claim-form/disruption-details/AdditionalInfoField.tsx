
import React from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { disruptionDetailsSchema } from "@/components/claim-form/schemas";
import { HelpCircle } from "lucide-react";
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

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
          <div className="flex items-center gap-2 mb-2">
            <FormLabel className="text-base font-medium">Tell us more about your situation</FormLabel>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-5 w-5 text-gray-400 hover:text-gray-600 cursor-help" />
                </TooltipTrigger>
                <TooltipContent className="max-w-md p-4 bg-white shadow-lg rounded-lg border">
                  <h4 className="font-medium mb-2">What information should you include?</h4>
                  <ul className="list-disc pl-5 space-y-2 text-sm">
                    <li>Exact arrival time at your final destination</li>
                    <li>Communications received from the airline staff</li>
                    <li>Whether you were offered any compensation or assistance</li>
                    <li>If you've already contacted the airline about this issue</li>
                    <li>How the disruption impacted your travel plans</li>
                    <li>Any additional expenses incurred due to the disruption</li>
                  </ul>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <FormLabel className="text-sm text-gray-500 block mb-2">
            The more details you provide, the stronger your claim will be
          </FormLabel>
          <FormControl>
            <Textarea 
              placeholder="Please describe what happened during your flight disruption. Include times, staff interactions, and how it affected your journey..." 
              {...field} 
              className="min-h-[150px] focus:border-blue-400 focus:ring focus:ring-blue-100"
            />
          </FormControl>
          <div className="flex justify-between mt-2">
            <FormMessage />
            <div className="text-xs text-gray-400">
              {field.value ? field.value.length : 0}/1000 characters
            </div>
          </div>
        </FormItem>
      )}
    />
  );
};

export default AdditionalInfoField;
