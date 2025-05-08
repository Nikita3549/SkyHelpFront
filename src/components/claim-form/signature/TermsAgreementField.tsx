
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { signatureSchema } from "@/components/claim-form/schemas";

interface TermsAgreementFieldProps {
  form: UseFormReturn<z.infer<typeof signatureSchema>>;
}

const TermsAgreementField: React.FC<TermsAgreementFieldProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="termsAgreed"
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-5">
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
              id="termsAgreed"
            />
          </FormControl>
          <div className="leading-tight">
            <label
              htmlFor="termsAgreed"
              className="text-sm font-medium text-gray-700 cursor-pointer"
            >
              By signing you agree to{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Terms and Conditions
              </a>{" "}
              and{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Price List
              </a>
              , and you authorize us to show your signature on the{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Assignment Agreement
              </a>
              .
            </label>
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
};

export default TermsAgreementField;
