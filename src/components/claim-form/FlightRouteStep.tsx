
import React from "react";
import { motion } from "framer-motion";
import { Plane } from "lucide-react";
import { Form } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

// Schema and types
import { flightRouteSchema } from "@/components/claim-form/schemas";
import { AnimationTransitions } from "@/components/claim-form/types";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import NavigationButtons from "./passenger-details/NavigationButtons";

interface FlightRouteStepProps {
  form: UseFormReturn<z.infer<typeof flightRouteSchema>>;
  onSubmit: (data: z.infer<typeof flightRouteSchema>) => void;
  transitions: AnimationTransitions;
  onBack?: () => void;
}

const FlightRouteStep: React.FC<FlightRouteStepProps> = ({
  form,
  onSubmit,
  transitions,
  onBack,
}) => {
  return (
    <motion.div
      key="step0"
      initial={transitions.initial}
      animate={transitions.animate}
      exit={transitions.exit}
      transition={transitions.transition}
    >
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Your Flight Route</h2>
        <p className="text-gray-600">
          Enter your departure and destination airports to start your claim
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Departure Airport */}
            <div>
              <FormField
                control={form.control}
                name="departureAirport"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-blue-900 font-semibold text-lg">Departing from</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                            <Plane className="h-5 w-5 -rotate-45" />
                          </div>
                          <Input
                            placeholder="e.g. New York or JFK"
                            className="pl-10 h-14 text-md"
                            {...field}
                          />
                        </div>
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Arrival Airport */}
            <div>
              <FormField
                control={form.control}
                name="arrivalAirport"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-blue-900 font-semibold text-lg">Final destination</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500">
                            <Plane className="h-5 w-5 rotate-45" />
                          </div>
                          <Input
                            placeholder="e.g. London or LHR"
                            className="pl-10 h-14 text-md border-blue-500"
                            {...field}
                          />
                        </div>
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <NavigationButtons 
            onBack={onBack || (() => {})} 
            showBackButton={!!onBack} 
          />
        </form>
      </Form>
    </motion.div>
  );
};

export default FlightRouteStep;
