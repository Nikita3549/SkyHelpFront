import React, { FormEvent, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Plane, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UseFormReturn } from 'react-hook-form';

// Schema and types imports
import { AnimationTransitions } from '@/components/claim-form/types';
import ConnectingFlightsSection from './flight-details/ConnectingFlightsSection';
import { Input } from '@/components/ui/input';
import HelpTooltip from '@/components/ui-custom/HelpTooltip';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useIsMobile } from '@/hooks/use-mobile';
import ClaimForm from '@/pages/ClaimForm.tsx';
import { IClaimForm } from '@/components/claim-form/interfaces/claim-form.interface.ts';
import AirportInput, { Airport } from '@/components/AirportInput.tsx';
import { toast } from '@/components/ui/use-toast.ts';
import { calculateFlights } from '@/hooks/calculate-flights.ts';

interface FlightRouteStepProps {
  transitions: AnimationTransitions;
  connectionFlights: string[];
  setConnectionFlights: React.Dispatch<React.SetStateAction<string[]>>;
  // flightDetailsForm: UseFormReturn<any>; // Need to pass the flight details form for connecting flights
  newForm: IClaimForm;
  setNewForm: (value: IClaimForm) => void;
  setStep: (step: number) => void;
}

const FlightRouteStep: React.FC<FlightRouteStepProps> = ({
  transitions,
  connectionFlights,
  setConnectionFlights,
  // flightDetailsForm,
  newForm,
  setNewForm,
  setStep,
}) => {
  const isMobile = useIsMobile();
  const [departureAirport, setDepartureAirport] = useState<Airport | null>(
    null,
  );
  const [arrivalAirport, setArrivalAirport] = useState<Airport | null>(null);
  const [isConnectingFlights, setIsConnectingFlights] =
    useState<boolean>(false);
  const [isFormFilled, setIsFormFilled] = useState<boolean>(false);

  useEffect(() => {
    if (newForm.details?.routes.length > 1) {
      setIsConnectingFlights(true);
    }
  }, []);

  useEffect(() => {
    if (departureAirport && arrivalAirport) {
      setIsFormFilled(true);
    } else {
      setIsFormFilled(false);
    }
  }, [arrivalAirport, departureAirport]);

  useEffect(() => {
    if (newForm.meta?.arrivalAirport) {
      setArrivalAirport(newForm.meta.arrivalAirport);
    }
  }, [newForm.meta?.arrivalAirport]);

  useEffect(() => {
    if (newForm.meta?.departureAirport) {
      setDepartureAirport(newForm.meta.departureAirport);
    }
  }, [newForm.meta?.departureAirport]);

  const helpItems = [
    {
      text: 'Enter the data for all the flights that you have booked together - not only for the disrupted one.',
    },
    {
      text: 'If you were given a substitute flight, its data may differ - so enter only the original flight details.',
    },
  ];

  const handleSubmitForm = (e: FormEvent) => {
    e.preventDefault();

    if (!arrivalAirport || !departureAirport) {
      toast({
        title: 'Complete the Form',
        description: 'All fields are required',
        variant: 'destructive',
      });

      return;
    }

    newForm.meta.arrivalAirport = arrivalAirport;
    newForm.meta.departureAirport = departureAirport;

    setNewForm(newForm);

    calculateFlights(newForm, setNewForm);

    setStep(2);
  };

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
            Let's start with your flight information to get you compensated
            quickly.
          </p>
        </div>
        <HelpTooltip items={helpItems} variant="popover" className="mt-1" />
      </div>

      {/*<Form {...form}>*/}
      <form onSubmit={handleSubmitForm} className="space-y-6">
        {/* Departure and Arrival fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/*<FormField*/}
          {/*  // control={form.control}*/}
          {/*  name="departureAirport"*/}
          {/*  render={({ field }) => (*/}
          <div>
            <div className="mb-2">Departure Airport</div>
            <div>
              <div className="relative">
                {/*<span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">*/}
                {/*  <Plane className="h-4 w-4" />*/}
                {/*</span>*/}
                {/*<Input*/}
                {/*  placeholder="e.g. JFK"*/}
                {/*  {...field}*/}
                {/*  className="pl-10"*/}
                {/*/>*/}
                <AirportInput
                  setAirport={setDepartureAirport}
                  isDeparture={true}
                  placeHolder={'e.g. Paris'}
                  preFilled={departureAirport}
                />
              </div>
            </div>
          </div>
          {/*)}*/}
          {/*/>*/}

          <div>
            <div className="mb-2">Arrival Airport</div>
            <div>
              <AirportInput
                setAirport={setArrivalAirport}
                placeHolder="e.g. Barcelona"
                isDeparture={false}
                preFilled={arrivalAirport}
              />
            </div>
            <div />
          </div>
        </div>

        {/* Connecting flights section - added to step 1 */}
        <ConnectingFlightsSection
          connectionFlights={connectionFlights}
          setConnectionFlights={setConnectionFlights}
          newForm={newForm}
          setNewForm={setNewForm}
          isConnectingFlights={isConnectingFlights}
          setIsConnectingFlights={setIsConnectingFlights}
        />

        {/* Free checking alert message - improved for mobile responsiveness */}
        <Alert className="bg-blue-50 border-blue-100 mb-4">
          <Info className="h-5 w-5 text-blue-600 shrink-0" />
          <AlertDescription
            className={`text-blue-800 ml-2 ${isMobile ? 'text-sm' : ''}`}
          >
            <span className="flex items-center">
              No risk. Checking compensation is absolutely
              <strong className="ml-1"> free of charge</strong>.
            </span>
          </AlertDescription>
        </Alert>

        <div className="pt-4 flex justify-end">
          <Button
            type="submit"
            className="w-full sm:w-auto"
            disabled={!isFormFilled}
          >
            Continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </form>
      {/*</Form>*/}
    </motion.div>
  );
};

export default FlightRouteStep;
