import React from "react";
import { motion } from "framer-motion";
import { Plane, Calendar, MapPin, Clock, Users, ArrowRight, Loader2 } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { CheckCircle2, AlertCircle } from "lucide-react";

// Schema definition moved to a separate file
import { flightDetailsSchema } from "@/components/claim-form/schemas";
import { AnimationTransitions } from "@/components/claim-form/types";

export const airlines = [
  { value: "ryanair", label: "Ryanair" },
  { value: "easyjet", label: "EasyJet" },
  { value: "ba", label: "British Airways" },
  { value: "lufthansa", label: "Lufthansa" },
  { value: "airfrance", label: "Air France" },
  { value: "klm", label: "KLM" },
  { value: "iberia", label: "Iberia" },
  { value: "vueling", label: "Vueling" },
  { value: "wizz", label: "Wizz Air" },
  { value: "norwegian", label: "Norwegian" },
  { value: "other", label: "Other" },
];

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
  return (
    <motion.div
      key="step1"
      initial={transitions.initial}
      animate={transitions.animate}
      exit={transitions.exit}
      transition={transitions.transition}
    >
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Flight Details</h2>
        <p className="text-gray-600">
          Enter your flight information to check eligibility for compensation.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="flightNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Flight Number</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input placeholder="e.g. BA1234" {...field} />
                      <Plane className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="airline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Airline</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select airline" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {airlines.map((airline) => (
                        <SelectItem key={airline.value} value={airline.value}>
                          {airline.label}
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
              name="departureDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Departure Date</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input type="date" {...field} />
                      <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="departureAirport"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Departure Airport</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input placeholder="e.g. LHR" {...field} />
                      <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
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
                      <Input placeholder="e.g. CDG" {...field} />
                      <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="disruptionType"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>What happened to your flight?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2"
                    >
                      <div className="flex items-center space-x-2 rounded-lg border p-4 cursor-pointer hover:bg-gray-50 transition-colors">
                        <RadioGroupItem value="delay" id="delay" />
                        <label htmlFor="delay" className="flex items-center cursor-pointer">
                          <Clock className="h-4 w-4 mr-2 text-primary" />
                          <span>Flight was delayed</span>
                        </label>
                      </div>

                      <div className="flex items-center space-x-2 rounded-lg border p-4 cursor-pointer hover:bg-gray-50 transition-colors">
                        <RadioGroupItem value="cancellation" id="cancellation" />
                        <label htmlFor="cancellation" className="flex items-center cursor-pointer">
                          <AlertCircle className="h-4 w-4 mr-2 text-red-500" />
                          <span>Flight was cancelled</span>
                        </label>
                      </div>

                      <div className="flex items-center space-x-2 rounded-lg border p-4 cursor-pointer hover:bg-gray-50 transition-colors">
                        <RadioGroupItem value="denied_boarding" id="denied_boarding" />
                        <label htmlFor="denied_boarding" className="flex items-center cursor-pointer">
                          <Users className="h-4 w-4 mr-2 text-orange-500" />
                          <span>Denied boarding (overbooking)</span>
                        </label>
                      </div>

                      <div className="flex items-center space-x-2 rounded-lg border p-4 cursor-pointer hover:bg-gray-50 transition-colors">
                        <RadioGroupItem value="missed_connection" id="missed_connection" />
                        <label htmlFor="missed_connection" className="flex items-center cursor-pointer">
                          <Plane className="h-4 w-4 mr-2 text-blue-500" />
                          <span>Missed connecting flight</span>
                        </label>
                      </div>
                    </RadioGroup>
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
              disabled={isChecking}
            >
              {isChecking ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Checking Eligibility
                </>
              ) : (
                <>
                  Check Eligibility
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>

      {isEligible !== null && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.3 }}
          className="mt-8"
        >
          {isEligible ? (
            <div className="bg-green-50 border border-green-100 rounded-lg p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-green-800">Good news! You are eligible for compensation</h3>
                  <div className="mt-2 text-sm text-green-700">
                    <p>Based on your flight details, you could be entitled to compensation under EU Regulation 261/2004.</p>
                    <div className="mt-4">
                      <Button onClick={onContinue} className="bg-green-600 hover:bg-green-700">
                        Continue with your claim
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-yellow-500" />
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-yellow-800">We need more information</h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>Based on the information provided, we need additional details to determine your eligibility.</p>
                    <div className="mt-4">
                      <Button onClick={onContinue} variant="outline" className="border-yellow-300 text-yellow-700 hover:bg-yellow-50">
                        Continue anyway
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default FlightDetailsStep;
