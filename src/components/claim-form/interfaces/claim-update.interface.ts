export interface IClaimUpdate {
  createdAt: string;
  updatedAt: string;
  details: {
    date: string;
    airline: {
      name: string;
      icao: string;
    };
    bookingRef: string;
    flightNumber: string;
    routes: {
      arrivalAirport: {
        icao: string;
        name: string;
      };
      departureAirport: {
        icao: string;
        name: string;
      };
      troubled: boolean;
    }[];
  };

  state: {
    status:
      | 'COMPLETED'
      | 'PENDING'
      | 'IN_PROGRESS'
      | 'ESCALATED'
      | 'REJECTED'
      | 'NOT_ELIGIBLE';
    amount: number;
    progress: any[];
  };

  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    secondAddress: string;
    city: string;
    postalCode: string;
    state: string;
    country: string;
    whatsapp: boolean;
  };

  issue: {
    delay?: string;
    cancellationNoticeDays?: string;
    disruptionType: string;
    airlineReason: string;
    wasAlternativeFlightOffered: boolean;
    arrivalTimeDelayOfAlternativeHours: number | null;
    additionalInfo: string | null;
  };

  payment: {
    accountName: string | null;
    accountNumber: string | null;
    bankName: string | null;
    email: string | null;
    iban: string | null;
    paymentMethod: 'bank_transfer' | 'paypal' | 'wise' | null;
    paypalEmail: string | null;
    termsAgreed: boolean;
  };
}
