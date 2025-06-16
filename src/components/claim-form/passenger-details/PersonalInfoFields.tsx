import React from 'react';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Phone, Info } from 'lucide-react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import PhoneInput from './PhoneInput';
import { UseFormReturn } from 'react-hook-form';

interface PersonalInfoFieldsProps {
  form: UseFormReturn<any>;
}

const PersonalInfoFields: React.FC<PersonalInfoFieldsProps> = ({ form }) => {
  return (
    <>
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

      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email Address</FormLabel>
            <FormControl>
              <Input type="email" placeholder="Enter your email" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

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
                    Our goal is to help you receive the flight compensation you
                    deserve. To do this efficiently, we may need to contact you
                    quickly, saving you the time and effort of writing lengthy
                    emails.
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
    </>
  );
};

export default PersonalInfoFields;
