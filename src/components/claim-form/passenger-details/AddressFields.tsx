
import React from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { passengerDetailsSchema } from "@/components/claim-form/schemas";
import { MessageSquare } from "lucide-react";
import CountrySelect from "./CountrySelect";

interface AddressFieldsProps {
  form: UseFormReturn<z.infer<typeof passengerDetailsSchema>>;
}

const AddressFields: React.FC<AddressFieldsProps> = ({ form }) => {
  return (
    <>
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
      
      <FormField
        control={form.control}
        name="addressLine2"
        render={({ field }) => (
          <FormItem className="md:col-span-2">
            <FormLabel>Address Line 2 (Optional)</FormLabel>
            <FormControl>
              <Input placeholder="Apartment, suite, etc." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="city"
        render={({ field }) => (
          <FormItem>
            <FormLabel>City</FormLabel>
            <FormControl>
              <Input placeholder="Enter your city" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="postalCode"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Postal Code</FormLabel>
            <FormControl>
              <Input placeholder="Enter your postal code" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="state"
        render={({ field }) => (
          <FormItem>
            <FormLabel>State (Optional)</FormLabel>
            <FormControl>
              <Input placeholder="Enter your state" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="country"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Country</FormLabel>
            <CountrySelect 
              value={field.value} 
              onValueChange={field.onChange} 
            />
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="whatsappNotifications"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 md:col-span-2">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel className="flex items-center">
                <MessageSquare className="mr-2 h-4 w-4" />
                Receive notifications on WhatsApp
              </FormLabel>
              <FormDescription>
                Get updates about your claim via WhatsApp
              </FormDescription>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <div className="md:col-span-2 bg-blue-50 border border-blue-100 p-4 rounded-md">
        <p className="text-sm text-blue-800">
          <strong>Disclaimer:</strong> An early submission can increase your chances of getting your compensation. 
          More than half of early submissions are compensated in the same month.
        </p>
      </div>
    </>
  );
};

export default AddressFields;
