
import React from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { paymentDetailsSchema } from "@/components/claim-form/schemas";

interface PaymentMethodSelectorProps {
  form: UseFormReturn<z.infer<typeof paymentDetailsSchema>>;
}

const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({ form }) => {
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
              defaultValue={field.value}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              {/* Use label wrappers around the entire div to make the whole card clickable */}
              <label htmlFor="bank_transfer" className="cursor-pointer w-full">
                <div className={`flex items-center justify-between rounded-lg border p-4 hover:bg-gray-50 transition-colors ${field.value === 'bank_transfer' ? 'bg-gray-50 border-primary' : ''}`}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="bank_transfer" id="bank_transfer" />
                    <span className="font-medium">Bank Transfer</span>
                  </div>
                </div>
              </label>

              <label htmlFor="paypal" className="cursor-pointer w-full">
                <div className={`flex items-center justify-between rounded-lg border p-4 hover:bg-gray-50 transition-colors ${field.value === 'paypal' ? 'bg-gray-50 border-primary' : ''}`}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="paypal" id="paypal" />
                    <span className="font-medium">PayPal</span>
                  </div>
                </div>
              </label>

              <label htmlFor="wise" className="cursor-pointer w-full">
                <div className={`flex items-center justify-between rounded-lg border p-4 hover:bg-gray-50 transition-colors ${field.value === 'wise' ? 'bg-gray-50 border-primary' : ''}`}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="wise" id="wise" />
                    <span className="font-medium">Wise / TransferWise</span>
                  </div>
                </div>
              </label>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PaymentMethodSelector;
