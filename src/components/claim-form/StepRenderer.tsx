import React, { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';

// Component imports
import FlightDetailsStep from '@/components/claim-form/FlightDetailsStep';
import DisruptionTypeStep from '@/components/claim-form/DisruptionTypeStep';
import PassengerDetailsStep from '@/components/claim-form/PassengerDetailsStep';
import BookingReferenceStep from '@/components/claim-form/BookingReferenceStep';
import DisruptionDetailsStep from '@/components/claim-form/DisruptionDetailsStep';
import PaymentDetailsStep from '@/components/claim-form/PaymentDetailsStep';
import FlightRouteStep from '@/components/claim-form/FlightRouteStep';
import BoardingPassUpload from '@/components/claim-form/BoardingPassUpload';
import SignatureStep from '@/components/claim-form/SignatureStep';
import FlightDocumentsStep from '@/components/claim-form/FlightDocumentsStep';
import ThankYouStep from '@/components/claim-form/ThankYouStep';
import { AnimationTransitions } from '@/components/claim-form/types';
import { useBoardingPassUpload } from '@/hooks/useBoardingPassUpload';
import ClaimForm from '@/pages/ClaimForm.tsx';
import { IClaimForm } from '@/components/claim-form/interfaces/claim-form.interface.ts';
import { DisruptionType } from '@/components/claim-form/enums/disruption.ts';
import { CancellationNotice } from '@/components/claim-form/enums/cancellation.enum.ts';
import { AirlineReason } from '@/components/claim-form/enums/airline-reason.enum.ts';
import { ReasonProvided } from '@/components/claim-form/enums/reason-provided.enum.ts';
import { ClaimStatus } from '@/components/claim-form/enums/claim-status.enum.ts';
import { ProgressStatus } from '@/components/claim-form/enums/progress-status.enum.ts';
import { useSearchParams } from 'react-router-dom';

interface StepRendererProps {
  step: number;
  showBoardingPassUpload: boolean;
  // flightRouteForm: UseFormReturn<any>;
  // flightDetailsForm: UseFormReturn<any>;
  // passengerDetailsForm: UseFormReturn<any>;
  // bookingReferenceForm: UseFormReturn<any>;
  // disruptionDetailsForm: UseFormReturn<any>;
  // paymentDetailsForm: UseFormReturn<any>;
  // signatureForm: UseFormReturn<any>;
  // flightDocumentsForm: UseFormReturn<any>;
  connectionFlights: string[];
  setConnectionFlights: React.Dispatch<React.SetStateAction<string[]>>;
  onFlightRouteSubmit: (data: any) => void;
  onFlightDetailsSubmit: (data: any) => void;
  onDisruptionTypeSubmit: (data: any) => void;
  onPassengerDetailsSubmit: (data: any) => void;
  onBookingReferenceSubmit: (data: any) => void;
  onSignatureSubmit: (data: any) => void;
  onFlightDocumentsSubmit: (data: any) => void;
  onDisruptionDetailsSubmit: (data: any) => void;
  onPaymentDetailsSubmit: (data: any) => void;
  skipPaymentDetails: () => void;
  proceedToNextStep: () => void;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  isChecking: boolean;
  isEligible: boolean | null;
  transitions: AnimationTransitions;
  // disruptionType: string;
  claimId?: string;
  // formData?: any;
  newForm: IClaimForm;
  setNewForm: (value: IClaimForm) => void;
}

const StepRenderer: React.FC<StepRendererProps> = ({
  step,

  showBoardingPassUpload,
  // flightRouteForm,
  // flightDetailsForm,
  // passengerDetailsForm,
  // bookingReferenceForm,
  // disruptionDetailsForm,
  // paymentDetailsForm,
  // signatureForm,
  // flightDocumentsForm,
  connectionFlights,
  setConnectionFlights,
  onFlightRouteSubmit,
  onFlightDetailsSubmit,
  onDisruptionTypeSubmit,
  onPassengerDetailsSubmit,
  onBookingReferenceSubmit,
  onSignatureSubmit,
  onFlightDocumentsSubmit,
  onDisruptionDetailsSubmit,
  onPaymentDetailsSubmit,
  skipPaymentDetails,
  proceedToNextStep,
  setStep,
  isChecking,
  isEligible,
  transitions,
  // disruptionType,
  claimId,
  // formData,
  newForm,
  setNewForm,
}) => {
  const [searchParams] = useSearchParams();
  const claimType = searchParams.get('test');
  // Use the boarding pass upload hook
  // const { handleBoardingPassSubmit } = useBoardingPassUpload({
  //   flightDetailsForm,
  //   setStep,
  // });

  // Get airline name from flightDetailsForm
  // const airlineName = flightDetailsForm.watch('airline');

  // Show boarding pass upload component if showBoardingPassUpload is true and step is 0 or 1
  // if (showBoardingPassUpload && step < 2) {
  //   return (
  //     <BoardingPassUpload
  //       onContinue={handleBoardingPassSubmit}
  //       transitions={transitions}
  //     />
  //   );
  // }

  // MOCK
  const mockOneRoutes = () => {
    setStep(4.8);
    setNewForm({
      customer: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'test@gmail.com',
        phone: '123414',
        address: '123 Main St',
        secondAddress: 'test',
        city: 'test',
        postalCode: 'test',
        state: 'test',
        country: 'BY',
        whatsapp: false,
      },
      details: {
        airline: {
          icao: 'DLH',
          name: 'Lufthansa',
          country: 'Germany',
          city: 'Frankfurt',
        },
        date: new Date(2025, 6, 20),
        flightNumber: 'AF123',
        bookingRef: null,
        routes: [
          {
            arrivalAirport: {
              icao: 'KMIA',
              city: 'Miami',
              name: 'Miami International Airport',
              country: 'US',
            },
            departureAirport: {
              icao: 'EDDM',
              city: 'Munich',
              name: 'Munich International Airport',
              country: 'DE',
            },
            troubled: true,
          },
        ],
      },
      id: 'cmc3f3qzl0000rb33zkvb3trz',
      issue: {
        volunteerDenial: false,
        wasAlternativeFlightOffered: true,
        additionalInfo: 'additional info',
        airlineReason: AirlineReason.weather,
        arrivalTimeDelayOfAlternativeHours: 2,
        cancellationNoticeDays: CancellationNotice.less_than_14days,
        delay: null,
        disruptionType: DisruptionType.cancellation,
      },
      meta: {
        arrivalAirport: {
          icao: 'KMIA',
          city: 'Miami',
          name: 'Epps Airpark',
          country: 'Miami International Airport',
        },
        departureAirport: {
          icao: 'EDDM',
          city: 'Munich',
          name: 'Munich International Airport',
          country: 'DE',
        },
        connectingFlights: [],
        otherAirline: {
          icao: 'DLH',
          name: 'Lufthansa',
          country: 'Germany',
          city: 'Frankfurt',
        },
        flightId: '3a0ce5f6',
        reasonProvided: ReasonProvided.yes,
      },
      payment: {
        email: null,
        termsAgreed: null,
        paymentMethod: null,
        bankName: null,
        accountName: null,
        accountNumber: null,
        iban: null,
        paypalEmail: null,
      },
      state: {
        amount: 600,
        status: ClaimStatus.IN_PROGRESS,
        progress: [
          {
            claimStateId: 'cmby2fik20006rbiwwis0dzz2',
            description: 'Claim has been submitted and received',
            endAt: null,
            id: 'cmby2fik20007rbiw9g9ixs3f',
            status: ProgressStatus.IN_PROCESS,
            title: 'Claim Received',
          },
          {
            claimStateId: 'cmby2fik20006rbiwwis0dzz2',
            description: 'All required documents have been verified',
            endAt: null,
            id: 'cmby2fik30008rbiw6ik7hwi3',
            status: ProgressStatus.IN_PROCESS,
            title: 'Documents Verified',
          },
          {
            claimStateId: 'cmby2fik20006rbiwwis0dzz2',
            description: 'Airline has been contacted regarding the claim',
            endAt: null,
            id: 'cmby2fik30009rbiwl6okkz3e',
            status: ProgressStatus.IN_PROCESS,
            title: 'Airline Contacted',
          },
          {
            claimStateId: 'cmby2fik20006rbiwwis0dzz2',
            description: "Waiting for airline's final response",
            endAt: null,
            id: 'cmby2fik3000arbiwh6sapzwu',
            status: ProgressStatus.IN_PROCESS,
            title: 'Awaiting Response',
          },
          {
            claimStateId: 'cmby2fik20006rbiwwis0dzz2',
            description:
              'Compensation has been approved and is pending payment',
            endAt: null,
            id: 'cmby2fik3000brbiwimnndswo',
            status: ProgressStatus.IN_PROCESS,
            title: 'Compensation Pending',
          },
          {
            claimStateId: 'cmby2fik20006rbiwwis0dzz2',
            description: 'Compensation has been paid',
            endAt: null,
            id: 'cmby2fik3000crbiwvoahh8gf',
            status: ProgressStatus.IN_PROCESS,
            title: 'Claim Completed',
          },
        ],
      },
    });
  };

  useEffect(() => {
    if (claimType == 'docusign') {
      mockOneRoutes();
    }
  }, []);

  switch (step) {
    case 1:
      return (
        <FlightRouteStep
          // onSubmit={onFlightRouteSubmit}
          transitions={transitions}
          connectionFlights={connectionFlights}
          setConnectionFlights={setConnectionFlights}
          // flightDetailsForm={flightDetailsForm}
          newForm={newForm}
          setNewForm={setNewForm}
          setStep={setStep}
        />
      );
    case 2:
      return (
        <FlightDetailsStep
          // onSubmit={onFlightDetailsSubmit}
          transitions={transitions}
          onBack={() => setStep(1)}
          connectionFlights={connectionFlights}
          setConnectionFlights={setConnectionFlights}
          setStep={setStep}
          newForm={newForm}
          setNewForm={setNewForm}
        />
      );
    case 2.5:
      return (
        <DisruptionTypeStep
          // onSubmit={onDisruptionTypeSubmit}
          isChecking={isChecking}
          isEligible={isEligible}
          onContinue={proceedToNextStep}
          transitions={transitions}
          onBack={() => setStep(2)}
          setStep={setStep}
          newForm={newForm}
          setNewForm={setNewForm}
        />
      );
    case 3:
      return (
        <DisruptionDetailsStep
          // onSubmit={onDisruptionDetailsSubmit}
          onBack={() => setStep(2.5)}
          transitions={transitions}
          newForm={newForm}
          setNewForm={setNewForm}
          setStep={setStep}
          // disruptionType={disruptionType}
        />
      );
    case 4:
      return (
        <PassengerDetailsStep
          setStep={setStep}
          newForm={newForm}
          setNewForm={setNewForm}
          // onSubmit={onPassengerDetailsSubmit}
          // onBack={() => setStep(3)}
          transitions={transitions}
          // newForm={newForm}
          // setNewForm={setNewForm}
        />
      );
    case 4.5:
      return (
        <BookingReferenceStep
          // onSubmit={onBookingReferenceSubmit}
          transitions={transitions}
          newForm={newForm}
          setNewForm={setNewForm}
          setStep={setStep}
        />
      );
    case 4.8:
      return (
        <SignatureStep
          // onSubmit={onSignatureSubmit}
          onBack={() => setStep(4.5)}
          transitions={transitions}
          claimId={claimId}
          newForm={newForm}
          setStep={setStep}
        />
      );
    case 4.9:
      return (
        <FlightDocumentsStep
          newForm={newForm}
          setNewForm={setNewForm}
          setStep={setStep}
          // onSubmit={onFlightDocumentsSubmit}
          onBack={() => setStep(4.8)}
          transitions={transitions}
        />
      );
    case 5:
      return (
        <PaymentDetailsStep
          // onSubmit={onPaymentDetailsSubmit}
          onBack={() => setStep(4.9)}
          transitions={transitions}
          onSkip={skipPaymentDetails}
          newForm={newForm}
          setNewForm={setNewForm}
          setStep={() => setStep(6)}
        />
      );
    case 6:
      return (
        <ThankYouStep
          transitions={transitions}
          claimId={claimId || '5786537'}
          airlineName={newForm.details.airline.name || 'airline'}
        />
      );
    default:
      return null;
  }
};

export default StepRenderer;
