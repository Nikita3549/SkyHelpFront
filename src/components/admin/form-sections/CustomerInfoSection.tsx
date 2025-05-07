
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type CustomerInfoSectionProps = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  additionalInformation: string;
  errors: Record<string, string>;
  handleChange: (field: string, value: any) => void;
};

const CustomerInfoSection = ({
  firstName,
  lastName,
  email,
  phone,
  address,
  additionalInformation,
  errors,
  handleChange,
}: CustomerInfoSectionProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Customer Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            value={firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
            placeholder="Enter first name"
          />
          {errors.firstName && <p className="text-sm text-red-500">{errors.firstName}</p>}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            value={lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
            placeholder="Enter last name"
          />
          {errors.lastName && <p className="text-sm text-red-500">{errors.lastName}</p>}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            value={phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            placeholder="Enter phone number"
          />
          {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          value={address}
          onChange={(e) => handleChange("address", e.target.value)}
          placeholder="Enter address"
        />
        {errors.address && <p className="text-sm text-red-500">{errors.address}</p>}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="additionalInformation">Additional Information</Label>
        <Textarea
          id="additionalInformation"
          value={additionalInformation}
          onChange={(e) => handleChange("additionalInformation", e.target.value)}
          placeholder="Enter any additional information"
          rows={4}
        />
        {errors.additionalInformation && <p className="text-sm text-red-500">{errors.additionalInformation}</p>}
      </div>
    </div>
  );
};

export default CustomerInfoSection;
