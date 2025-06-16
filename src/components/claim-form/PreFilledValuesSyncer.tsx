import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Airport } from '@/components/AirportInput.tsx';
import { IClaimForm } from '@/components/claim-form/interfaces/claim-form.interface.ts';

interface PreFilledValuesSyncerProps {
  preFilledDepartureAirport: Airport;
  preFilledArrivalAirport: Airport;
  preFilledConnectingFlights: Airport[];
  preFilledFlightNumber?: string;
  preFilledDepartureDate?: string;
  locationState: any;
  newForm: IClaimForm;
  setNewForm: (value: IClaimForm) => void;
}

const PreFilledValuesSyncer: React.FC<PreFilledValuesSyncerProps> = ({
  preFilledDepartureAirport,
  preFilledArrivalAirport,
  preFilledFlightNumber,
  preFilledDepartureDate,
  locationState,
  newForm,
  setNewForm,
  preFilledConnectingFlights,
}) => {
  // Update form values when location state changes
  useEffect(() => {
    newForm.meta = {
      arrivalAirport: preFilledArrivalAirport || null,
      departureAirport: preFilledDepartureAirport || null,
      connectingFlights: [],
      otherAirline: null,
      flightId: null,
      reasonProvided: null,
    };

    // if (preFilledFlightNumber) {
    //   form.setValue('flightNumber', preFilledFlightNumber);
    // }
    // if (preFilledDepartureDate) {
    //   form.setValue('departureDate', preFilledDepartureDate);
    // }
    setNewForm(newForm);
    // console.log(newForm);
  }, [
    locationState,
    // form,
    // flightRouteForm,
    preFilledDepartureAirport,
    preFilledArrivalAirport,
    preFilledFlightNumber,
    preFilledDepartureDate,
  ]);

  // Sync values from flight route to flight details
  // useEffect(() => {
  //   if (flightRouteForm) {
  //     const subscription = flightRouteForm.watch((value) => {
  //       if (value.departureAirport) {
  //         form.setValue('departureAirport', value.departureAirport);
  //       }
  //       if (value.arrivalAirport) {
  //         form.setValue('arrivalAirport', value.arrivalAirport);
  //       }
  //     });
  //
  //     return () => subscription.unsubscribe();
  //   }
  // }, [flightRouteForm, form]);

  return null;
};

export default PreFilledValuesSyncer;
