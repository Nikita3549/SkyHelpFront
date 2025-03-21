
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
              <div className="flex items-center justify-between rounded-lg border p-4 cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="bank_transfer" id="bank_transfer" />
                  <label htmlFor="bank_transfer" className="cursor-pointer font-medium">Bank Transfer</label>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-lg border p-4 cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="paypal" id="paypal" />
                  <label htmlFor="paypal" className="cursor-pointer font-medium">PayPal</label>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-lg border p-4 cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="wise" id="wise" />
                  <label htmlFor="wise" className="cursor-pointer font-medium">Wise / TransferWise</label>
                </div>
              </div>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PaymentMethodSelector;
