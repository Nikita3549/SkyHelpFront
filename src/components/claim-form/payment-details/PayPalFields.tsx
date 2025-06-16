import React from 'react';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';

interface PayPalFieldsProps {
  form: UseFormReturn<any>; // или конкретный тип формы
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
            <Input placeholder="Enter PayPal email" type="email" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PayPalFields;
