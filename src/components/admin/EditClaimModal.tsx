import React, { useState } from "react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Claim } from "@/lib/supabase";
import { format } from "date-fns";
import CustomerInfoSection from "./form-sections/CustomerInfoSection";
import FlightInfoSection from "./form-sections/FlightInfoSection";
import DateAndAmountSection from "./form-sections/DateAndAmountSection";
import FlightDetailsSection from "./form-sections/FlightDetailsSection";
import PaymentDetailsSection from "./form-sections/PaymentDetailsSection";
import FormActions from "./form-sections/FormActions";
import { toast } from "sonner";

type EditClaimModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (claimData: Partial<Claim>) => void;
  claim: Claim;
};

const EditClaimModal = ({ isOpen, onClose, onSubmit, claim }: EditClaimModalProps) => {
  // Split customer name into first and last name
  const fullName = claim.customer.split(" ");
  const initialFirstName = fullName[0] || "";
  const initialLastName = fullName.slice(1).join(" ") || "";

  // Parse date string to Date object
  const dateStr = claim.date;
  const dateParts = dateStr.split(".");
  const initialDate = dateParts.length === 3 
    ? new Date(Number(`20${dateParts[2]}`), Number(dateParts[1]) - 1, Number(dateParts[0]))
    : new Date();

  // Initialize payment details based on claim data
  const paymentDetails = claim.paymentdetails || {};

  // Form state
  const [formState, setFormState] = useState({
    // Customer Info
    firstName: initialFirstName,
    lastName: initialLastName,
    email: claim.email || "",
    phone: claim.phone || "",
    address: claim.address || "",
    numberOfPassengers: claim.numberofpassengers || "1",
    additionalInformation: claim.additionalinformation || "",
    
    // Flight Info
    airline: claim.airline || "",
    flightnumber: claim.flightnumber || "",
    
    // Date and Amount
    date: initialDate,
    amount: claim.amount || "",
    
    // Flight Details
    departureAirport: claim.departureairport || "",
    arrivalAirport: claim.arrivalairport || "",
    flightIssue: claim.flightissue || "delayed",
    reasonGivenByAirline: claim.reasongivenbyairline || "",
    delayDuration: "",
    
    // Payment Details
    paymentMethod: claim.paymentmethod || "bank_transfer",
    bankName: paymentDetails.bankName || "",
    accountHolderName: paymentDetails.accountName || paymentDetails.accountHolderName || "",
    iban: paymentDetails.iban || "",
    accountNumber: paymentDetails.accountNumber || "",
    paypalEmail: paymentDetails.paypalEmail || "",
    wiseAccountHolder: paymentDetails.accountName || "",
    wiseIbanOrAccount: paymentDetails.ibanOrAccount || "",
    wiseEmail: paymentDetails.email || "",
    
    // Status
    status: claim.status || "pending",
    stage: claim.stage || "initial_review",
  });

  const [activeTab, setActiveTab] = useState("customer");
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string, value: any) => {
    setFormState(prev => ({ ...prev, [field]: value }));
    // Clear error when field is updated
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Basic validation
    if (!formState.firstName) newErrors.firstName = "First name is required";
    if (!formState.lastName) newErrors.lastName = "Last name is required";
    if (!formState.email) newErrors.email = "Email is required";
    if (!formState.airline) newErrors.airline = "Airline is required";
    if (!formState.flightnumber) newErrors.flightnumber = "Flight number is required";
    if (!formState.date) newErrors.date = "Date is required";
    if (!formState.amount) newErrors.amount = "Amount is required";
    
    // Payment method specific validation
    if (formState.paymentMethod === "bank_transfer") {
      if (!formState.accountHolderName) newErrors.accountHolderName = "Account holder name is required";
    } else if (formState.paymentMethod === "paypal") {
      if (!formState.paypalEmail) newErrors.paypalEmail = "PayPal email is required";
    } else if (formState.paymentMethod === "wise") {
      if (!formState.wiseAccountHolder) newErrors.wiseAccountHolder = "Account holder name is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Find the first tab with errors
      if (errors.firstName || errors.lastName || errors.email || errors.phone || errors.address || errors.numberOfPassengers) {
        setActiveTab("customer");
      } else if (errors.airline || errors.flightnumber) {
        setActiveTab("flight");
      } else if (errors.date || errors.amount) {
        setActiveTab("date");
      } else if (errors.departureAirport || errors.arrivalAirport || errors.flightIssue || errors.reasonGivenByAirline) {
        setActiveTab("details");
      } else if (errors.paymentMethod || errors.accountHolderName || errors.paypalEmail || errors.wiseAccountHolder) {
        setActiveTab("payment");
      }
      
      toast.error("Please fix the errors before submitting", {
        description: "There are validation errors in the form",
      });
      return;
    }
    
    // Format date for submission in the correct format: DD.MM.YY
    const formattedDate = format(formState.date, "dd.MM.yy");
    console.log("Submitting with formatted date:", formattedDate);
    
    // Prepare payment details based on payment method
    let paymentDetails = {};
    if (formState.paymentMethod === "bank_transfer") {
      paymentDetails = {
        bankName: formState.bankName,
        accountHolderName: formState.accountHolderName,
        iban: formState.iban,
        accountNumber: formState.accountNumber,
      };
    } else if (formState.paymentMethod === "paypal") {
      paymentDetails = {
        paypalEmail: formState.paypalEmail,
      };
    } else if (formState.paymentMethod === "wise") {
      paymentDetails = {
        accountHolderName: formState.wiseAccountHolder,
        ibanOrAccount: formState.wiseIbanOrAccount,
        email: formState.wiseEmail,
      };
    }
    
    // Prepare claim data for submission
    const claimData: Partial<Claim> = {
      id: claim.id,
      customer: `${formState.firstName} ${formState.lastName}`,
      email: formState.email,
      phone: formState.phone,
      address: formState.address,
      numberofpassengers: formState.numberOfPassengers,
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
      lastupdated: format(new Date(), "dd.MM.yy"),
    };
    
    onSubmit(claimData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto bg-white p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Edit Claim {claim.id}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="mt-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-5 mb-6">
              <TabsTrigger value="customer">Customer</TabsTrigger>
              <TabsTrigger value="flight">Flight</TabsTrigger>
              <TabsTrigger value="date">Date & Amount</TabsTrigger>
              <TabsTrigger value="details">Flight Details</TabsTrigger>
              <TabsTrigger value="payment">Payment</TabsTrigger>
            </TabsList>
            
            <TabsContent value="customer" className="space-y-4">
              <CustomerInfoSection 
                firstName={formState.firstName}
                lastName={formState.lastName}
                email={formState.email}
                phone={formState.phone}
                address={formState.address}
                numberOfPassengers={formState.numberOfPassengers}
                additionalInformation={formState.additionalInformation}
                errors={errors}
                handleChange={handleChange}
              />
            </TabsContent>
            
            <TabsContent value="flight" className="space-y-4">
              <FlightInfoSection 
                airline={formState.airline}
                flightnumber={formState.flightnumber}
                errors={errors}
                handleChange={handleChange}
              />
            </TabsContent>
            
            <TabsContent value="date" className="space-y-4">
              <DateAndAmountSection 
                date={formState.date}
                amount={formState.amount}
                errors={errors}
                handleChange={handleChange}
                datePickerOpen={datePickerOpen}
                setDatePickerOpen={setDatePickerOpen}
              />
            </TabsContent>
            
            <TabsContent value="details" className="space-y-4">
              <FlightDetailsSection 
                departureAirport={formState.departureAirport}
                arrivalAirport={formState.arrivalAirport}
                flightIssue={formState.flightIssue}
                reasonGivenByAirline={formState.reasonGivenByAirline}
                delayDuration={formState.delayDuration}
                errors={errors}
                handleChange={handleChange}
              />
            </TabsContent>
            
            <TabsContent value="payment" className="space-y-4">
              <PaymentDetailsSection 
                paymentMethod={formState.paymentMethod}
                bankName={formState.bankName}
                accountHolderName={formState.accountHolderName}
                iban={formState.iban}
                accountNumber={formState.accountNumber}
                paypalEmail={formState.paypalEmail}
                wiseAccountHolder={formState.wiseAccountHolder}
                wiseIbanOrAccount={formState.wiseIbanOrAccount}
                wiseEmail={formState.wiseEmail}
                errors={errors}
                handleChange={handleChange}
              />
            </TabsContent>
          </Tabs>
          
          <FormActions onCancel={onClose} />
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditClaimModal;
