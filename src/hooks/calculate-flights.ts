import { IClaimForm } from '@/components/claim-form/interfaces/claim-form.interface.ts';

export const calculateFlights = (
  newForm: IClaimForm,
  setNewForm: (form: IClaimForm) => void,
) => {
  const routes = [];
  const meta = newForm.meta;
  if (meta.connectingFlights.length == 0) {
    routes[0] = {
      departureAirport: meta.departureAirport,
      arrivalAirport: meta.arrivalAirport,
      troubled: !!newForm.details.routes[0]?.troubled,
    };
  } else {
    for (let i = 0; i <= meta.connectingFlights.length; i++) {
      if (i == 0) {
        routes[i] = {
          departureAirport: meta.departureAirport,
          arrivalAirport: meta.connectingFlights[i],
          troubled: !!newForm.details.routes[i]?.troubled,
        };
      } else if (i == meta.connectingFlights.length) {
        routes[i] = {
          departureAirport: meta.connectingFlights[i - 1],
          arrivalAirport: meta.arrivalAirport,
          troubled: !!newForm.details.routes[i]?.troubled,
        };
      } else {
        routes[i] = {
          departureAirport: meta.connectingFlights[i - 1],
          arrivalAirport: meta.connectingFlights[i],
          troubled: !!newForm.details.routes[i]?.troubled,
        };
      }
    }
  }
  setNewForm({
    ...newForm,
    details: {
      ...newForm.details,
      routes,
    },
  });
  console.log({
    ...newForm,
    details: {
      ...newForm.details,
      routes,
    },
  });
};
