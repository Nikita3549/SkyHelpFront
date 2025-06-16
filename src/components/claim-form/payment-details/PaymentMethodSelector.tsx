import React from 'react';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { UseFormReturn } from 'react-hook-form';

interface PaymentMethodSelectorProps {
  form: UseFormReturn<any>;
}

const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  form,
}) => {
  return (
    <FormField
      control={form.control}
      name="paymentMethod"
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel>Payment Method</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              value={field.value}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              {[
                { id: 'bank_transfer', label: 'Bank Transfer' },
                { id: 'paypal', label: 'PayPal' },
                { id: 'wise', label: 'Wise / TransferWise' },
              ].map(({ id, label }) => (
                <label
                  key={id}
                  htmlFor={id}
                  className={`cursor-pointer w-full`}
                >
                  <div
                    className={`flex items-center justify-between rounded-lg border p-4 hover:bg-gray-50 transition-colors ${
                      field.value === id
                        ? 'bg-gray-50 border-primary'
                        : 'border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value={id} id={id} />
                      <span className="font-medium">{label}</span>
                    </div>
                  </div>
                </label>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PaymentMethodSelector;
