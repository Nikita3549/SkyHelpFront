// DetailsTab.tsx
import React from 'react';
import { z } from 'zod';
import {
  useForm,
  useFieldArray,
  SubmitHandler,
  FieldValues,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  User,
  Plane,
  AlertCircle,
  Info,
  CreditCard,
  Plus,
  X,
} from 'lucide-react';

import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

import { Claim } from '@/lib/supabase';
import ActionButtons from '../../../claims/details/ActionButtons';
import api from '@/api/axios.ts';
import { toast } from '@/components/ui/use-toast.ts';

/* -------------------------------------------------------------------------- */
/*                               ⬇ UTILITIES ⬇                               */
/* -------------------------------------------------------------------------- */

const capitalize = (str?: string | null) =>
  !str ? 'N/A' : str.replace('_', ' ').replace(/^\w/, (c) => c.toUpperCase());

/* -------------------------------------------------------------------------- */
/*                           ⬇ CUSTOMER INFO FORM ⬇                           */
/* -------------------------------------------------------------------------- */

const customerInfoSchema = z.object({
  customer: z.string().min(1, 'Required'),
  email: z.string().email('Invalid email'),
  phone: z.string().optional(),
  address: z.string().optional(),
});
type CustomerInfoValues = z.infer<typeof customerInfoSchema>;

