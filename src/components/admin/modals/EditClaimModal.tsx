
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Claim } from "@/lib/supabase";
import { toast } from "sonner";
import CustomerInfoSection from "../form-sections/CustomerInfoSection";
import FlightInfoSection from "../form-sections/FlightInfoSection";
import DateAndAmountSection from "../form-sections/DateAndAmountSection";
import FlightDetailsSection from "../form-sections/FlightDetailsSection";
import PaymentDetailsSection from "../form-sections/PaymentDetailsSection";
import FormActions from "../form-sections/FormActions";
import { useEditClaimForm } from "@/hooks/useEditClaimForm";
import { validateClaimForm } from "../utils/claimValidation";

type EditClaimModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (claimData: Partial<Claim>) => void;
  claim: Claim;
};

const EditClaimModal = ({ isOpen, onClose, onSubmit, claim }: EditClaimModalProps) => {
  const { formState, handleChange, handleSubmit } = useEditClaimForm({
    claim,
    onSubmit,
    onClose
  });
  
  const [activeTab, setActiveTab] = useState("customer");
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateClaimForm(formState);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      
      // Find the first tab with errors
      if (validationErrors.firstName || validationErrors.lastName || validationErrors.email || 
          validationErrors.phone || validationErrors.address) {
        setActiveTab("customer");
      } else if (validationErrors.airline || validationErrors.flightnumber) {
        setActiveTab("flight");
      } else if (validationErrors.date || validationErrors.amount) {
        setActiveTab("date");
      } else if (validationErrors.departureAirport || validationErrors.arrivalAirport || 
                validationErrors.flightIssue || validationErrors.reasonGivenByAirline) {
        setActiveTab("details");
      } else if (validationErrors.paymentMethod || validationErrors.accountHolderName || 
                validationErrors.paypalEmail || validationErrors.wiseAccountHolder) {
        setActiveTab("payment");
      }
      
      toast.error("Please fix the errors before submitting", {
        description: "There are validation errors in the form",
      });
      return;
    }
    
    handleSubmit(e);
  };

  const handleFieldChange = (field: string, value: any) => {
    handleChange(field, value);
    // Clear error when field is updated
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto bg-white p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Edit Claim {claim.id}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={onFormSubmit} className="mt-4">
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
                additionalInformation={formState.additionalInformation}
                errors={errors}
                handleChange={handleFieldChange}
              />
            </TabsContent>
            
            <TabsContent value="flight" className="space-y-4">
              <FlightInfoSection 
                airline={formState.airline}
                flightnumber={formState.flightnumber}
                errors={errors}
                handleChange={handleFieldChange}
              />
            </TabsContent>
            
            <TabsContent value="date" className="space-y-4">
              <DateAndAmountSection 
                date={formState.date}
                amount={formState.amount}
                errors={errors}
                handleChange={handleFieldChange}
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
                handleChange={handleFieldChange}
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
                handleChange={handleFieldChange}
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
