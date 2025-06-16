import { DelayCategory } from '@/components/claim-form/enums/delay.enum.ts';
import { CancellationNotice } from '@/components/claim-form/enums/cancellation.enum.ts';
import { DisruptionType } from '@/components/claim-form/enums/disruption.ts';
import { AirlineReason } from '@/components/claim-form/enums/airline-reason.enum.ts';
import { Airport } from '@/components/AirportInput.tsx';
import { Airline } from '@/components/claim-form/flight-details/interfaces/Airline.interface.ts';
import { ReasonProvided } from '@/components/claim-form/enums/reason-provided.enum.ts';
import { ClaimStatus } from '../enums/claim-status.enum';
import { ProgressStatus } from '@/components/claim-form/enums/progress-status.enum.ts';
import { PaymentMethod } from '../enums/payment-method.enum';

export interface IClaimForm {
  id?: string;
  details: {
    routes: {
      arrivalAirport: Airport | null;
      departureAirport: Airport | null;
      troubled: boolean;
    }[];
    flightNumber: string | null;
    date: Date | null;
    airline: Airline | null;
    bookingRef: string | null;
  } | null;
  meta: {
    departureAirport: Airport | null;
    arrivalAirport: Airport | null;
    connectingFlights: Airport[];
    otherAirline: Airline | null;
    flightId: string;
    reasonProvided: ReasonProvided | null;
  };
  state: {
    amount: number;
    status: ClaimStatus | null;
    progress:
      | {
          claimStateId: string;
          description: string;
          endAt: string | null;
          id: string;
          status: ProgressStatus;
          title: string;
        }[]
      | null;
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
    // reason: IssueReason | null;
    volunteerDenial: boolean;
    delay: DelayCategory | null;
    cancellationNoticeDays: CancellationNotice | null;
    disruptionType: DisruptionType | null;
    airlineReason: AirlineReason | null;
    wasAlternativeFlightOffered: boolean;
    arrivalTimeDelayOfAlternativeHours: number;
    additionalInfo: string | null;
  } | null;
  payment: {
    email: string | null;
    termsAgreed: boolean | null;
    paymentMethod: PaymentMethod;
    bankName: string | null;
    accountName: string | null;
    accountNumber: string | null;
    iban: string | null;
    paypalEmail: string | null;
  } | null;
}
