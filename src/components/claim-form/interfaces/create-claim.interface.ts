import { DelayCategory } from '@/components/claim-form/enums/delay.enum.ts';
import { CancellationNotice } from '@/components/claim-form/enums/cancellation.enum.ts';
import { DisruptionType } from '@/components/claim-form/enums/disruption.ts';
import { AirlineReason } from '@/components/claim-form/enums/airline-reason.enum.ts';
import { Airport } from '@/components/AirportInput.tsx';
import { Airline } from '@/components/claim-form/flight-details/interfaces/Airline.interface.ts';

export interface ICreateClaim {
  details: {
    routes: {
      departureAirport: Airport;
      arrivalAirport: Airport;
      troubled: boolean;
    }[];
    flightNumber: string | null;
    date: Date | null;
    airline: Airline | null;
  } | null;
  state: {
    amount: number;
  } | null;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    secondAddress: string | null;
    city: string;
    postalCode: string;
    state: string;
    country: string;
    whatsapp: boolean;
  } | null;
  issue: {
    delay: DelayCategory | null;
    cancellationNoticeDays: CancellationNotice | null;
    disruptionType: DisruptionType | null;
    airlineReason: AirlineReason | null;
    wasAlternativeFlightOffered: boolean;
    arrivalTimeDelayOfAlternativeHours: number | null;
    additionalInfo: string | null;
  } | null;
}
