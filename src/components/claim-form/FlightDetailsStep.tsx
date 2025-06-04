import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Loader2, ArrowLeft } from 'lucide-react';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

// Schema and types
import { flightDetailsSchema } from '@/components/claim-form/schemas';
import { AnimationTransitions } from '@/components/claim-form/types';

// Component imports
import FlightInputFields from './flight-details/FlightInputFields';
import ProblemFlightSelector from './flight-details/ProblemFlightSelector';
import HelpTooltip from '@/components/ui-custom/HelpTooltip';

// Re-export airlines for other components that might need it
export { airlines } from './flight-details/AirlineSelect';

interface FlightDetailsStepProps {
  form: UseFormReturn<z.infer<typeof flightDetailsSchema>>;
  onSubmit: (data: z.infer<typeof flightDetailsSchema>) => void;
  transitions: AnimationTransitions;
  onBack?: () => void;
  connectionFlights: string[];
  setConnectionFlights: React.Dispatch<React.SetStateAction<string[]>>;
}

const FlightDetailsStep: React.FC<FlightDetailsStepProps> = ({
  form,
  onSubmit,
  transitions,
  onBack,
  connectionFlights,
  setConnectionFlights,
}) => {
  const helpItems = [
    {
      text: 'Enter the data for all the flights that you have booked together - not only for the disrupted one.',
    },
    {
      text: 'If you were given a substitute flight, its data may differ - so enter only the original flight details.',
    },
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
          <h2 className="text-2xl font-semibold mb-2">Flight Details</h2>
          <p className="text-gray-600">
            Enter your flight information and select your flight.
          </p>
        </div>
        <HelpTooltip items={helpItems} variant="popover" className="mt-1" />
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Problem flight selector when user has connecting flights */}
          <ProblemFlightSelector
            form={form}
            connectionFlights={connectionFlights}
          />

          {/* Flight input fields component */}
          <FlightInputFields form={form} />

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

            <div className={onBack ? '' : 'ml-auto'}>
              <Button type="submit" className="w-full sm:w-auto">
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </motion.div>
  );
};

export default FlightDetailsStep;
