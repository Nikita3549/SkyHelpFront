import React from 'react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { IClaimForm } from '@/components/claim-form/interfaces/claim-form.interface.ts';
import AirportInput, { Airport } from '@/components/AirportInput.tsx';

interface ConnectingFlightsFormProps {
  connectionFlights: string[];
  setConnectionFlights: React.Dispatch<React.SetStateAction<string[]>>;
  newForm: IClaimForm;
  setNewForm: (value: IClaimForm) => void;
}

const ConnectingFlightsForm: React.FC<ConnectingFlightsFormProps> = ({
  connectionFlights,
  setConnectionFlights,
  newForm,
  setNewForm,
}) => {
  // const connectingFlightsValue = form.watch('connectingFlights');

  const handleAddConnectionFlight = () => {
    setConnectionFlights([...connectionFlights, '']);
  };

  const handleAddConnectingFlight = (airport: Airport, index: number) => {
    if (airport) {
      newForm.meta.connectingFlights.splice(index, 0, airport);
      setNewForm(newForm);

      console.log(newForm);
    } else {
      newForm.meta.connectingFlights.splice(index, 1);
    }
  };

  const handleConnectionAirportChange = (index: number, value: string) => {
    const newConnectionFlights = [...connectionFlights];
    newConnectionFlights[index] = value;
    setConnectionFlights(newConnectionFlights);

    // Update the form value
    // form.setValue(
    //   'connectionAirports',
    //   newConnectionFlights.filter((airport) => airport.trim() !== ''),
    // );

    // Reset problematic flight segment if connection airports change
    // form.setValue('problematicFlightSegment', '');
  };

  const handleRemoveConnectionFlight = (index: number) => {
    if (index == 0) {
      return;
    }
    const newConnectionFlights = [...connectionFlights];
    newConnectionFlights.splice(index, 1);

    // Ensure there's always at least one empty field if all are removed
    if (newConnectionFlights.length === 0) {
      newConnectionFlights.push('');
    }

    setConnectionFlights(newConnectionFlights);

    newForm.meta.connectingFlights.splice(index, 1);
    setNewForm(newForm);

    console.log(newForm);

    // Update the form value
    // form.setValue(
    //   'connectionAirports',
    //   newConnectionFlights.filter((airport) => airport.trim() !== ''),
    // );
    //
    // // Reset problematic flight segment if connection airports change
    // form.setValue('problematicFlightSegment', '');
  };
  //
  // if (connectingFlightsValue !== 'yes') {
  //   return null;
  // }

  return (
    <div className="space-y-6 border border-input rounded-md p-4 mt-6">
      <h3 className="text-lg font-medium">
        Where did you have to change flight(s)?
      </h3>

      {connectionFlights.map((airport, index) => (
        <div key={index} className="space-y-2">
          {/*<FormLabel className="text-sm font-medium">*/}
          <p className="mb-2">{index + 1}. City or airport name</p>
          {/*</FormLabel>*/}
          <div className="relative">
            <AirportInput
              setAirport={(airport: Airport) => {
                handleAddConnectingFlight(airport, index);
              }}
              placeHolder="Airport"
              isDeparture={true}
              preFilled={newForm.meta.connectingFlights[index] || null}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => handleRemoveConnectionFlight(index)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
              aria-label="Remove connecting flight"
            >
              <X className="h-4 w-4 text-gray-500 hover:text-gray-900" />
            </Button>
          </div>
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        className="mt-4 text-primary"
        onClick={handleAddConnectionFlight}
      >
        <Plus className="h-4 w-4 mr-2" />
        Add another connecting flight
      </Button>
    </div>
  );
};

export default ConnectingFlightsForm;
