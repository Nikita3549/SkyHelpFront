
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Plane } from "lucide-react";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

// Schema and types imports
import { flightRouteSchema } from "@/components/claim-form/schemas";
import { AnimationTransitions } from "@/components/claim-form/types";
import ConnectingFlightsSection from "./flight-details/ConnectingFlightsSection";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import AirportAutocomplete from "./flight-details/AirportAutocomplete";

interface FlightRouteStepProps {
  form: UseFormReturn<z.infer<typeof flightRouteSchema>>;
  onSubmit: (data: z.infer<typeof flightRouteSchema>) => void;
  transitions: AnimationTransitions;
  connectionFlights: string[];
  setConnectionFlights: React.Dispatch<React.SetStateAction<string[]>>;
  flightDetailsForm: UseFormReturn<any>; // Need to pass the flight details form for connecting flights
}

const FlightRouteStep: React.FC<FlightRouteStepProps> = ({
  form,
  onSubmit,
  transitions,
  connectionFlights,
  setConnectionFlights,
  flightDetailsForm
}) => {
  return (
    <motion.div
      key="step1"
      initial={transitions.initial}
      animate={transitions.animate}
      exit={transitions.exit}
      transition={transitions.transition}
    >
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Flight Route</h2>
        <p className="text-gray-600">
          Let's start with your flight information to get you compensated quickly.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Departure and Arrival fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="departureAirport"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Departure Airport</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 z-10">
                        <Plane className="h-4 w-4" />
                      </span>
                      <AirportAutocomplete 
                        value={field.value} 
                        onChange={field.onChange}
                        placeholder="e.g. London or LHR"
                        className="pl-10"
                      />
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
                  <FormLabel>Arrival Airport</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 z-10">
                        <Plane className="h-4 w-4 transform rotate-90" />
                      </span>
                      <AirportAutocomplete 
                        value={field.value} 
                        onChange={field.onChange}
                        placeholder="e.g. Paris or CDG"
                        className="pl-10"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Connecting flights section - added to step 1 */}
          <ConnectingFlightsSection 
            form={flightDetailsForm} 
            connectionFlights={connectionFlights}
            setConnectionFlights={setConnectionFlights}
          />

          <div className="pt-4 flex justify-end">
            <Button type="submit" className="w-full sm:w-auto">
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
