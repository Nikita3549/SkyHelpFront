
import React, { useEffect } from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Clock, AlertCircle, Users, Plane } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { flightDetailsSchema } from "@/components/claim-form/schemas";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface DisruptionTypeRadioGroupProps {
  form: UseFormReturn<z.infer<typeof flightDetailsSchema>>;
}

const DisruptionTypeRadioGroup: React.FC<DisruptionTypeRadioGroupProps> = ({ form }) => {
  const disruptionType = form.watch("disruptionType");

  // Initialize delayDuration when delay is selected
  useEffect(() => {
    if (disruptionType === "delay" && !form.getValues("delayDuration")) {
      form.setValue("delayDuration", "1 hour");
    }
  }, [disruptionType, form]);

  return (
    <>
      <FormField
        control={form.control}
        name="disruptionType"
        render={({ field }) => (
          <FormItem className="md:col-span-2">
            <FormLabel>What happened to your flight?</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2"
              >
                <div className="flex items-center space-x-2 rounded-lg border p-4 cursor-pointer hover:bg-gray-50 transition-colors">
                  <RadioGroupItem value="delay" id="delay" />
                  <label htmlFor="delay" className="flex items-center cursor-pointer">
                    <Clock className="h-4 w-4 mr-2 text-primary" />
                    <span>Flight was delayed</span>
                  </label>
                </div>

                <div className="flex items-center space-x-2 rounded-lg border p-4 cursor-pointer hover:bg-gray-50 transition-colors">
                  <RadioGroupItem value="cancellation" id="cancellation" />
                  <label htmlFor="cancellation" className="flex items-center cursor-pointer">
                    <AlertCircle className="h-4 w-4 mr-2 text-red-500" />
                    <span>Flight was cancelled</span>
                  </label>
                </div>

                <div className="flex items-center space-x-2 rounded-lg border p-4 cursor-pointer hover:bg-gray-50 transition-colors">
                  <RadioGroupItem value="denied_boarding" id="denied_boarding" />
                  <label htmlFor="denied_boarding" className="flex items-center cursor-pointer">
                    <Users className="h-4 w-4 mr-2 text-orange-500" />
                    <span>Denied boarding (overbooking)</span>
                  </label>
                </div>

                <div className="flex items-center space-x-2 rounded-lg border p-4 cursor-pointer hover:bg-gray-50 transition-colors">
                  <RadioGroupItem value="missed_connection" id="missed_connection" />
                  <label htmlFor="missed_connection" className="flex items-center cursor-pointer">
                    <Plane className="h-4 w-4 mr-2 text-blue-500" />
                    <span>Missed connecting flight</span>
                  </label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {disruptionType === "delay" && (
        <FormField
          control={form.control}
          name="delayDuration"
          render={({ field }) => (
            <FormItem className="mt-4">
              <FormLabel>How many hours was your flight delayed?</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="w-full md:w-1/2">
                    <SelectValue placeholder="Select delay duration" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1 hour">1 hour</SelectItem>
                  <SelectItem value="2 hours">2 hours</SelectItem>
                  <SelectItem value="3 hours">3 hours</SelectItem>
                  <SelectItem value="4+ hours">4+ hours</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </>
  );
};

export default DisruptionTypeRadioGroup;
