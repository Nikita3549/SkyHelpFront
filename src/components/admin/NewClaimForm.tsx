
import React, { useState } from "react";
import { z } from "zod";
import { format } from "date-fns";
import { toast } from "sonner";
import { newClaimSchema, type ClaimFormData } from "@/utils/formValidation";
import CustomerInfoSection from "./form-sections/CustomerInfoSection";
import FlightInfoSection from "./form-sections/FlightInfoSection";
import DateAndAmountSection from "./form-sections/DateAndAmountSection";
import FormActions from "./form-sections/FormActions";

type NewClaimFormProps = {
  onSubmit: (claimData: any) => void;
  onCancel: () => void;
};

const NewClaimForm = ({ onSubmit, onCancel }: NewClaimFormProps) => {
  const [formData, setFormData] = useState<ClaimFormData>({
    customer: "",
    email: "",
    airline: "",
    flightnumber: "",
    date: new Date(),
    amount: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [datePickerOpen, setDatePickerOpen] = useState(false);

  const handleChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
    // Clear error when field is edited
    if (errors[field]) {
      const newErrors = { ...errors };
      delete newErrors[field];
      setErrors(newErrors);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Validate the data
      newClaimSchema.parse(formData);
      
      // Create ID for the new claim
      const claimId = `CLM-${Math.floor(1000 + Math.random() * 9000)}`;
      
      // Create object with the new claim data
      const newClaim = {
        id: claimId,
        customer: formData.customer,
        email: formData.email,
        airline: formData.airline,
        flightnumber: formData.flightnumber,
        date: format(formData.date, "yyyy-MM-dd"),
        status: "pending",
        stage: "initial_review",
        amount: formData.amount.startsWith("€") ? formData.amount : `€${formData.amount}`,
        lastupdated: format(new Date(), "yyyy-MM-dd"),
      };

      onSubmit(newClaim);
    } catch (err) {
      if (err instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        err.errors.forEach((error) => {
          if (error.path) {
            newErrors[error.path[0].toString()] = error.message;
          }
        });
        setErrors(newErrors);
        
        toast.error("Please fix the form errors");
      } else {
        toast.error("An error occurred while creating the claim");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CustomerInfoSection
        customer={formData.customer}
        email={formData.email}
        errors={errors}
        handleChange={handleChange}
      />
      
      <FlightInfoSection
        airline={formData.airline}
        flightnumber={formData.flightnumber}
        errors={errors}
        handleChange={handleChange}
      />
      
      <DateAndAmountSection
        date={formData.date}
        amount={formData.amount}
        errors={errors}
        handleChange={handleChange}
        datePickerOpen={datePickerOpen}
        setDatePickerOpen={setDatePickerOpen}
      />
      
      <FormActions onCancel={onCancel} />
    </form>
  );
};

export default NewClaimForm;
