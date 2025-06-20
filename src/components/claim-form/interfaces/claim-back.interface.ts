export interface IClaimBackend {
  id: string;
  step: number;
  userId: string;
  detailsId: string;
  stateId: string;
  customerId: string;
  issueId: string;
  envelopeId: string | null;
  paymentId: string | null;
  createdAt: string;
  updatedAt: string;
  details: {
    id: string;
    date: string;
    airline: string;
    bookingRef: string | null;
    flightNumber: string;
    airlines: {
      id: string;
      icao: string;
      name: string;
    };
    routes: {
      id: string;
      arrivalAirport: string;
      departureAirport: string;
      troubled: boolean;
      detailsId: string;
      ArrivalAirport: {
        id: string;
        icao: string;
        name: string;
      };
      DepartureAirport: {
        id: string;
        icao: string;
        name: string;
      };
    }[];
  };
  state: {
    id: string;
    status:
      | 'COMPLETED'
      | 'PENDING'
      | 'IN_PROGRESS'
      | 'ESCALATED'
      | 'REJECTED'
      | 'NOT_ELIGIBLE';
    amount: number;
    updatedAt: string;
    progress: {
      id: string;
      title: string;
      description: string;
      endAt: string | null;
      status: 'IN_PROCESS' | 'COMPLETED';
      claimStateId: string;
    }[];
  };
  customer: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    secondAddress: string | null;
    city: string;
    postalCode: string;
    state: string | null;
    country: string;
    whatsapp: boolean;
  };
  issue: {
    id: string;
    delay: 'less_than_3hours' | 'threehours_or_more' | 'never_arrived' | null;
    cancellationNoticeDays: 'less_than_14days' | 'fourteen_days_or_more' | null;
    disruptionType:
      | 'denied_boarding'
      | 'cancellation'
      | 'delay'
      | 'missed_connection';
    airlineReason:
      | 'technical_problems'
      | 'weather'
      | 'strike'
      | 'issues'
      | 'other'
      | 'dont_remember'
      | null;
    wasAlternativeFlightOffered: boolean;
    arrivalTimeDelayOfAlternativeHours: number | null;
    additionalInfo: string | null;
  };
  payment: {
    id: string;
    email: string | null;
    termsAgreed: boolean | null;
    paymentMethod: 'bank_transfer' | 'paypal' | 'wise' | null;
    bankName: string | null;
    accountName: string | null;
    accountNumber: string | null;
    iban: string | null;
    paypalEmail: string | null;
  };
  documents: {
    id: string;
    name: string;
    path: string;
    claimId: string;
  }[];
}
