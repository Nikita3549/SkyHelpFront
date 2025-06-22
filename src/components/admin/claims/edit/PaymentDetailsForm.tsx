// PaymentDetailsForm.tsx
import { z } from 'zod';
import { useFormContext, Controller } from 'react-hook-form';
import { CreditCard } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export const paymentMethods = [
  'bank_transfer',
  'paypal',
  'credit_card',
] as const;

export const paymentDetailsSchema = z.object({
  paymentMethod: z.enum(paymentMethods, {
    errorMap: () => ({ message: 'Select payment method' }),
  }),
  details: z.string().optional(),
});

export type PaymentDetailsFormValues = z.infer<typeof paymentDetailsSchema>;

export const PaymentDetailsForm = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<PaymentDetailsFormValues>();

  return (
    <Card>
      <CardContent className="space-y-4 pt-6">
        <h3 className="text-sm font-medium text-gray-500 flex items-center">
          <CreditCard className="h-4 w-4 mr-1" />
          Payment Details
        </h3>

        <div>
          <Label htmlFor="paymentMethod">Payment Method</Label>
          <Controller
            control={control}
            name="paymentMethod"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  {paymentMethods.map((method) => (
                    <SelectItem key={method} value={method}>
                      {method
                        .replace('_', ' ')
                        .replace(/^\w/, (c) => c.toUpperCase())}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.paymentMethod && (
            <p className="text-sm text-red-500">
              {errors.paymentMethod.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="details">Details</Label>
          <Textarea
            id="details"
            rows={5}
            className="resize-none"
            {...register('details')}
          />
        </div>
      </CardContent>
    </Card>
  );
};
