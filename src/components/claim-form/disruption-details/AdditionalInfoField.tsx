
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
          <div className="flex items-center gap-2 mb-1">
            <FormLabel className="text-base font-medium">Tell us more about your situation</FormLabel>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-5 w-5 text-gray-400 hover:text-gray-600 cursor-help" />
                </TooltipTrigger>
                <TooltipContent className="max-w-md p-4 bg-white shadow-lg rounded-lg border">
                  <h4 className="font-medium mb-2">What information should you include?</h4>
                  <ul className="list-disc pl-5 space-y-2 text-sm">
                    <li>What time did you arrive at your final destination?</li>
                    <li>Did the airline provide a reason for the disruption?</li>
                    <li>Did the airline offer an alternative flight, and did you accept it?</li>
                    <li>Have you already contacted the airline regarding EU compensation?</li>
                    <li>Did you fly alone, with friends, family, or as part of a group?</li>
                  </ul>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <FormLabel className="text-sm text-gray-500 block mb-2">
            Briefly describe what happened
          </FormLabel>
          <FormControl>
            <Textarea 
              placeholder="Please provide any relevant details about your flight disruption experience..." 
              {...field} 
              className="min-h-[120px]"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default AdditionalInfoField;
