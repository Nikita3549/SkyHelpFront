// ClaimStatusForm.tsx
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';

const claimStatusSchema = z.object({
  status: z.enum(['pending', 'processing', 'approved', 'rejected']),
  amount: z
    .number({ invalid_type_error: 'Amount is required' })
    .min(0, 'Amount must be positive'),
  lastUpdated: z.string().min(1, 'Date is required'),
});

export type ClaimStatusFormValues = z.infer<typeof claimStatusSchema>;

type Props = {
  defaultValues?: ClaimStatusFormValues;
  onSubmit: (data: ClaimStatusFormValues) => void;
};

export const ClaimStatusForm = ({ defaultValues, onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ClaimStatusFormValues>({
    resolver: zodResolver(claimStatusSchema),
    defaultValues,
  });

  const selectedStatus = watch('status');

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardContent className="space-y-4 pt-6">
          <h3 className="text-sm font-medium text-gray-500 flex items-center">
            <AlertCircle className="h-4 w-4 mr-1" />
            Claim Status
          </h3>

          <div>
            <Label htmlFor="status">Status</Label>
            <Select
              value={selectedStatus}
              onValueChange={(value) =>
                setValue('status', value as ClaimStatusFormValues['status'])
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            {errors.status && (
              <p className="text-sm text-red-500">{errors.status.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="amount">Amount (€)</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              {...register('amount', { valueAsNumber: true })}
            />
            {errors.amount && (
              <p className="text-sm text-red-500">{errors.amount.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="lastUpdated">Last Updated</Label>
            <Input id="lastUpdated" type="date" {...register('lastUpdated')} />
            {errors.lastUpdated && (
              <p className="text-sm text-red-500">
                {errors.lastUpdated.message}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full">
            Save
          </Button>
        </CardContent>
      </Card>
    </form>
  );
};
