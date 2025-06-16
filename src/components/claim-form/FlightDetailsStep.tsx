import React, { FormEvent, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Loader2, ArrowLeft } from 'lucide-react';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { UseFormReturn } from 'react-hook-form';

// Schema and types
import { AnimationTransitions } from '@/components/claim-form/types';

// Component imports
import FlightInputFields from './flight-details/FlightInputFields';
import ProblemFlightSelector from './flight-details/ProblemFlightSelector';
import HelpTooltip from '@/components/ui-custom/HelpTooltip';
import { IClaimForm } from '@/components/claim-form/interfaces/claim-form.interface.ts';
import { Airline } from '@/components/claim-form/flight-details/interfaces/Airline.interface.ts';
import FlightSelectionCards, {
  FlightData,
} from '@/components/claim-form/flight-details/FlightSelectionCards.tsx';
import { airlines } from '@/components/claim-form/flight-details/AirlineSelect.tsx';
import AirlineInput from '@/components/claim-form/AirlineInput.tsx';
import api from '@/api/axios.ts';
import { AxiosResponse } from 'axios';
import { toast } from '@/components/ui/use-toast.ts';

// Re-export airlines for other components that might need it
export { airlines } from './flight-details/AirlineSelect';

interface FlightDetailsStepProps {
  transitions: AnimationTransitions;
  onBack?: () => void;
  connectionFlights: string[];
  setConnectionFlights: React.Dispatch<React.SetStateAction<string[]>>;
  newForm: IClaimForm;
  setNewForm: (value: IClaimForm) => void;
  setStep: (step: number) => void;
}

