import { format } from 'date-fns';
import { Claim } from '@/lib/supabase';

type FormStateWithId = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  additionalInformation: string;
  airline: string;
  flightnumber: string;
  date: Date;
  amount: string;
  departureAirport: string;
  arrivalAirport: string;
  flightIssue: string;
  reasonGivenByAirline: string;
  delayDuration?: string;
  paymentMethod: string;
  bankName: string;
  accountHolderName: string;
  iban: string;
  accountNumber: string;
  paypalEmail: string;
  wiseAccountHolder: string;
  wiseIbanOrAccount: string;
  wiseEmail: string;
  status:
    | 'pending'
    | 'in_progress'
    | 'escalated'
    | 'completed'
    | 'rejected'
    | 'not_eligible';
  stage: string;
};

export const prepareClaimDataForSubmission = (
  formState: FormStateWithId,
): Partial<Claim> => {
  // Format date for submission in the correct format: DD.MM.YY
  const formattedDate = format(formState.date, 'dd.MM.yy');
  console.log('Submitting with formatted date:', formattedDate);

  // Prepare payment details based on payment method
  let paymentDetails = {};
  if (formState.paymentMethod === 'bank_transfer') {
    paymentDetails = {
      bankName: formState.bankName,
      accountHolderName: formState.accountHolderName,
      iban: formState.iban,
      accountNumber: formState.accountNumber,
    };
  } else if (formState.paymentMethod === 'paypal') {
    paymentDetails = {
      paypalEmail: formState.paypalEmail,
    };
  } else if (formState.paymentMethod === 'wise') {
    paymentDetails = {
      accountHolderName: formState.wiseAccountHolder,
      ibanOrAccount: formState.wiseIbanOrAccount,
      email: formState.wiseEmail,
    };
  }

  // Prepare claim data for submission
  const claimData: Partial<Claim> = {
    id: formState.id,
    customer: `${formState.firstName} ${formState.lastName}`,
    email: formState.email,
    phone: formState.phone,
    address: formState.address,
    additionalinformation: formState.additionalInformation,
    airline: formState.airline,
    flightnumber: formState.flightnumber,
    date: formattedDate,
    amount: formState.amount,
    departureairport: formState.departureAirport,
    arrivalairport: formState.arrivalAirport,
    flightissue: formState.flightIssue,
    reasongivenbyairline: formState.reasonGivenByAirline,
    paymentmethod: formState.paymentMethod,
    paymentdetails: paymentDetails,
    status: formState.status,
    stage: formState.stage,
    lastupdated: format(new Date(), 'dd.MM.yy'),
  };

  return claimData;
};
