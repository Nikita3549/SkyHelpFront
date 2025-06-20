import { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Airport } from '@/components/AirportInput.tsx';

// Function to generate a random claim ID
const generateClaimId = () => {
  return Math.floor(1000000 + Math.random() * 9000000).toString();
};

export const useClaimFormState = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // Check for checkType in both location state and URL query parameters
  const checkTypeFromState = location.state?.checkType;
  const checkTypeFromUrl = searchParams.get('checkType');
  const isBoardingPass =
    checkTypeFromState === 'boardingPass' ||
    checkTypeFromUrl === 'boardingPass';

  // If we came from the boarding pass option, start at step 0 (boarding pass upload)
  // Otherwise start at step 1 (flight route)

  // const initialStep = isBoardingPass ? 0 : 1;
  const initialStep = 1;

  const [step, setStep] = useState(initialStep);
  const [isEligible, setIsEligible] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [connectionFlights, setConnectionFlights] = useState<string[]>(['']);
  const [claimId, setClaimId] = useState<string>(generateClaimId());
  const [formData, setFormData] = useState({
    flightRoute: {},
    flightDetails: {},
    passengerDetails: {},
    disruptionDetails: {},
    bookingReference: {},
    signature: {},
    flightDocuments: {},
    paymentDetails: {},
  });

  // Get pre-filled values from location state or URL parameters
  const preFilledDepartureAirport =
    location.state?.departureAirport ||
    (searchParams.get('departureAirport') as unknown as Airport) ||
    '';
  const preFilledArrivalAirport =
    location.state?.arrivalAirport ||
    (searchParams.get('arrivalAirport') as unknown as Airport) ||
    '';
  const preFilledConnectingAirports =
    location.state?.arrivalAirport ||
    (searchParams.get('connectingAirports') as unknown as Airport[]) ||
    '';
  const preFilledFlightNumber =
    location.state?.flightNumber || searchParams.get('flightNumber') || '';
  const preFilledDepartureDate =
    location.state?.departureDate || searchParams.get('departureDate') || '';

  // Initialize flight route form
  // const flightRouteForm = useForm<z.infer<typeof flightRouteSchema>>({
  //   resolver: zodResolver(flightRouteSchema),
  //   defaultValues: {
  //     departureAirport: preFilledDepartureAirport,
  //     arrivalAirport: preFilledArrivalAirport,
  //   },
  // });

  // Initialize flight details form
  // const flightDetailsForm = useForm<z.infer<typeof flightDetailsSchema>>({
  //   resolver: zodResolver(flightDetailsSchema),
  //   defaultValues: {
  //     // flightNumber: preFilledFlightNumber,
  //     flightNumber: '',
  //     airline: '',
  //     // departureDate: preFilledDepartureDate,
  //     departureDate: '',
  //     departureAirport: preFilledDepartureAirport,
  //     arrivalAirport: preFilledArrivalAirport,
  //     disruptionType: '', // No default disruption type
  //     connectingFlights: 'no',
  //     delayDuration: '1 hour',
  //     connectionAirports: [],
  //     problematicFlightSegment: '',
  //     arrivalDelay: undefined,
  //     notificationTime: undefined,
  //     voluntaryDenial: undefined,
  //   },
  // });

  // const passengerDetailsForm = useForm<z.infer<typeof passengerDetailsSchema>>({
  //   resolver: zodResolver(passengerDetailsSchema),
  //   defaultValues: {
  //     firstName: '',
  //     lastName: '',
  //     email: '',
  //     phone: '',
  //     address: '',
  //     addressLine2: '',
  //     city: '',
  //     postalCode: '',
  //     state: '',
  //     country: '',
  //     whatsappNotifications: false,
  //   },
  // });

  // const bookingReferenceForm = useForm<z.infer<typeof bookingReferenceSchema>>({
  //   resolver: zodResolver(bookingReferenceSchema),
  //   defaultValues: {
  //     bookingReference: '',
  //   },
  // });

  // const signatureForm = useForm<z.infer<typeof signatureSchema>>({
  //   resolver: zodResolver(signatureSchema),
  //   defaultValues: {
  //     signature: '',
  //     termsAgreed: false,
  //   },
  // });
  //
  // const disruptionDetailsForm = useForm<
  //   z.infer<typeof disruptionDetailsSchema>
  // >({
  //   resolver: zodResolver(disruptionDetailsSchema),
  //   defaultValues: {
  //     reasonProvided: undefined,
  //     airlineReason: undefined,
  //     additionalInfo: '',
  //   },
  // });

  // const paymentDetailsForm = useForm<z.infer<typeof paymentDetailsSchema>>({
  //   resolver: zodResolver(paymentDetailsSchema),
  //   defaultValues: {
  //     paymentMethod: 'bank_transfer',
  //     bankName: '',
  //     accountName: '',
  //     accountNumber: '',
  //     routingNumber: '',
  //     iban: '',
  //     paypalEmail: '',
  //     termsAgreed: false,
  //   },
  // });

  // const flightDocumentsForm = useForm<z.infer<typeof flightDocumentsSchema>>({
  //   resolver: zodResolver(flightDocumentsSchema),
  //   defaultValues: {
  //     documents: [],
  //   },
  // });

  return {
    step,
    setStep,
    isEligible,
    setIsEligible,
    isChecking,
    setIsChecking,
    formData,
    setFormData,
    location,
    preFilledDepartureAirport,
    preFilledArrivalAirport,
    preFilledFlightNumber,
    preFilledDepartureDate,
    preFilledConnectingAirports,
    // flightRouteForm,
    // flightDetailsForm,
    // passengerDetailsForm,
    // bookingReferenceForm,
    // signatureForm,
    // flightDocumentsForm,
    // disruptionDetailsForm,
    // paymentDetailsForm,
    connectionFlights,
    setConnectionFlights,
    claimId,
  };
};