const FlightDetailsStep: React.FC<FlightDetailsStepProps> = ({
  transitions,
  onBack,
  connectionFlights,
  setConnectionFlights,
  newForm,
  setNewForm,
  setStep,
}) => {
  const [flights, setFlights] = useState<FlightData[]>([]);
  const [airline, _setAirline] = useState<Airline | null>(null);
  const setAirline = (value: Airline | null) => {
    setNewForm({
      ...newForm,
      details: {
        ...newForm.details,
        airline: value,
      },
    });
    _setAirline(value);
  };
  const [selectedDate, _setSelectedDate] = useState<Date | null>(null);
  const [isFlightNumber, setIsFlightNumber] = useState<boolean>(false);
  const [manualFlightNumber, _setManualFlightNumber] = useState<string>('');
  const setManualFlightNumber = (value: string) => {
    setNewForm({
      ...newForm,
      details: {
        ...newForm.details,
        flightNumber: value,
      },
    });
    _setManualFlightNumber(value);
  };
  const [locked, setLocked] = useState<boolean>(false);
  const setSelectedDate = (value: Date | null) => {
    setNewForm({
      ...newForm,
      details: {
        ...newForm.details,
        date: value,
      },
    });
    _setSelectedDate(value);
  };
  const [otherAirline, _setOtherAirline] = useState<Airline | null>(null);
  const [isOther, setIsOther] = useState<boolean>(false);
  const setOtherAirline = (value: Airline | null) => {
    if (
      typeof airline?.name == 'string' &&
      airline.name.toLowerCase() != 'other'
    ) {
      return;
    }

    setNewForm({
      ...newForm,
      meta: {
        ...newForm.meta,
        otherAirline: value,
      },
    });
    _setOtherAirline(value);
  };
  useEffect(() => {
    setIsOther(
      newForm.details?.airline &&
        !airlines.find((a: Airline) => a.icao == newForm.details.airline.icao),
    );

    if (newForm.meta?.otherAirline) {
      setOtherAirline(newForm.meta.otherAirline);
    }

    setSelectedDate(newForm.details.date);
    setAirline(newForm.details.airline);
  }, []);

  useEffect(() => {
    if (
      typeof airline?.name == 'string' &&
      airline.name.toLowerCase() == 'other'
    ) {
      setIsOther(true);
    } else {
      setIsOther(false);
    }
  }, [airline]);

  useEffect(() => {
    const fetchFlights = async () => {
      const res: AxiosResponse<any> = await api
        .post('/flights', {
          company:
            newForm.details.airline.name.toLowerCase() == 'other'
              ? otherAirline.icao
              : airline.icao,
          date: selectedDate,
          departure: newForm.details.routes.find((r) => !!r.troubled)
            .departureAirport.icao,
          arrival: newForm.details.routes.find((r) => !!r.troubled)
            .arrivalAirport.icao,
        })
        .catch((e) => {
          setFlights([]);
          throw e;
        });

      setFlights(
        res.data.map((f) => ({
          id: f.fr24_id,
          flightNumber: f.flight,
          departureTime: f.datetime_takeoff.slice(11, 16),
          arrivalTime: f.datetime_landed.slice(11, 16),
          departureAirport: f.orig_icao,
          arrivalAirport: f.dest_icao,
        })),
      );
    };

    if (
      ((airline && airline.name.toLowerCase() != 'other') || otherAirline) &&
      selectedDate
    ) {
      if (
        (airline.name.toLowerCase() == 'other' && !otherAirline) ||
        !newForm.details.routes.find((r) => !!r.troubled)
      ) {
        setIsFlightNumber(false);
        return;
      }
      fetchFlights();
      console.log('flights');
      setIsFlightNumber(true);
      return;
    }
    setIsFlightNumber(false);
  }, [airline, otherAirline, selectedDate, newForm.details.routes]);

  const helpItems = [
    {
      text: 'Enter the data for all the flights that you have booked together - not only for the disrupted one.',
    },
    {
      text: 'If you were given a substitute flight, its data may differ - so enter only the original flight details.',
    },
  ];

  useEffect(() => {
    if (
      (airline || otherAirline) &&
      selectedDate &&
      newForm.details.routes.find((r) => !!r.troubled) &&
      manualFlightNumber
    ) {
      setLocked(false);
    } else {
      setLocked(true);
    }
  }, [
    airline,
    otherAirline,
    selectedDate,
    newForm.details.routes,
    manualFlightNumber,
  ]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (
      (airline || otherAirline) &&
      selectedDate &&
      newForm.details.routes.find((r) => !!r.troubled) &&
      manualFlightNumber
    ) {
      setNewForm({
        ...newForm,
        details: {
          ...newForm.details,
          airline:
            airline.name.toLowerCase() == 'other' ? otherAirline : airline,
          date: selectedDate,
          flightNumber: manualFlightNumber,
        },
      });
      setStep(2.5);
    } else {
      toast({
        title: 'Complete the Form',
        description: 'All fields are required',
        variant: 'destructive',
      });
    }
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
          <h2 className="text-2xl font-semibold mb-2">Flight Details</h2>
          <p className="text-gray-600">
            Enter your flight information and select your flight.
          </p>
        </div>
        <HelpTooltip items={helpItems} variant="popover" className="mt-1" />
      </div>

      {/*<Form {...form}>*/}
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/*    /!* Problem flight selector when user has connecting flights *!/*/}
        <ProblemFlightSelector newForm={newForm} setNewForm={setNewForm} />
        {/*    /!* Flight input fields component *!/*/}
        <FlightInputFields
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          airline={airline}
          setAirline={setAirline}
        />
        {isOther && (
          <AirlineInput
            setAirline={setOtherAirline}
            preFilled={otherAirline}
            placeHolder="Airline"
          />
        )}
        {/*    <div className="pt-4 flex justify-between items-center">*/}
        {/*      {onBack && (*/}
        {isFlightNumber && (
          <div className="bg-[rgb(249,250,251)] p-6  rounded-lg">
            <FlightSelectionCards
              setManualFlightNumber={setManualFlightNumber}
              manualFlightNumber={manualFlightNumber}
              flights={flights}
              newForm={newForm}
              setNewForm={setNewForm}
            />
          </div>
        )}
        <div className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="flex items-center"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          {/*      )}*/}
          <div className={onBack ? '' : 'ml-auto'}>
            <Button
              disabled={locked}
              type="submit"
              className="w-full sm:w-auto"
            >
              Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
        {/*    </div>*/}
      </form>
      {/*</Form>*/}
    </motion.div>
  );
};

export default FlightDetailsStep;
