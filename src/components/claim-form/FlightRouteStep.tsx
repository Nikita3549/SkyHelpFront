
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Plane, Info } from "lucide-react";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

// Schema and types imports
import { flightRouteSchema } from "@/components/claim-form/schemas";
import { AnimationTransitions } from "@/components/claim-form/types";
import ConnectingFlightsSection from "./flight-details/ConnectingFlightsSection";
import { Input } from "@/components/ui/input";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import HelpTooltip from "@/components/ui-custom/HelpTooltip";
import { Alert, AlertDescription } from "@/components/ui/alert";

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
  const helpItems = [
    { 
      text: "Enter the data for all the flights that you have booked together - not only for the disrupted one." 
    },
    { 
      text: "If you were given a substitute flight, its data may differ - so enter only the original flight details." 
    }
  ];
  
  return (
    <motion.div
      key="step1"
      initial={transitions.initial}
      animate={transitions.animate}
      exit={transitions.exit}
      transition={transitions.transition}
    >
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Flight Route</h2>
          <p className="text-gray-600">
            Let's start with your flight information to get you compensated quickly.
          </p>
        </div>
        <HelpTooltip 
          items={helpItems} 
          variant="popover" 
          className="mt-1" 
        />
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
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                        <Plane className="h-4 w-4" />
                      </span>
                      <Input placeholder="e.g. JFK" {...field} className="pl-10" />
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
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                        <Plane className="h-4 w-4 transform rotate-90" />
                      </span>
                      <Input placeholder="e.g. LAX" {...field} className="pl-10" />
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

          {/* Free checking alert message */}
          <Alert className="bg-blue-50 border-blue-100 mb-4">
            <Info className="h-5 w-5 text-blue-600" />
            <AlertDescription className="text-blue-800 flex items-center ml-2">
              No risk. Checking compensation is absolutely <span className="font-semibold">&nbsp;free of charge</span>.
            </AlertDescription>
          </Alert>

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
