
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Loader2, ArrowLeft } from "lucide-react";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

// Schema and types
import { flightDetailsSchema } from "@/components/claim-form/schemas";
import { AnimationTransitions } from "@/components/claim-form/types";

// Component imports
import FlightInputFields from "./flight-details/FlightInputFields";
import DisruptionTypeRadioGroup from "./flight-details/DisruptionTypeRadioGroup";
import EligibilityResult from "./flight-details/EligibilityResult";
import ProblemFlightSelector from "./flight-details/ProblemFlightSelector";
import ConnectingFlightsSection from "./flight-details/ConnectingFlightsSection";

// Re-export airlines for other components that might need it
export { airlines } from "./flight-details/AirlineSelect";

interface FlightDetailsStepProps {
  form: UseFormReturn<z.infer<typeof flightDetailsSchema>>;
  onSubmit: (data: z.infer<typeof flightDetailsSchema>) => void;
  isChecking: boolean;
  isEligible: boolean | null;
  onContinue: () => void;
  transitions: AnimationTransitions;
  onBack?: () => void;
  connectionFlights: string[];
  setConnectionFlights: React.Dispatch<React.SetStateAction<string[]>>;
}

const FlightDetailsStep: React.FC<FlightDetailsStepProps> = ({
  form,
  onSubmit,
  isChecking,
  isEligible,
  onContinue,
  transitions,
  onBack,
  connectionFlights,
  setConnectionFlights
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
          {/* Flight input fields component */}
          <FlightInputFields form={form} />
          
          {/* Problem flight selector when user has connecting flights */}
          <ProblemFlightSelector form={form} connectionFlights={connectionFlights} />
          
          {/* Disruption type radio group component */}
          <DisruptionTypeRadioGroup form={form} />

          {/* Connecting flights section - moved to FlightRouteStep */}
          <ConnectingFlightsSection
            form={form}
            connectionFlights={connectionFlights}
            setConnectionFlights={setConnectionFlights}
          />

          <div className="pt-4 flex justify-between items-center">
            {onBack && (
              <Button 
                type="button" 
                variant="outline" 
                onClick={onBack}
                className="flex items-center"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            )}
            
            <div className={onBack ? "" : "ml-auto"}>
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
          </div>
        </form>
      </Form>

      {/* Eligibility result component */}
      <EligibilityResult isEligible={isEligible} onContinue={onContinue} />
    </motion.div>
  );
};

export default FlightDetailsStep;
