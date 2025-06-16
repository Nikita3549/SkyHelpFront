import React, { useState } from 'react';
import { useClaimFormState } from '@/hooks/useClaimFormState';
import { useClaimFormHandlers } from '@/hooks/useClaimFormHandlers';
import ClaimFormContent from '@/components/claim-form/ClaimFormContent';
import { useSearchParams } from 'react-router-dom';
import { IClaimForm } from '@/components/claim-form/interfaces/claim-form.interface.ts';

const ClaimForm = () => {
  const [searchParams] = useSearchParams();

  const {
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
  } = useClaimFormState();

  const {
    onFlightDetailsSubmit,
    onDisruptionTypeSubmit,
    onPassengerDetailsSubmit,
    onDisruptionDetailsSubmit,
    onBookingReferenceSubmit,
    onSignatureSubmit,
    onFlightDocumentsSubmit,
    onPaymentDetailsSubmit,
    onFlightRouteSubmit,
    skipPaymentDetails,
    proceedToNextStep,
  } = useClaimFormHandlers({
    setFormData,
    formData,
    setStep,
    setIsEligible,
    setIsChecking,
  });

  // Get the disruption type from flight details form
  // const disruptionType = flightDetailsForm.watch('disruptionType');

  // Check if we need to show the boarding pass upload component
  // Look in both URL parameters and location state
  const checkTypeFromState = location.state?.checkType;
  const checkTypeFromUrl = searchParams.get('checkType');
  const showBoardingPassUpload = false;

  // Animation transitions
  const transitions = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 },
  };

  const [newForm, setNewForm] = useState<IClaimForm>({
    id: null,
    details: {
      routes: [],
      flightNumber: null,
      date: null,
      airline: null,
      bookingRef: null,
    },
    state: {
      amount: null,
      status: null,
      progress: [],
    },
    issue: {
      volunteerDenial: false,
      wasAlternativeFlightOffered: false,
      additionalInfo: null,
      airlineReason: null,
      arrivalTimeDelayOfAlternativeHours: 0,
      cancellationNoticeDays: null,
      delay: null,
      disruptionType: null,
    },
    customer: {
      firstName: null,
      lastName: null,
      email: null,
      state: null,
      address: null,
      phone: null,
      secondAddress: null,
      city: null,
      postalCode: null,
      country: null,
      whatsapp: false,
    },
    meta: {
      arrivalAirport: null,
      departureAirport: null,
      connectingFlights: [],
      otherAirline: null,
      flightId: null,
      reasonProvided: null,
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
  });

  return (
    <ClaimFormContent
      step={step}
      setStep={setStep}
      showBoardingPassUpload={showBoardingPassUpload}
      // flightRouteForm={flightRouteForm}
      // flightDetailsForm={flightDetailsForm}
      // passengerDetailsForm={passengerDetailsForm}
      // bookingReferenceForm={bookingReferenceForm}
      // signatureForm={signatureForm}
      // flightDocumentsForm={flightDocumentsForm}
      // disruptionDetailsForm={disruptionDetailsForm}
      // paymentDetailsForm={paymentDetailsForm}
      connectionFlights={connectionFlights}
      setConnectionFlights={setConnectionFlights}
      onFlightRouteSubmit={onFlightRouteSubmit}
      onFlightDetailsSubmit={onFlightDetailsSubmit}
      onDisruptionTypeSubmit={onDisruptionTypeSubmit}
      onPassengerDetailsSubmit={onPassengerDetailsSubmit}
      onBookingReferenceSubmit={onBookingReferenceSubmit}
      onSignatureSubmit={onSignatureSubmit}
      onFlightDocumentsSubmit={onFlightDocumentsSubmit}
      onDisruptionDetailsSubmit={onDisruptionDetailsSubmit}
      onPaymentDetailsSubmit={onPaymentDetailsSubmit}
      skipPaymentDetails={skipPaymentDetails}
      proceedToNextStep={proceedToNextStep}
      isChecking={isChecking}
      isEligible={isEligible}
      transitions={transitions}
      // disruptionType={disruptionType}
      preFilledDepartureAirport={preFilledDepartureAirport}
      preFilledArrivalAirport={preFilledArrivalAirport}
      preFilledFlightNumber={preFilledFlightNumber}
      preFilledDepartureDate={preFilledDepartureDate}
      preFilledConnectingFlights={preFilledConnectingAirports}
      locationState={location.state}
      claimId={claimId}
      formData={formData}
      newForm={newForm}
      setNewForm={setNewForm}
    />
  );
};

export default ClaimForm;
