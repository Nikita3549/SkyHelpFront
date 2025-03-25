
import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { flightDetailsSchema, flightRouteSchema } from "./schemas";

interface PreFilledValuesSyncerProps {
  form: UseFormReturn<z.infer<typeof flightDetailsSchema>>;
  flightRouteForm?: UseFormReturn<z.infer<typeof flightRouteSchema>>;
  preFilledDepartureAirport: string;
  preFilledArrivalAirport: string;
  preFilledFlightNumber: string;
  preFilledDepartureDate: string;
  locationState: any;
}

const PreFilledValuesSyncer: React.FC<PreFilledValuesSyncerProps> = ({
  form,
  flightRouteForm,
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
      if (flightRouteForm) {
        flightRouteForm.setValue('departureAirport', preFilledDepartureAirport);
      }
    }
    if (preFilledArrivalAirport) {
      form.setValue('arrivalAirport', preFilledArrivalAirport);
      if (flightRouteForm) {
        flightRouteForm.setValue('arrivalAirport', preFilledArrivalAirport);
      }
    }
    if (preFilledFlightNumber) {
      form.setValue('flightNumber', preFilledFlightNumber);
    }
    if (preFilledDepartureDate) {
      form.setValue('departureDate', preFilledDepartureDate);
    }
  }, [locationState, form, flightRouteForm, preFilledDepartureAirport, preFilledArrivalAirport, preFilledFlightNumber, preFilledDepartureDate]);

  // Sync values between flight route and flight details forms
  useEffect(() => {
    if (flightRouteForm) {
      const subscription = flightRouteForm.watch((value) => {
        if (value.departureAirport) {
          form.setValue('departureAirport', value.departureAirport);
        }
        if (value.arrivalAirport) {
          form.setValue('arrivalAirport', value.arrivalAirport);
        }
      });

      return () => subscription.unsubscribe();
    }
  }, [flightRouteForm, form]);

  return null;
};

export default PreFilledValuesSyncer;
