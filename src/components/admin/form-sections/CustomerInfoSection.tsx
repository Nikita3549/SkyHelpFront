
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type CustomerInfoSectionProps = {
  customer: string;
  email: string;
  errors: Record<string, string>;
  handleChange: (field: string, value: any) => void;
};

const CustomerInfoSection = ({
  customer,
  email,
  errors,
  handleChange,
}: CustomerInfoSectionProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="customer">Customer Name</Label>
        <Input
          id="customer"
          value={customer}
          onChange={(e) => handleChange("customer", e.target.value)}
          placeholder="Enter customer name"
        />
        {errors.customer && <p className="text-sm text-red-500">{errors.customer}</p>}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => handleChange("email", e.target.value)}
          placeholder="customer@example.com"
        />
        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
      </div>
    </>
  );
};

export default CustomerInfoSection;
