
import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Check } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

// Schema definition moved to a separate file
import { paymentDetailsSchema } from "@/components/claim-form/schemas";

interface PaymentDetailsStepProps {
  form: UseFormReturn<z.infer<typeof paymentDetailsSchema>>;
  onSubmit: (data: z.infer<typeof paymentDetailsSchema>) => void;
  onBack: () => void;
  transitions: {
    initial: object;
    animate: object;
    exit: object;
    transition: object;
  };
}

const PaymentDetailsStep: React.FC<PaymentDetailsStepProps> = ({
  form,
  onSubmit,
  onBack,
  transitions,
}) => {
  return (
    <motion.div
      key="step4"
      initial={transitions.initial}
      animate={transitions.animate}
      exit={transitions.exit}
      transition={transitions.transition}
    >
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Payment Details</h2>
        <p className="text-gray-600">
          Please provide your payment details for receiving the compensation.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="paymentMethod"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Payment Method</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4"
                  >
                    <div className="flex items-center justify-between rounded-lg border p-4 cursor-pointer hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="bank_transfer" id="bank_transfer" />
                        <label htmlFor="bank_transfer" className="cursor-pointer font-medium">Bank Transfer</label>
                      </div>
                    </div>

                    <div className="flex items-center justify-between rounded-lg border p-4 cursor-pointer hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="paypal" id="paypal" />
                        <label htmlFor="paypal" className="cursor-pointer font-medium">PayPal</label>
                      </div>
                    </div>

                    <div className="flex items-center justify-between rounded-lg border p-4 cursor-pointer hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="wise" id="wise" />
                        <label htmlFor="wise" className="cursor-pointer font-medium">Wise / TransferWise</label>
                      </div>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {form.watch("paymentMethod") === "bank_transfer" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="bankName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bank Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter bank name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="accountName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account Holder Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter account holder name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="iban"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>IBAN</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter IBAN" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="accountNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter account number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          {form.watch("paymentMethod") === "paypal" && (
            <FormField
              control={form.control}
              name="paypalEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>PayPal Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter PayPal email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="termsAgreed"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-6">
                <FormControl>
                  <div className="mt-1">
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={field.onChange}
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                  </div>
                </FormControl>
                <div className="leading-tight">
                  <FormLabel className="font-normal text-sm text-gray-700">
                    I agree to the{" "}
                    <a href="#" className="text-primary underline hover:text-blue-600">
                      terms and conditions
                    </a>{" "}
                    and authorize FlightEaseClaim to act on my behalf to claim compensation from the airline.
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <div className="bg-blue-50 rounded-lg p-4 text-sm text-blue-700">
            <p className="font-medium mb-2">Here's what happens next:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>We'll review your claim details and may contact you for additional information.</li>
              <li>We'll submit your claim to the airline and negotiate on your behalf.</li>
              <li>Once compensation is received, we'll transfer it to your specified payment method.</li>
              <li>Our service fee (25% + VAT) will be deducted from the compensation amount.</li>
            </ul>
          </div>

          <div className="pt-4 flex justify-between items-center">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onBack}
              className="flex items-center"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>

            <Button type="submit">
              Submit Claim
              <Check className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </Form>
    </motion.div>
  );
};

export default PaymentDetailsStep;
