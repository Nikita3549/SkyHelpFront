
import React from "react";
import { motion } from "framer-motion";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";

// Schema definition moved to a separate file
import { disruptionDetailsSchema } from "@/components/claim-form/schemas";
import { AnimationTransitions } from "@/components/claim-form/types";
import NavigationButtons from "./passenger-details/NavigationButtons";

interface DisruptionDetailsStepProps {
  form: UseFormReturn<z.infer<typeof disruptionDetailsSchema>>;
  onSubmit: (data: z.infer<typeof disruptionDetailsSchema>) => void;
  onBack: () => void;
  transitions: AnimationTransitions;
  disruptionType: string;
}

const DisruptionDetailsStep: React.FC<DisruptionDetailsStepProps> = ({
  form,
  onSubmit,
  onBack,
  disruptionType,
  transitions,
}) => {
  return (
    <motion.div
      key="step3"
      initial={transitions.initial}
      animate={transitions.animate}
      exit={transitions.exit}
      transition={transitions.transition}
    >
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Disruption Details</h2>
        <p className="text-gray-600">
          Please provide more details about the flight disruption you experienced.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {disruptionType === "delay" && (
              <>
                <FormField
                  control={form.control}
                  name="delayDuration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Delay Duration</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select delay duration" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1 hour">1 hour</SelectItem>
                          <SelectItem value="2 hours">2 hours</SelectItem>
                          <SelectItem value="3 hours">3 hours (eligible for compensation)</SelectItem>
                          <SelectItem value="4+ hours">4+ hours (eligible for compensation)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="actualDepartureTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Actual Departure Time</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="originalDepartureTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Original Scheduled Departure Time</FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            <FormField
              control={form.control}
              name="reasonGiven"
              render={({ field }) => (
                <FormItem className={cn(
                  disruptionType === "delay" ? "md:col-span-1" : "md:col-span-2"
                )}>
                  <FormLabel>Reason Given by Airline</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Technical issues, weather conditions" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="additionalInfo"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Additional Information</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Provide any additional details about the disruption that might be relevant to your claim" 
                      {...field} 
                      className="min-h-[120px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <NavigationButtons onBack={onBack} />
        </form>
      </Form>
    </motion.div>
  );
};

export default DisruptionDetailsStep;
