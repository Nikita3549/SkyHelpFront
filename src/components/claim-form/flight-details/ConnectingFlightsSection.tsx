import React, { useEffect, useState } from 'react';
// import { FormField, FormItem, FormLabel } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { UseFormReturn } from 'react-hook-form';
import ConnectingFlightsForm from './ConnectingFlightsForm';
import { IClaimForm } from '@/components/claim-form/interfaces/claim-form.interface.ts';

interface ConnectingFlightsSectionProps {
  connectionFlights: string[];
  setConnectionFlights: React.Dispatch<React.SetStateAction<string[]>>;
  newForm: IClaimForm;
  setNewForm: (value: IClaimForm) => void;
  isConnectingFlights: boolean;
  setIsConnectingFlights: (value: boolean) => void;
}

const ConnectingFlightsSection: React.FC<ConnectingFlightsSectionProps> = ({
  connectionFlights,
  setConnectionFlights,
  newForm,
  setNewForm,
  setIsConnectingFlights,
  isConnectingFlights,
}) => {
  useEffect(() => {
    if (newForm.meta.connectingFlights.length != 0) {
      setConnectionFlights(
        newForm.meta.connectingFlights.map((a) => `${a.icao}`),
      );
      setIsConnectingFlights(true);
    } else {
      setConnectionFlights(['']);
    }
  }, []);
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">
        Did you have any connecting flights?
      </h3>

      {/*// control={form.control}*/}
      {/*// name="connectingFlights"*/}
      {/*// render={({ field }) => (*/}
      <div className="space-y-3">
        <div className="sr-only">Connecting Flights</div>
        <RadioGroup
          className="flex"
          onValueChange={(value) => {
            // field.onChange(value);
            // Reset connection airports if "no" is selected
            setIsConnectingFlights(true);
            if (value === 'no') {
              // form.setValue('connectionAirports', []);
              setIsConnectingFlights(false);
              newForm.meta.connectingFlights = [];
              setNewForm(newForm);
              setConnectionFlights(['']);
            }
          }}
          defaultValue={
            isConnectingFlights ||
            newForm.meta.connectingFlights.length > 0 ||
            newForm.details.routes.length > 1
              ? 'yes'
              : 'no'
          }
          // className="grid grid-cols-1 md:grid-cols-2 gap-4"
          // value={field.value}
        >
          <label
            htmlFor="connectingFlights-no"
            className="border rounded-md p-4 cursor-pointer w-full transition-colors hover:border-primary hover:bg-slate-50 flex items-center space-x-2"
          >
            <RadioGroupItem value="no" id="connectingFlights-no" />
            <span className="text-sm">No, I didn't</span>
          </label>

          <label
            htmlFor="connectingFlights-yes"
            className="border rounded-md p-4 w-full cursor-pointer transition-colors hover:border-primary hover:bg-slate-50 flex items-center space-x-2"
          >
            <RadioGroupItem value="yes" id="connectingFlights-yes" />
            <span className="text-sm">Yes, I had to change flights</span>
          </label>
        </RadioGroup>
      </div>
      {/*// )}*/}

      {isConnectingFlights && (
        <ConnectingFlightsForm
          connectionFlights={connectionFlights}
          setConnectionFlights={setConnectionFlights}
          newForm={newForm}
          setNewForm={setNewForm}
        />
      )}
    </div>
  );
};

export default ConnectingFlightsSection;
