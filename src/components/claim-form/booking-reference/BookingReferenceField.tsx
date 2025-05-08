
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { HelpCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { bookingReferenceSchema } from "@/components/claim-form/schemas";

interface BookingReferenceFieldProps {
  form: UseFormReturn<z.infer<typeof bookingReferenceSchema>>;
}

const BookingReferenceField: React.FC<BookingReferenceFieldProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="bookingReference"
      render={({ field }) => (
        <FormItem>
          <div className="flex items-center space-x-2">
            <FormLabel className="text-base font-medium text-black">Booking Reference (PNR)</FormLabel>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="cursor-help">
                    <HelpCircle className="h-4 w-4 text-gray-400" />
                  </span>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs bg-white">
                  <p>Don't worry if you don't have it right now — you can still continue.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <FormControl>
            <Input placeholder="e.g. ABC123" {...field} />
          </FormControl>
          <FormDescription>
            Your booking reference is usually a 6-character alphanumeric code found in your airline confirmation email.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default BookingReferenceField;
