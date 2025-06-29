import React, { useState } from 'react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import CustomerInfoSection from './form-sections/CustomerInfoSection';
import FlightInfoSection from './form-sections/FlightInfoSection';
import FlightDetailsSection from './form-sections/FlightDetailsSection';
import DateAndAmountSection from './form-sections/DateAndAmountSection';
import PaymentDetailsSection from './form-sections/PaymentDetailsSection';
import FormActions from './form-sections/FormActions';

type NewClaimFormProps = {
  onSubmit: (claimData: any) => void;
  onCancel: () => void;
};

const NewClaimForm = ({ onSubmit, onCancel }: NewClaimFormProps) => {
  // const [formData, setFormData] = useState<ClaimFormData>({
  //   firstName: '',
  //   lastName: '',
  //   email: '',
  //   phone: '',
  //   address: '',
  //   airline: '',
  //   flightnumber: '',
  //   departureAirport: '',
  //   arrivalAirport: '',
  //   flightIssue: '',
  //   reasonGivenByAirline: '',
  //   delayDuration: '',
  //   date: new Date(),
  //   amount: '',
  //   additionalInformation: '',
  //   paymentMethod: '',
  //   bankName: '',
  //   accountHolderName: '',
  //   iban: '',
  //   accountNumber: '',
  //   paypalEmail: '',
  //   wiseAccountHolder: '',
  //   wiseIbanOrAccount: '',
  //   wiseEmail: '',
  // });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [datePickerOpen, setDatePickerOpen] = useState(false);

  const handleChange = (field: string, value: any) => {
    // setFormData({ ...formData, [field]: value });
    // // Clear error when field is edited
    // if (errors[field]) {
    //   const newErrors = { ...errors };
    //   delete newErrors[field];
    //   setErrors(newErrors);
    // }
  };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();

  // try {
  //   // Validate the data
  //   newClaimSchema.parse(formData);
  //
  //   // Create ID for the new claim
  //   const claimId = `CLM-${Math.floor(1000 + Math.random() * 9000)}`;
  //
  //   // Construct the customer name from first and last
  //   const customer = `${formData.firstName} ${formData.lastName}`;
  //
  //   // Create payment details object based on payment method
  //   let paymentDetails = {};
  //   if (formData.paymentMethod === 'bank_transfer') {
  //     paymentDetails = {
  //       bankName: formData.bankName,
  //       accountHolderName: formData.accountHolderName,
  //       iban: formData.iban,
  //       accountNumber: formData.accountNumber,
  //     };
  //   } else if (formData.paymentMethod === 'paypal') {
  //     paymentDetails = {
  //       paypalEmail: formData.paypalEmail,
  //     };
  //   } else if (formData.paymentMethod === 'wise') {
  //     paymentDetails = {
  //       accountHolderName: formData.wiseAccountHolder,
  //       ibanOrAccount: formData.wiseIbanOrAccount,
  //       email: formData.wiseEmail,
  //     };
  //   }

  // Create object with the new claim data - ensuring field names match database expectations
  // const newClaim = {
  //   id: claimId,
  //   customer,
  //   email: formData.email,
  //   phone: formData.phone,
  //   address: formData.address,
  //   // Match the database column names (lowercase)
  //   departureAirport: formData.departureAirport,
  //   arrivalAirport: formData.arrivalAirport,
  //   flightIssue: formData.flightIssue,
  //   delayDuration:
  //     formData.flightIssue === 'delayed' ? formData.delayDuration : null,
  //   reasonGivenByAirline: formData.reasonGivenByAirline,
  //   airline: formData.airline,
  //   flightnumber: formData.flightnumber,
  //   date: format(formData.date, 'yyyy-MM-dd'),
  //   status: 'pending',
  //   stage: 'initial_review',
  //   amount: formData.amount.startsWith('€')
  //     ? formData.amount
  //     : `€${formData.amount}`,
  //   additionalInformation: formData.additionalInformation || '',
  //   paymentMethod: formData.paymentMethod,
  //   paymentDetails,
  //   lastupdated: format(new Date(), 'yyyy-MM-dd'),
  // };

  // console.log('Submitting new claim data:', newClaim);
  // onSubmit(newClaim);
  // } catch (err) {
  // if (err instanceof z.ZodError) {
  //   const newErrors: Record<string, string> = {};
  //   err.errors.forEach((error) => {
  //     if (error.path) {
  //       newErrors[error.path[0].toString()] = error.message;
  //     }
  //   });
  //   setErrors(newErrors);
  //
  //   toast.error('Please fix the form errors');
  // } else {
  //     console.error('Form submission error:', err);
  //     toast.error('An error occurred while creating the claim');
  //     // }
  //   }
  // };

  return (
    // <form onSubmit={handleSubmit} className="space-y-6">
    //   <CustomerInfoSection
    //     firstName={formData.firstName}
    //     lastName={formData.lastName}
    //     email={formData.email}
    //     phone={formData.phone}
    //     address={formData.address}
    //     additionalInformation={formData.additionalInformation}
    //     errors={errors}
    //     handleChange={handleChange}
    //   />
    //
    //   <hr className="my-6" />
    //
    //   <FlightInfoSection
    //     airline={formData.airline}
    //     flightnumber={formData.flightnumber}
    //     errors={errors}
    //     handleChange={handleChange}
    //   />
    //
    //   <FlightDetailsSection
    //     departureAirport={formData.departureAirport}
    //     arrivalAirport={formData.arrivalAirport}
    //     flightIssue={formData.flightIssue}
    //     reasonGivenByAirline={formData.reasonGivenByAirline}
    //     delayDuration={formData.delayDuration}
    //     errors={errors}
    //     handleChange={handleChange}
    //   />
    //
    //   <hr className="my-6" />
    //
    //   <DateAndAmountSection
    //     date={formData.date}
    //     amount={formData.amount}
    //     errors={errors}
    //     handleChange={handleChange}
    //     datePickerOpen={datePickerOpen}
    //     setDatePickerOpen={setDatePickerOpen}
    //   />
    //
    //   <hr className="my-6" />
    //
    //   <PaymentDetailsSection
    //     paymentMethod={formData.paymentMethod}
    //     bankName={formData.bankName}
    //     accountHolderName={formData.accountHolderName}
    //     iban={formData.iban}
    //     accountNumber={formData.accountNumber}
    //     paypalEmail={formData.paypalEmail}
    //     wiseAccountHolder={formData.wiseAccountHolder}
    //     wiseIbanOrAccount={formData.wiseIbanOrAccount}
    //     wiseEmail={formData.wiseEmail}
    //     errors={errors}
    //     handleChange={handleChange}
    //   />
    //
    //   <FormActions onCancel={onCancel} />
    // </form>
    <></>
  );
};

export default NewClaimForm;
