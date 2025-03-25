
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Plane } from "lucide-react";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { flightDetailsSchema } from "./schemas";
import { AnimationTransitions } from "./types";

interface FlightRouteStepProps {
  form: UseFormReturn<z.infer<typeof flightDetailsSchema>>;
  onSubmit: (data: z.infer<typeof flightDetailsSchema>) => void;
  transitions: AnimationTransitions;
}

const FlightRouteStep: React.FC<FlightRouteStepProps> = ({
  form,
  onSubmit,
  transitions,
}) => {
  return (
    <motion.div
      key="flight-route"
      initial={transitions.initial}
      animate={transitions.animate}
      exit={transitions.exit}
      transition={transitions.transition}
    >
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Hi! Let's see if the airline owes you compensation.</h2>
        <p className="text-gray-600">Where were you flying to?</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="departureAirport"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Departing from</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input 
                        placeholder="e.g. New York or JFK" 
                        {...field}
                      />
                      <Plane className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <span className="absolute left-9 top-0 bottom-0 w-[1px] bg-gray-200"></span>
                      <div className="pl-10"></div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="arrivalAirport"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Final destination</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input 
                        placeholder="e.g. London or LHR" 
                        {...field} 
                      />
                      <Plane className="absolute left-3 top-1/2 transform -translate-y-1/2 rotate-90 h-4 w-4 text-primary" />
                      <span className="absolute left-9 top-0 bottom-0 w-[1px] bg-gray-200"></span>
                      <div className="pl-10"></div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="pt-4">
            <Button 
              type="submit" 
              className="w-full sm:w-auto"
            >
              Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </Form>
    </motion.div>
  );
};

export default FlightRouteStep;
