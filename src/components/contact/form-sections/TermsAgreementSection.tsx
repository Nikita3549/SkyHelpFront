import React from 'react';
import { UseFormReturn } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';

interface TermsAgreementSectionProps {}

const TermsAgreementSection: React.FC<TermsAgreementSectionProps> = ({}) => {
  return (
    // <FormField
    //   control={form.control}
    //   name="termsAgreed"
    //   render={({ field }) => (
    //     <FormItem className="flex flex-row items-start space-x-3 space-y-0">
    //       <FormControl>
    //         <Checkbox checked={field.value} onCheckedChange={field.onChange} />
    //       </FormControl>
    //       <div className="space-y-1 leading-none">
    //         <FormLabel className="font-normal text-sm">
    //           I have read and acknowledged{' '}
    //           <a href="#" className="text-primary hover:underline">
    //             Privacy Data Policy
    //           </a>{' '}
    //           and the{' '}
    //           <a href="#" className="text-primary hover:underline">
    //             Terms and conditions
    //           </a>{' '}
    //           of the website.
    //         </FormLabel>
    //         <FormMessage />
    //       </div>
    //     </FormItem>
    //   )}
    // />
    <></>
  );
};

export default TermsAgreementSection;
