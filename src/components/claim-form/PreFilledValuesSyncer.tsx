
import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { flightDetailsSchema } from "./schemas";

interface PreFilledValuesSyncerProps {
  form: UseFormReturn<z.infer<typeof flightDetailsSchema>>;
  preFilledDepartureAirport: string;
  preFilledArrivalAirport: string;
  preFilledFlightNumber: string;
  preFilledDepartureDate: string;
  locationState: any;
}

const PreFilledValuesSyncer: React.FC<PreFilledValuesSyncerProps> = ({
  form,
  preFilledDepartureAirport,
  preFilledArrivalAirport,
  preFilledFlightNumber,
  preFilledDepartureDate,
  locationState,
}) => {
  // Update form values when location state changes
  useEffect(() => {
    if (preFilledDepartureAirport) {
      form.setValue('departureAirport', preFilledDepartureAirport);
    }
    if (preFilledArrivalAirport) {
      form.setValue('arrivalAirport', preFilledArrivalAirport);
    }
    if (preFilledFlightNumber) {
      form.setValue('flightNumber', preFilledFlightNumber);
    }
    if (preFilledDepartureDate) {
      form.setValue('departureDate', preFilledDepartureDate);
    }
  }, [locationState, form, preFilledDepartureAirport, preFilledArrivalAirport, preFilledFlightNumber, preFilledDepartureDate]);

  return null;
};

export default PreFilledValuesSyncer;
