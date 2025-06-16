import React, { useState } from 'react';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Phone, Info, MessageSquare } from 'lucide-react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import PhoneInput from './passenger-details/PhoneInput';
import CountrySelect from '@/components/claim-form/passenger-details/CountrySelect.tsx';
import NavigationButtons from './passenger-details/NavigationButtons';
import { IClaimForm } from '@/components/claim-form/interfaces/claim-form.interface.ts';
import { motion } from 'framer-motion';
import { AnimationTransitions } from '@/components/claim-form/types.ts';
import { useClaimJwt } from '@/hooks/useClaimJwt.ts';
import api from '@/api/axios.ts';
import { AxiosResponse } from 'axios';
import { toast } from '@/components/ui/use-toast.ts';

const claimFormSchema = z.object({
  firstName: z.string().min(1, 'Required'),
  lastName: z.string().min(1, 'Required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(6, 'Invalid phone'),
  address: z.string().min(1, 'Required'),
  addressLine2: z.string().optional(),
  city: z.string().min(1, 'Required'),
  postalCode: z.string().min(1, 'Required'),
  state: z.string().optional(),
  country: z.string().min(1, 'Required'),
  whatsappNotifications: z.boolean().optional(),
});

type ClaimFormData = z.infer<typeof claimFormSchema>;

interface PassengerDetailsStepProps {
  setStep: (step: number) => void;
  newForm: IClaimForm;
  setNewForm: (value: IClaimForm) => void;
  transitions: AnimationTransitions;
}

const PassengerDetailsStep: React.FC<PassengerDetailsStepProps> = ({
  setStep,
  newForm,
  setNewForm,
  transitions,
}) => {
  console.log(newForm);
  const { setClaimJwt } = useClaimJwt();
  const [loading, setLoading] = useState<boolean>(false);
  const customer = newForm.customer;
  const form = useForm<ClaimFormData>({
    resolver: zodResolver(claimFormSchema),
    defaultValues: {
      firstName: customer?.firstName || '',
      lastName: customer?.lastName || '',
      email: customer?.email || '',
      phone: customer?.phone || '',
      address: customer?.address || '',
      addressLine2: customer?.secondAddress || '',
      city: customer?.city || '',
      postalCode: customer?.postalCode || '',
      state: customer?.state || '',
      country: customer?.country || '',
      whatsappNotifications: customer?.whatsapp || false,
    },
  });

  const onBack = () => {
    setStep(3);
    console.log('back');
  };

  const onSubmit: SubmitHandler<ClaimFormData> = async (data) => {
    setLoading(true);

    const res: AxiosResponse = await api
      .post('/claims', {
        details: {
          routes: newForm.details.routes,
          flightNumber: newForm.details.flightNumber,
          date: newForm.details.date,
          airline: {
            icao: newForm.details.airline.icao,
            name: newForm.details.airline.name,
            city: newForm.details.airline.city,
            country: newForm.details.airline.country,
          },
        },
        state: {
          amount: newForm.state.amount,
        },
        customer: {
          ...data,
          whatsapp: data.whatsappNotifications,
          secondAddress: data.addressLine2,
        },
        issue: {
          ...newForm.issue,
        },
      })
      .catch((e) => {
        toast({
          title: 'Unexpected error',
          description: 'Please try again',
          variant: 'destructive',
        });
        console.error(e);
        throw e;
      })
      .finally(() => {
        setLoading(false);
      });

    setNewForm({
      ...newForm,
      id: res.data.claimData.id,
      state: {
        ...res.data.claimData.state,
      },
      //@ts-ignore
      customer: {
        ...data,
        whatsapp: data.whatsappNotifications,
        secondAddress: data.addressLine2,
      },
    });
    setClaimJwt(res.data.jwt);
    setStep(4.5);
  };

  return (
    <motion.div
      key="step2"
      initial={transitions.initial}
      animate={transitions.animate}
      exit={transitions.exit}
      transition={transitions.transition}
    >
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Passenger Details</h2>
        <p className="text-gray-600">
          Please provide your contact information so we can process your claim.
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* First Name */}
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your first name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Last Name */}
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your last name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center space-x-1.5">
                  <Phone className="h-4 w-4" />
                  <FormLabel className="m-0">Phone Number</FormLabel>
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <button
                        type="button"
                        className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-blue-100 hover:bg-blue-200 transition-colors"
                      >
                        <Info className="h-3 w-3 text-blue-700" />
                      </button>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80 p-4 text-sm">
                      <h4 className="font-medium mb-2">Why do we need this?</h4>
                      <p>
                        Our goal is to help you receive the flight compensation
                        you deserve. To do this efficiently, we may need to
                        contact you quickly, saving you the time and effort of
                        writing lengthy emails.
                      </p>
                    </HoverCardContent>
                  </HoverCard>
                </div>
                <FormControl>
                  <PhoneInput
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Enter your phone number"
                    defaultCountry={form.getValues().country || 'US'}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Address */}
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

          {/* Address Line 2 */}
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

          {/* City */}
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

          {/* Postal Code */}
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

          {/* State */}
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

          {/* Country */}
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <CountrySelect
                  value={field.value}
                  onValueChange={(val) => {
                    field.onChange(val);
                  }}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          {/* WhatsApp Notifications */}
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

          {/* Disclaimer */}
          <div className="md:col-span-2 bg-blue-50 border border-blue-100 p-4 rounded-md">
            <p className="text-sm text-blue-800">
              <strong>Disclaimer:</strong> An early submission can increase your
              chances of getting your compensation. More than half of early
              submissions are compensated in the same month.
            </p>
          </div>

          {/* Submit */}
          <div className="md:col-span-2">
            <NavigationButtons onBack={onBack} isSubmitting={loading} />
          </div>
        </form>
      </Form>
    </motion.div>
  );
};

export default PassengerDetailsStep;
