
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Plane } from "lucide-react";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Schema and types imports
import { flightRouteSchema } from "@/components/claim-form/schemas";
import { AnimationTransitions } from "@/components/claim-form/types";
import ConnectingFlightsForm from "./flight-details/ConnectingFlightsForm";
import { Input } from "@/components/ui/input";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

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
                  <FormLabel className="text-base font-medium">Departure Airport</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                        <Plane className="h-5 w-5" />
                      </span>
                      <Input placeholder="e.g. LHR" {...field} className="pl-10 h-14 text-base" />
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
                  <FormLabel className="text-base font-medium">Arrival Airport</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                        <Plane className="h-5 w-5 transform rotate-90" />
                      </span>
                      <Input placeholder="e.g. CDG" {...field} className="pl-10 h-14 text-base" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Connecting flights question */}
          <div className="mt-8">
            <h3 className="text-xl font-medium mb-4">Did you have any connecting flights?</h3>
            
            <FormField
              control={flightDetailsForm.control}
              name="connectingFlights"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                      <label
                        htmlFor="connecting-no"
                        className={`flex items-center space-x-2 border rounded-lg p-4 cursor-pointer transition-colors hover:border-primary ${field.value === 'no' ? 'border-primary bg-blue-50' : 'border-gray-200'}`}
                      >
                        <RadioGroupItem 
                          value="no" 
                          id="connecting-no"
                          className="h-5 w-5"
                        />
                        <span className="text-base">No, I didn't</span>
                      </label>
                      
                      <label
                        htmlFor="connecting-yes"
                        className={`flex items-center space-x-2 border rounded-lg p-4 cursor-pointer transition-colors hover:border-primary ${field.value === 'yes' ? 'border-primary bg-blue-50' : 'border-gray-200'}`}
                      >
                        <RadioGroupItem 
                          value="yes" 
                          id="connecting-yes"
                          className="h-5 w-5"
                        />
                        <span className="text-base">Yes, I had to change flights</span>
                      </label>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Connecting flights form section */}
          <ConnectingFlightsForm 
            form={flightDetailsForm} 
            connectionFlights={connectionFlights}
            setConnectionFlights={setConnectionFlights}
          />

          <div className="pt-6 flex justify-end">
            <Button type="submit" className="w-full sm:w-auto h-12 px-6 text-base">
              Continue
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </form>
      </Form>
    </motion.div>
  );
};

export default FlightRouteStep;
