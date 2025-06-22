// IssueDetailsForm.tsx
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const flightIssues = ['cancelled', 'delayed', 'overbooked'] as const;
const reasons = ['technical_issue', 'weather', 'staff_shortage'] as const;

const issueDetailsSchema = z.object({
  flightIssue: z.enum(flightIssues, {
    errorMap: () => ({ message: 'Select flight issue' }),
  }),
  reasonGivenByAirline: z.enum(reasons, {
    errorMap: () => ({ message: 'Select reason' }),
  }),
  additionalInformation: z.string().optional(),
});

export type IssueDetailsFormValues = z.infer<typeof issueDetailsSchema>;

type Props = {
  defaultValues?: IssueDetailsFormValues;
  onSubmit: (data: IssueDetailsFormValues) => void;
};

export const IssueDetailsForm = ({ defaultValues, onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<IssueDetailsFormValues>({
    resolver: zodResolver(issueDetailsSchema),
    defaultValues,
  });

  const selectedFlightIssue = watch('flightIssue');
  const selectedReason = watch('reasonGivenByAirline');

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardContent className="space-y-4 pt-6">
          <h3 className="text-sm font-medium text-gray-500 flex items-center">
            <Info className="h-4 w-4 mr-1" />
            Issue Details
          </h3>

          <div>
            <Label htmlFor="flightIssue">Flight Issue</Label>
            <Select
              value={selectedFlightIssue}
              onValueChange={(v) =>
                setValue(
                  'flightIssue',
                  v as IssueDetailsFormValues['flightIssue'],
                )
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select flight issue" />
              </SelectTrigger>
              <SelectContent>
                {flightIssues.map((issue) => (
                  <SelectItem key={issue} value={issue}>
                    {issue
                      .replace('_', ' ')
                      .replace(/^\w/, (c) => c.toUpperCase())}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.flightIssue && (
              <p className="text-sm text-red-500">
                {errors.flightIssue.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="reasonGivenByAirline">
              Reason Given by Airline
            </Label>
            <Select
              value={selectedReason}
              onValueChange={(v) =>
                setValue(
                  'reasonGivenByAirline',
                  v as IssueDetailsFormValues['reasonGivenByAirline'],
                )
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select reason" />
              </SelectTrigger>
              <SelectContent>
                {reasons.map((reason) => (
                  <SelectItem key={reason} value={reason}>
                    {reason
                      .replace('_', ' ')
                      .replace(/^\w/, (c) => c.toUpperCase())}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.reasonGivenByAirline && (
              <p className="text-sm text-red-500">
                {errors.reasonGivenByAirline.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="additionalInformation">
              Additional Information
            </Label>
            <Textarea
              id="additionalInformation"
              rows={4}
              className="resize-none"
              {...register('additionalInformation')}
            />
          </div>

          <Button type="submit" className="w-full">
            Save
          </Button>
        </CardContent>
      </Card>
    </form>
  );
};
