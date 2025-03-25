
import React from "react";
import { motion } from "framer-motion";
import { Plane, Info } from "lucide-react";
import { Form } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { useIsMobile } from "@/hooks/use-mobile";

// Schema and types
import { flightRouteSchema } from "@/components/claim-form/schemas";
import { AnimationTransitions } from "@/components/claim-form/types";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
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
}) => {
  const isMobile = useIsMobile();

  return (
    <motion.div
      key="step0"
      initial={transitions.initial}
      animate={transitions.animate}
      exit={transitions.exit}
      transition={transitions.transition}
    >
      <div className={`${isMobile ? 'mb-4' : 'mb-8'}`}>
        <h2 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-semibold mb-2`}>Your Flight Route</h2>
        <p className="text-gray-600 text-sm md:text-base">
          Enter your departure and destination airports to start your claim
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-4 md:gap-6">
            {/* Departure Airport */}
            <div>
              <FormField
                control={form.control}
                name="departureAirport"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-blue-900 font-semibold text-base md:text-lg">Departing from</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                            <Plane className="h-5 w-5 -rotate-45" />
                          </div>
                          <Input
                            placeholder="e.g. New York or JFK"
                            className={`pl-10 ${isMobile ? 'h-14' : 'h-12'} text-md`}
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
                    <FormLabel className="text-blue-900 font-semibold text-base md:text-lg">Final destination</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500">
                            <Plane className="h-5 w-5 rotate-45" />
                          </div>
                          <Input
                            placeholder="e.g. London or LHR"
                            className={`pl-10 ${isMobile ? 'h-14' : 'h-12'} text-md border-blue-500`}
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
          
          <Alert className="mb-4 bg-blue-50 border-blue-100 text-blue-800 flex items-center">
            <div className="opacity-70 flex-shrink-0">
              <Info className="h-4 w-4 text-blue-500" />
            </div>
            <AlertDescription className="text-blue-700 ml-2 text-sm">
              No risk. Checking compensation is absolutely free of charge.
            </AlertDescription>
          </Alert>

          <NavigationButtons 
            onBack={() => {}} 
            showBackButton={false} 
          />
        </form>
      </Form>
    </motion.div>
  );
};

export default FlightRouteStep;
