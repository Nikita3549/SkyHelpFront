
import React from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { paymentDetailsSchema } from "@/components/claim-form/schemas";

interface PayPalFieldsProps {
  form: UseFormReturn<z.infer<typeof paymentDetailsSchema>>;
}

const PayPalFields: React.FC<PayPalFieldsProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="paypalEmail"
      render={({ field }) => (
        <FormItem>
          <FormLabel>PayPal Email</FormLabel>
          <FormControl>
            <Input placeholder="Enter PayPal email" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PayPalFields;
