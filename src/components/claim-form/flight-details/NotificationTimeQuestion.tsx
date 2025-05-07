
import React from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { flightDetailsSchema } from "@/components/claim-form/schemas";

interface NotificationTimeQuestionProps {
  form: UseFormReturn<z.infer<typeof flightDetailsSchema>>;
}

const NotificationTimeQuestion: React.FC<NotificationTimeQuestionProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="notificationTime"
      render={({ field }) => (
        <FormItem className="space-y-3 mt-6 p-4 bg-gray-50 rounded-lg border-t border-gray-200">
          <FormLabel className="text-base">
            How many days before the departure were you informed about the flight change?
          </FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="less_than_14days" id="less_than_14days" />
                <Label htmlFor="less_than_14days">Less than 14 days</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="14days_or_more" id="14days_or_more" />
                <Label htmlFor="14days_or_more">14 days or more</Label>
              </div>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default NotificationTimeQuestion;
