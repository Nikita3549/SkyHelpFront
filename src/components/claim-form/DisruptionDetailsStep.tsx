
import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";

// Schema definition moved to a separate file
import { disruptionDetailsSchema } from "@/components/claim-form/schemas";

interface DisruptionDetailsStepProps {
  form: UseFormReturn<z.infer<typeof disruptionDetailsSchema>>;
  onSubmit: (data: z.infer<typeof disruptionDetailsSchema>) => void;
  onBack: () => void;
  disruptionType: string;
  transitions: {
    initial: object;
    animate: object;
    exit: object;
    transition: object;
  };
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
                      <FormLabel>Delay Duration (hours)</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select delay duration" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {["Less than 2 hours", "2-3 hours", "3-4 hours", "More than 4 hours"].map((duration) => (
                            <SelectItem key={duration} value={duration}>
                              {duration}
                            </SelectItem>
                          ))}
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

          <div className="pt-4 flex justify-between items-center">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onBack}
              className="flex items-center"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>

            <Button type="submit">
              Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </Form>
    </motion.div>
  );
};

export default DisruptionDetailsStep;
