import React from 'react';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';

interface TermsAgreementProps {
  form: UseFormReturn<any>;
}

const TermsAgreement: React.FC<TermsAgreementProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="termsAgreed"
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-6">
          <FormControl>
            <div className="mt-1">
              <input
                type="checkbox"
                checked={field.value || false}
                onChange={(e) => field.onChange(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
            </div>
          </FormControl>
          <div className="leading-tight">
            <FormLabel className="font-normal text-sm text-gray-700">
              I agree to the{' '}
              <a
                href="#"
                className="text-primary underline hover:text-blue-600"
              >
                terms and conditions
              </a>{' '}
              and authorize FlightEaseClaim to act on my behalf to claim
              compensation from the airline.
            </FormLabel>
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
};

export default TermsAgreement;
