
import React from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { passengerDetailsSchema } from "@/components/claim-form/schemas";

interface AddressFieldsProps {
  form: UseFormReturn<z.infer<typeof passengerDetailsSchema>>;
}

const AddressFields: React.FC<AddressFieldsProps> = ({ form }) => {
  return (
    <>
      <FormField
        control={form.control}
        name="passengers"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Number of Passengers</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select number of passengers" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} {num === 1 ? 'passenger' : 'passengers'}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

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
    </>
  );
};

export default AddressFields;
