
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  flightDetailsSchema,
  passengerDetailsSchema,
  disruptionDetailsSchema,
  paymentDetailsSchema,
  flightRouteSchema
} from "@/components/claim-form/schemas";

export const useClaimFormState = () => {
  const [step, setStep] = useState(1);
  const [isEligible, setIsEligible] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [connectionFlights, setConnectionFlights] = useState<string[]>([""]);
  const [formData, setFormData] = useState({
    flightRoute: {},
    flightDetails: {},
    passengerDetails: {},
    disruptionDetails: {},
    paymentDetails: {},
  });

  const location = useLocation();

  // Get pre-filled values from location state
  const preFilledDepartureAirport = location.state?.departureAirport || "";
  const preFilledArrivalAirport = location.state?.arrivalAirport || "";
  const preFilledFlightNumber = location.state?.flightNumber || "";
  const preFilledDepartureDate = location.state?.departureDate || "";

  // Initialize flight route form
  const flightRouteForm = useForm<z.infer<typeof flightRouteSchema>>({
    resolver: zodResolver(flightRouteSchema),
    defaultValues: {
      departureAirport: preFilledDepartureAirport,
      arrivalAirport: preFilledArrivalAirport,
    },
  });

  // Initialize flight details form
  const flightDetailsForm = useForm<z.infer<typeof flightDetailsSchema>>({
    resolver: zodResolver(flightDetailsSchema),
    defaultValues: {
      flightNumber: preFilledFlightNumber,
      airline: "",
      departureDate: preFilledDepartureDate,
      departureAirport: preFilledDepartureAirport,
      arrivalAirport: preFilledArrivalAirport,
      disruptionType: "delay",
      connectingFlights: "no",
      delayDuration: "1 hour",
      connectionAirports: [],
    },
  });

  const passengerDetailsForm = useForm<z.infer<typeof passengerDetailsSchema>>({
    resolver: zodResolver(passengerDetailsSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      passengers: "1",
      address: "",
    },
  });

  const disruptionDetailsForm = useForm<z.infer<typeof disruptionDetailsSchema>>({
    resolver: zodResolver(disruptionDetailsSchema),
    defaultValues: {
      delayDuration: "",
      actualDepartureTime: "",
      originalDepartureTime: "",
      reasonGiven: "",
      additionalInfo: "",
    },
  });

  const paymentDetailsForm = useForm<z.infer<typeof paymentDetailsSchema>>({
    resolver: zodResolver(paymentDetailsSchema),
    defaultValues: {
      paymentMethod: "bank_transfer",
      bankName: "",
      accountName: "",
      accountNumber: "",
      routingNumber: "",
      iban: "",
      paypalEmail: "",
      termsAgreed: false,
    },
  });

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
    flightRouteForm,
    flightDetailsForm,
    passengerDetailsForm,
    disruptionDetailsForm,
    paymentDetailsForm,
    connectionFlights,
    setConnectionFlights,
  };
};
