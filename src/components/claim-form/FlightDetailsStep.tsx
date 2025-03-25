import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Info, Plane, MapPin } from "lucide-react";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

// Schema and types
import { flightDetailsSchema } from "@/components/claim-form/schemas";
import { AnimationTransitions } from "@/components/claim-form/types";

// Re-export airlines for other components that might need it
export { airlines } from "./flight-details/AirlineSelect";

interface FlightDetailsStepProps {
  form: UseFormReturn<z.infer<typeof flightDetailsSchema>>;
  onSubmit: (data: z.infer<typeof flightDetailsSchema>) => void;
  isChecking: boolean;
  isEligible: boolean | null;
  onContinue: () => void;
  transitions: AnimationTransitions;
}

const FlightDetailsStep: React.FC<FlightDetailsStepProps> = ({
  form,
  onSubmit,
  isChecking,
  isEligible,
  onContinue,
  transitions,
}) => {
  const [hasConnectingFlights, setHasConnectingFlights] = useState<string>("no");

  return (
    <motion.div
      key="step1"
      initial={transitions.initial}
      animate={transitions.animate}
      exit={transitions.exit}
      transition={transitions.transition}
      className="max-w-4xl mx-auto"
    >
      <div className="mb-4 flex items-center gap-4">
        <div className="h-16 w-16 rounded-full overflow-hidden">
          <img 
            src="/lovable-uploads/ea889f16-06a0-434e-94ef-948c003c0857.png" 
            alt="Assistant" 
            className="w-full h-full object-cover"
            style={{ objectPosition: "570px 120px" }}
          />
        </div>
        <div>
          <h2 className="text-xl font-semibold">Alex</h2>
          <p className="text-gray-600 text-sm">Your AirHelp Assistant</p>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 mb-4">
        <h2 className="text-xl font-semibold text-blue-900 mb-6">
          Hi! Let's see if the airline owes you compensation. Where were you flying to?
        </h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <FormField
                  control={form.control}
                  name="departureAirport"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-blue-900 font-medium">Departing from</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Plane className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input 
                            placeholder="e.g. New York or JFK" 
                            className="pl-10 h-12" 
                            {...field} 
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <FormField
                  control={form.control}
                  name="arrivalAirport"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-blue-900 font-medium">Final destination</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Plane className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 rotate-90" />
                          <Input 
                            placeholder="e.g. London or LHR" 
                            className="pl-10 h-12" 
                            {...field} 
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg">
              <p className="text-blue-900 font-medium mb-4">Did you have any connecting flights?</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div 
                  className={`border rounded-lg p-4 cursor-pointer ${
                    hasConnectingFlights === 'no' 
                      ? 'bg-white border-blue-500' 
                      : 'bg-white border-gray-200'
                  }`}
                  onClick={() => setHasConnectingFlights('no')}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                      hasConnectingFlights === 'no' ? 'border-blue-500' : 'border-gray-300'
                    }`}>
                      {hasConnectingFlights === 'no' && (
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                    <span>No, I didn't</span>
                  </div>
                </div>
                
                <div 
                  className={`border rounded-lg p-4 cursor-pointer ${
                    hasConnectingFlights === 'yes' 
                      ? 'bg-white border-blue-500' 
                      : 'bg-white border-gray-200'
                  }`}
                  onClick={() => setHasConnectingFlights('yes')}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                      hasConnectingFlights === 'yes' ? 'border-blue-500' : 'border-gray-300'
                    }`}>
                      {hasConnectingFlights === 'yes' && (
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                    <span>Yes, I had to change flights</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-blue-50 p-4 rounded-lg text-sm">
              <Info className="text-blue-500 h-5 w-5 flex-shrink-0" />
              <p className="text-blue-900">No risk. Checking compensation is absolutely free of charge.</p>
            </div>

            <div className="flex justify-end">
              <Button 
                type="submit" 
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md"
                disabled={isChecking}
              >
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>
        </Form>
      </div>

      {/* Conditional rendering for eligibility result - we'll keep this for functionality */}
      {isEligible === true && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="text-lg font-medium text-green-800">Good news! You may be eligible</h3>
          <p className="text-green-700 mb-4">Based on the information provided, you may be eligible for compensation.</p>
          <Button onClick={onContinue} className="bg-green-600 hover:bg-green-700">
            Continue with your claim
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}
      
      {isEligible === false && (
        <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <h3 className="text-lg font-medium text-amber-800">We're sorry</h3>
          <p className="text-amber-700">Based on the information provided, you may not be eligible for compensation under current regulations.</p>
        </div>
      )}
    </motion.div>
  );
};

export default FlightDetailsStep;
