import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { toast } from 'sonner';
import {
  flightDetailsSchema,
  passengerDetailsSchema,
  disruptionDetailsSchema,
  paymentDetailsSchema,
  flightRouteSchema,
  bookingReferenceSchema,
  signatureSchema,
  flightDocumentsSchema,
} from '@/components/claim-form/schemas';

interface UseClaimFormHandlersProps {
  setFormData: React.Dispatch<
    React.SetStateAction<{
      flightRoute: Record<string, any>;
      flightDetails: Record<string, any>;
      passengerDetails: Record<string, any>;
      disruptionDetails: Record<string, any>;
      bookingReference: Record<string, any>;
      signature: Record<string, any>;
      flightDocuments: Record<string, any>;
      paymentDetails: Record<string, any>;
    }>
  >;
  formData: {
    flightRoute: Record<string, any>;
    flightDetails: Record<string, any>;
    passengerDetails: Record<string, any>;
    disruptionDetails: Record<string, any>;
    bookingReference: Record<string, any>;
    signature: Record<string, any>;
    flightDocuments: Record<string, any>;
    paymentDetails: Record<string, any>;
  };
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setIsEligible: React.Dispatch<React.SetStateAction<boolean | null>>;
  setIsChecking: React.Dispatch<React.SetStateAction<boolean>>;
}

// Helper function to scroll to top of the page
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

export const useClaimFormHandlers = ({
  setFormData,
  formData,
  setStep,
  setIsEligible,
  setIsChecking,
}: UseClaimFormHandlersProps) => {
  const navigate = useNavigate();

  const onFlightRouteSubmit = (data: z.infer<typeof flightRouteSchema>) => {
    // When submitting flight route data (step 1), we store it and move to step 2
    setFormData({ ...formData, flightRoute: data });
    setStep(2);
    scrollToTop();
  };

  const onFlightDetailsSubmit = (data: z.infer<typeof flightDetailsSchema>) => {
    // Save the flight details and move to disruption type step (2.5)
    setFormData({
      ...formData,
      flightDetails: { ...formData.flightDetails, ...data },
    });
    setStep(2.5);
    scrollToTop();
  };

  const onDisruptionTypeSubmit = (
    data: z.infer<typeof flightDetailsSchema>,
  ) => {
    // Special case: Cancellation with 14+ days notice - don't show eligibility check
    // This case is now handled in the component directly via the modal
    if (
      data.disruptionType === 'cancellation' &&
      data.notificationTime === '14days_or_more'
    ) {
      setFormData({
        ...formData,
        flightDetails: { ...formData.flightDetails, ...data },
      });
      return;
    }

    setIsChecking(true);
    setFormData({
      ...formData,
      flightDetails: { ...formData.flightDetails, ...data },
    });

    // Simulate checking eligibility based on the EU regulation
    setTimeout(() => {
      // Check for eligibility based on flight disruption type and arrival delay
      let isEligible = false;

      if (data.disruptionType === 'delay') {
        // Eligible if arrival delay is 3 hours or more
        isEligible = data.arrivalDelay === '3hours_or_more';
      } else if (data.disruptionType === 'cancellation') {
        // Eligible if notified less than 14 days before departure
        // or if the arrival delay is 3 hours or more
        isEligible =
          data.arrivalDelay === '3hours_or_more' ||
          data.arrivalDelay === 'never_arrived' ||
          data.notificationTime === 'less_than_14days';
      } else if (data.disruptionType === 'denied_boarding') {
        // Eligible if not voluntary and arrival delay is 3 hours or more
        isEligible =
          data.arrivalDelay === '3hours_or_more' &&
          data.voluntaryDenial === 'no';
      } else if (data.disruptionType === 'missed_connection') {
        // Missed connections might be eligible depending on the total delay
        isEligible = true;
      }

      setIsEligible(isEligible);
      setIsChecking(false);

      if (isEligible) {
        scrollToTop();
      }
    }, 2000);
  };

  const onDisruptionDetailsSubmit = (
    data: z.infer<typeof disruptionDetailsSchema>,
  ) => {
    setFormData({ ...formData, disruptionDetails: data });
    setStep(4);
    scrollToTop();
  };

  const onPassengerDetailsSubmit = (
    data: z.infer<typeof passengerDetailsSchema>,
  ) => {
    setFormData({ ...formData, passengerDetails: data });
    setStep(4.5); // New step for booking reference
    scrollToTop();
  };

  const onBookingReferenceSubmit = (
    data: z.infer<typeof bookingReferenceSchema>,
  ) => {
    setFormData({ ...formData, bookingReference: data });
    setStep(4.8); // Move to signature step
    scrollToTop();
  };

  const onSignatureSubmit = (data: z.infer<typeof signatureSchema>) => {
    // Here we'd also generate and store assignment agreement PDF with the signature
    // For now, we're simulating this by just storing the signature
    const assignmentAgreementPdf =
      'assignment_agreement_' + new Date().getTime() + '.pdf';

    setFormData({
      ...formData,
      signature: {
        ...data,
        assignmentAgreement: assignmentAgreementPdf,
      },
    });
    setStep(4.9); // Move to flight documents step
    scrollToTop();
  };

  const onFlightDocumentsSubmit = (
    data: z.infer<typeof flightDocumentsSchema>,
  ) => {
    setFormData({ ...formData, flightDocuments: data });
    setStep(5); // Move to payment details
    scrollToTop();
  };

  const onPaymentDetailsSubmit = (
    data: z.infer<typeof paymentDetailsSchema>,
  ) => {
    const finalFormData = {
      ...formData,
      paymentDetails: data,
    };

    setFormData(finalFormData);

    console.log('Complete form data:', finalFormData);

    toast.success('Claim submitted successfully', {
      description: "We'll process your claim and keep you updated.",
    });

    // Instead of going to dashboard, go to thank you step
    setStep(6);
    scrollToTop();
  };

  // Handler for skipping payment details
  const skipPaymentDetails = () => {
    toast.info('You can add payment details later', {
      description:
        "We'll request payment information when your claim is approved.",
    });

    // Move to thank you step
    setStep(6);
    scrollToTop();
  };

  // Navigation handlers
  const proceedToNextStep = () => {
    setStep(3);
    scrollToTop();
  };

  return {
    onFlightRouteSubmit,
    onFlightDetailsSubmit,
    onDisruptionTypeSubmit,
    onDisruptionDetailsSubmit,
    onPassengerDetailsSubmit,
    onBookingReferenceSubmit,
    onSignatureSubmit,
    onFlightDocumentsSubmit,
    onPaymentDetailsSubmit,
    skipPaymentDetails,
    proceedToNextStep,
  };
};
