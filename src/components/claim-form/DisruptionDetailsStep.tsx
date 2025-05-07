
import React from "react";
import { motion } from "framer-motion";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { HelpCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
  transitions,
}) => {
  const reasonProvided = form.watch("reasonProvided");

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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-8">
            {/* Question 1: Did the airline tell you why the flight was disrupted? */}
            <FormField
              control={form.control}
              name="reasonProvided"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="text-base font-medium">
                    Did the airline tell you why the flight was disrupted?
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-6"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="yes" />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">Yes</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="no" />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">No</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="dont_remember" />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">Don't remember</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Question 2: What was the reason provided by the airline? - Only shown if "Yes" selected */}
            {reasonProvided === "yes" && (
              <FormField
                control={form.control}
                name="airlineReason"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-base font-medium">
                      What was the reason provided by the airline?
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0 border rounded-md p-3">
                          <FormControl>
                            <RadioGroupItem value="technical_problem" />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">Aircraft technical problem</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0 border rounded-md p-3">
                          <FormControl>
                            <RadioGroupItem value="weather" />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">Bad weather conditions</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0 border rounded-md p-3">
                          <FormControl>
                            <RadioGroupItem value="strike" />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">Strike</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0 border rounded-md p-3">
                          <FormControl>
                            <RadioGroupItem value="airport_issues" />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">Airport issues</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0 border rounded-md p-3">
                          <FormControl>
                            <RadioGroupItem value="other" />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">Other reasons</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* Free-text field with tooltip */}
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
            
            {/* Disclaimer text */}
            <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg text-sm text-blue-700">
              <p>
                Sharing details about what happened can greatly improve your chances of a successful claim. 
                The more specific you are, the higher the chances of approval.
              </p>
            </div>
          </div>

          <NavigationButtons onBack={onBack} />
        </form>
      </Form>
    </motion.div>
  );
};

export default DisruptionDetailsStep;