const CustomerInfoForm = ({
  defaultValues,
  onSubmit,
}: {
  defaultValues: CustomerInfoValues;
  onSubmit: SubmitHandler<CustomerInfoValues>;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CustomerInfoValues>({
    resolver: zodResolver(customerInfoSchema),
    defaultValues,
  });

  return (
    <Card>
      <CardContent className="space-y-4 pt-6">
        <h3 className="text-sm font-medium text-gray-500 flex items-center">
          <User className="h-4 w-4 mr-1" />
          Customer Information
        </h3>

        {['customer', 'email', 'phone', 'address'].map((field) => (
          <div key={field}>
            <Label htmlFor={field}>{capitalize(field)}</Label>
            <Input
              id={field}
              {...register(field as keyof CustomerInfoValues)}
            />
            {errors[field as keyof CustomerInfoValues] && (
              <p className="text-sm text-red-500">
                {errors[field as keyof CustomerInfoValues]?.message as string}
              </p>
            )}
          </div>
        ))}

        <Button onClick={handleSubmit(onSubmit)} className="w-full">
          Save
        </Button>
      </CardContent>
    </Card>
  );
};

/* -------------------------------------------------------------------------- */
/*                            ⬇ FLIGHT INFO FORM ⬇                           */
/* -------------------------------------------------------------------------- */

const flightInfoSchema = z.object({
  airline: z.string().min(1, 'Required'),
  flightNumber: z.string().min(1, 'Required'),
  date: z.string().min(1, 'Required'),
  routes: z
    .array(
      z.object({
        departureAirport: z.string().min(1, 'Required'),
        departureIcao: z.string().min(1, 'Required'),
        arrivalAirport: z.string().min(1, 'Required'),
        arrivalIcao: z.string().min(1, 'Required'),
        troubled: z.boolean().optional(),
      }),
    )
    .min(1, 'At least one leg'),
});
type FlightInfoValues = z.infer<typeof flightInfoSchema>;

const FlightInfoForm = ({
  defaultValues,
  onSubmit,
}: {
  defaultValues: FlightInfoValues;
  onSubmit: SubmitHandler<FlightInfoValues>;
}) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FlightInfoValues>({
    resolver: zodResolver(flightInfoSchema),
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'routes',
  });

  return (
    <Card>
      <CardContent className="space-y-4 pt-6">
        <h3 className="text-sm font-medium text-gray-500 flex items-center">
          <Plane className="h-4 w-4 mr-1" />
          Flight Information
        </h3>

        <div>
          <Label htmlFor="airline">Airline</Label>
          <Input id="airline" {...register('airline')} />
          {errors.airline && (
            <p className="text-sm text-red-500">{errors.airline.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="flightNumber">Flight Number</Label>
          <Input id="flightNumber" {...register('flightNumber')} />
          {errors.flightNumber && (
            <p className="text-sm text-red-500">
              {errors.flightNumber.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="date">Date</Label>
          <Input id="date" type="date" {...register('date')} />
          {errors.date && (
            <p className="text-sm text-red-500">{errors.date.message}</p>
          )}
        </div>

        {/* ROUTES */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Flight legs</span>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() =>
                append({
                  departureAirport: '',
                  departureIcao: '',
                  arrivalAirport: '',
                  arrivalIcao: '',
                  troubled: false,
                })
              }
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {fields.map((field, idx) => (
            <div
              key={field.id}
              className="grid grid-cols-2 gap-2 border p-3 rounded-lg"
            >
              <div>
                <Label>Departure Airport</Label>
                <Input {...register(`routes.${idx}.departureAirport`)} />
              </div>
              <div>
                <Label>Departure ICAO</Label>
                <Input {...register(`routes.${idx}.departureIcao`)} />
              </div>
              <div>
                <Label>Arrival Airport</Label>
                <Input {...register(`routes.${idx}.arrivalAirport`)} />
              </div>
              <div className="flex items-end gap-2">
                <div className="flex-1">
                  <Label>Arrival ICAO</Label>
                  <Input {...register(`routes.${idx}.arrivalIcao`)} />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => remove(idx)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="col-span-2">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    {...register(`routes.${idx}.troubled`)}
                  />
                  Troubled
                </label>
              </div>
            </div>
          ))}

          {errors.routes && (
            <p className="text-sm text-red-500">
              {errors.routes.message as string}
            </p>
          )}
        </div>

        <Button onClick={handleSubmit(onSubmit)} className="w-full">
          Save
        </Button>
      </CardContent>
    </Card>
  );
};

/* -------------------------------------------------------------------------- */
/*                           ⬇ CLAIM STATUS FORM ⬇                           */
/* -------------------------------------------------------------------------- */

const claimStatusSchema = z.object({
  status: z.enum([
    'completed',
    'pending',
    'in_progress',
    'escalated',
    'rejected',
    'not_eligible',
  ]),
  amount: z.number().min(0, 'Amount must be positive'),
  lastUpdated: z.string().min(1, 'Required'),
});
type ClaimStatusValues = z.infer<typeof claimStatusSchema>;

const ClaimStatusForm = ({
  defaultValues,
  onSubmit,
}: {
  defaultValues: ClaimStatusValues;
  onSubmit: SubmitHandler<ClaimStatusValues>;
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ClaimStatusValues>({
    resolver: zodResolver(claimStatusSchema),
    defaultValues,
  });

  const statuses = [
    'completed',
    'pending',
    'in_progress',
    'escalated',
    'rejected',
    'not_eligible',
  ] as const;

  return (
    <Card>
      <CardContent className="space-y-4 pt-6">
        <h3 className="text-sm font-medium text-gray-500 flex items-center">
          <AlertCircle className="h-4 w-4 mr-1" />
          Claim Status
        </h3>

        <div>
          <Label>Status</Label>
          <Select
            value={watch('status')}
            onValueChange={(v) =>
              setValue('status', v as ClaimStatusValues['status'])
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              {statuses.map((s) => (
                <SelectItem key={s} value={s}>
                  {capitalize(s)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.status && (
            <p className="text-sm text-red-500">{errors.status.message}</p>
          )}
        </div>

        <div>
          <Label>Amount (€)</Label>
          <Input
            type="number"
            step="0.01"
            {...register('amount', { valueAsNumber: true })}
          />
          {errors.amount && (
            <p className="text-sm text-red-500">{errors.amount.message}</p>
          )}
        </div>

        {/*<div>*/}
        {/*  <Label>Last Updated</Label>*/}
        {/*  <Input type="date" {...register('lastUpdated')} />*/}
        {/*  {errors.lastUpdated && (*/}
        {/*    <p className="text-sm text-red-500">{errors.lastUpdated.message}</p>*/}
        {/*  )}*/}
        {/*</div>*/}

        <Button onClick={handleSubmit(onSubmit)} className="w-full">
          Save
        </Button>
      </CardContent>
    </Card>
  );
};

/* -------------------------------------------------------------------------- */
/*                          ⬇ ISSUE DETAILS FORM ⬇                           */
/* -------------------------------------------------------------------------- */
const issueDetailsSchema = z.object({
  flightIssue: z.enum([
    'denied_boarding',
    'cancellation',
    'delay',
    'missed_connection',
  ]),
  reasonGivenByAirline: z.enum([
    'technical_problems',
    'weather',
    'strike',
    'issues',
    'other',
    'dont_remember',
  ]),
  additionalInformation: z.string().optional(),
});
type IssueDetailsValues = z.infer<typeof issueDetailsSchema>;

const IssueDetailsForm = ({
  defaultValues,
  onSubmit,
}: {
  defaultValues: IssueDetailsValues;
  onSubmit: SubmitHandler<IssueDetailsValues>;
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<IssueDetailsValues>({
    resolver: zodResolver(issueDetailsSchema),
    defaultValues,
  });

  return (
    <Card>
      <CardContent className="space-y-4 pt-6">
        <h3 className="text-sm font-medium text-gray-500 flex items-center">
          <Info className="h-4 w-4 mr-1" />
          Issue Details
        </h3>

        <div>
          <Label>Flight Issue</Label>
          <Select
            value={watch('flightIssue')}
            onValueChange={(v) =>
              setValue('flightIssue', v as IssueDetailsValues['flightIssue'])
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select issue" />
            </SelectTrigger>
            <SelectContent>
              {[
                'denied_boarding',
                'cancellation',
                'delay',
                'missed_connection',
              ].map((i) => (
                <SelectItem key={i} value={i}>
                  {capitalize(i)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.flightIssue && (
            <p className="text-sm text-red-500">{errors.flightIssue.message}</p>
          )}
        </div>

        <div>
          <Label>Reason Given by Airline</Label>
          <Select
            value={watch('reasonGivenByAirline')}
            onValueChange={(v) =>
              setValue(
                'reasonGivenByAirline',
                v as IssueDetailsValues['reasonGivenByAirline'],
              )
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select reason" />
            </SelectTrigger>
            <SelectContent>
              {[
                'technical_problems',
                'weather',
                'strike',
                'issues',
                'other',
                'dont_remember',
              ].map((r) => (
                <SelectItem key={r} value={r}>
                  {capitalize(r)}
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
          <Label>Additional Information</Label>
          <Textarea
            rows={4}
            {...register('additionalInformation')}
            className="resize-none"
          />
        </div>

        <Button onClick={handleSubmit(onSubmit)} className="w-full">
          Save
        </Button>
      </CardContent>
    </Card>
  );
};

/* -------------------------------------------------------------------------- */
/*                          ⬇ PAYMENT DETAILS FORM ⬇                          */
/* -------------------------------------------------------------------------- */

const paymentDetailsSchema = z.object({
  paymentMethod: z.enum(['bank_transfer', 'paypal', 'wise']),
  details: z.string().optional(),
});
type PaymentDetailsValues = z.infer<typeof paymentDetailsSchema>;

const PaymentDetailsForm = ({
  defaultValues,
  onSubmit,
}: {
  defaultValues: PaymentDetailsValues;
  onSubmit: SubmitHandler<PaymentDetailsValues>;
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = useForm<PaymentDetailsValues>({
    resolver: zodResolver(paymentDetailsSchema),
    defaultValues,
  });

  const paymentMethod = watch('paymentMethod');

  const handleFinalSubmit = () => {
    const raw = getValues();

    let details: Record<string, string> = {};
    const formData = new FormData(
      document.querySelector('form#payment-details')!,
    );

    switch (raw.paymentMethod) {
      case 'bank_transfer':
        details = {
          bankName: formData.get('bankName') as string,
          accountName: formData.get('accountName') as string,
          iban: formData.get('iban') as string,
          accountNumber: formData.get('accountNumber') as string,
        };
        break;
      case 'paypal':
        details = {
          paypalEmail: formData.get('paypalEmail') as string,
        };
        break;
      case 'wise':
        details = {
          accountName: formData.get('accountName') as string,
          iban: formData.get('iban') as string,
          email: formData.get('email') as string,
        };
        break;
    }

    onSubmit({
      ...raw,
      ...details,
    });
  };

  const parsedDetails: Record<string, any> =
    typeof defaultValues.details === 'object' && defaultValues.details !== null
      ? defaultValues.details
      : {};

  const renderDetailsFields = () => {
    switch (paymentMethod) {
      case 'bank_transfer':
        return (
          <>
            <div>
              <Label>Bank Name</Label>
              <Input
                name="bankName"
                defaultValue={parsedDetails.bankName || ''}
              />
            </div>
            <div>
              <Label>Account Name</Label>
              <Input
                name="accountName"
                defaultValue={parsedDetails.accountName || ''}
              />
            </div>
            <div>
              <Label>IBAN</Label>
              <Input name="iban" defaultValue={parsedDetails.iban || ''} />
            </div>
            <div>
              <Label>Account Number</Label>
              <Input
                name="accountNumber"
                defaultValue={parsedDetails.accountNumber || ''}
              />
            </div>
          </>
        );
      case 'paypal':
        return (
          <div>
            <Label>PayPal Email</Label>
            <Input
              name="paypalEmail"
              type="email"
              defaultValue={parsedDetails.paypalEmail || ''}
            />
          </div>
        );
      case 'wise':
        return (
          <>
            <div>
              <Label>Account Name</Label>
              <Input
                name="accountName"
                defaultValue={parsedDetails.accountName || ''}
              />
            </div>
            <div>
              <Label>IBAN</Label>
              <Input name="iban" defaultValue={parsedDetails.iban || ''} />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                name="email"
                type="email"
                defaultValue={parsedDetails.email || ''}
              />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardContent className="space-y-4 pt-6">
        <h3 className="text-sm font-medium text-gray-500 flex items-center">
          <CreditCard className="h-4 w-4 mr-1" />
          Payment Details
        </h3>

        <div>
          <Label>Payment Method</Label>
          <Select
            value={paymentMethod}
            onValueChange={(v) =>
              setValue(
                'paymentMethod',
                v as PaymentDetailsValues['paymentMethod'],
              )
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select method" />
            </SelectTrigger>
            <SelectContent>
              {['bank_transfer', 'paypal', 'wise'].map((m) => (
                <SelectItem key={m} value={m}>
                  {capitalize(m)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.paymentMethod && (
            <p className="text-sm text-red-500">
              {errors.paymentMethod.message}
            </p>
          )}
        </div>

        <form id="payment-details" className="space-y-2">
          {renderDetailsFields()}
        </form>

        <Button onClick={handleFinalSubmit} className="w-full">
          Save
        </Button>
      </CardContent>
    </Card>
  );
};

/* -------------------------------------------------------------------------- */
/*                             ⬇ MAIN COMPONENT ⬇                            */
/* -------------------------------------------------------------------------- */

type DetailsTabProps = {
  claim: Claim;
  onSendEmail: () => void;
  onUpdateStatus: () => void;
  onEdit: () => void;
  onMarkNotEligible: () => void;
  onUpdateClaim?: (updates: Partial<Claim>) => void;
};

const DetailsTab = ({
  claim,
  onSendEmail,
  onUpdateStatus,
  onEdit,
  onMarkNotEligible,
  onUpdateClaim,
}: DetailsTabProps) => {
  /* helper to push partial updates up */
  const handleUpdate = async (
    updates: FieldValues,
    source: 'customer' | 'flight' | 'status' | 'issue' | 'payment',
  ) => {
    console.log(updates);

    switch (source) {
      case 'customer':
        await api.put(`/claims/customer/admin/${claim.id}`, {
          ...updates,
          firstName: updates.customer.split(' ')[0],
          lastName: updates.customer.split(' ')[1],
        });
        break;
      case 'flight':
        await api.put(`/claims/details/admin/${claim.id}`, {
          ...updates,
          routes: [...updates.routes],
        });
        break;
      case 'status':
        await api.put(`/claims/state/admin/${claim.id}`, {
          ...updates,
          status: updates.status.toUpperCase(),
        });
        break;
      case 'issue':
        await api.put(`/claims/issue/admin/${claim.id}`, {
          ...updates,
        });
        break;
      case 'payment':
        await api.put(`/claims/payment/admin/${claim.id}`, {
          ...updates,
        });
        break;
    }

    toast({
      title: 'Success',
      description: 'Successfully updated',
    });
    // if (onUpdateClaim) onUpdateClaim(updates as Partial<Claim>);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <CustomerInfoForm
          defaultValues={{
            customer: claim.customer,
            email: claim.email,
            phone: claim.phone ?? '',
            address: claim.address ?? '',
          }}
          onSubmit={(u) => {
            handleUpdate(u, 'customer');
          }}
        />

        <FlightInfoForm
          defaultValues={{
            airline: claim.airline,
            flightNumber: claim.flightnumber,
            date: claim.date,
            routes:
              claim.routes?.map((r) => ({
                departureAirport: r.DepartureAirport?.name,
                departureIcao: r.DepartureAirport?.icao,
                arrivalAirport: r.ArrivalAirport?.name,
                arrivalIcao: r.ArrivalAirport?.icao,
                troubled: r.troubled,
              })) ?? [],
          }}
          onSubmit={(u) => {
            handleUpdate(u, 'flight');
          }}
        />

        <ClaimStatusForm
          defaultValues={{
            status: claim.status as ClaimStatusValues['status'],
            amount: +claim.amount,
            lastUpdated: new Date(claim.lastupdated).toISOString().slice(0, 10),
          }}
          onSubmit={(u) => {
            handleUpdate(u, 'status');
          }}
        />
      </div>

      <Separator className="my-6" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <IssueDetailsForm
          defaultValues={{
            flightIssue: claim.flightissue as IssueDetailsValues['flightIssue'],
            reasonGivenByAirline:
              claim.reasongivenbyairline as IssueDetailsValues['reasonGivenByAirline'],
            additionalInformation: claim.additionalinformation ?? '',
          }}
          onSubmit={(u) => {
            handleUpdate(u, 'issue');
          }}
        />

        <PaymentDetailsForm
          defaultValues={{
            paymentMethod:
              claim.paymentmethod as PaymentDetailsValues['paymentMethod'],
            details: claim.paymentdetails ?? '',
          }}
          onSubmit={(u) => {
            handleUpdate(u, 'payment');
          }}
        />
      </div>

      <Separator className="my-6" />

      {/*<ActionButtons*/}
      {/*  onSendEmail={onSendEmail}*/}
      {/*  onUpdateStatus={onUpdateStatus}*/}
      {/*  onEdit={onEdit}*/}
      {/*  onMarkNotEligible={onMarkNotEligible}*/}
      {/*/>*/}
    </>
  );
};

export default DetailsTab;
