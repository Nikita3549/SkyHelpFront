
import React from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { passengerDetailsSchema } from "@/components/claim-form/schemas";

interface AddressFieldsProps {
  form: UseFormReturn<z.infer<typeof passengerDetailsSchema>>;
}

const AddressFields: React.FC<AddressFieldsProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="address"
      render={({ field }) => (
        <FormItem className="md:col-span-2">
          <FormLabel>Address</FormLabel>
          <FormControl>
            <Textarea placeholder="Enter your address" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default AddressFields;
