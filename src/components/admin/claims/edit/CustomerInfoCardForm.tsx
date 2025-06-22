import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { User } from 'lucide-react';

export const customerInfoSchema = z.object({
  customer: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().optional().or(z.literal('')),
  address: z.string().optional().or(z.literal('')),
});

export type CustomerInfoFormValues = z.infer<typeof customerInfoSchema>;

type Props = {
  defaultValues?: CustomerInfoFormValues;
  onSubmit: (values: CustomerInfoFormValues) => void;
};

export const CustomerInfoForm = ({ defaultValues, onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CustomerInfoFormValues>({
    resolver: zodResolver(customerInfoSchema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardContent className="space-y-4 pt-6">
          <h3 className="text-sm font-medium text-gray-500 flex items-center">
            <User className="h-4 w-4 mr-1" />
            Customer Information
          </h3>

          <div>
            <Label htmlFor="customer">Name</Label>
            <Input id="customer" {...register('customer')} />
            {errors.customer && (
              <p className="text-sm text-red-500">{errors.customer.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...register('email')} />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" {...register('phone')} />
            {errors.phone && (
              <p className="text-sm text-red-500">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="address">Address</Label>
            <Input id="address" {...register('address')} />
            {errors.address && (
              <p className="text-sm text-red-500">{errors.address.message}</p>
            )}
          </div>
        </CardContent>
      </Card>
    </form>
  );
};
