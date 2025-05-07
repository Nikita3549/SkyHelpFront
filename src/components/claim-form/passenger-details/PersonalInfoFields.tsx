
import React from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { passengerDetailsSchema } from "@/components/claim-form/schemas";
import { Phone, Info } from "lucide-react";
import { 
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface PersonalInfoFieldsProps {
  form: UseFormReturn<z.infer<typeof passengerDetailsSchema>>;
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
            <FormLabel className="flex items-center">
              <Phone className="mr-2 h-4 w-4" />
              Phone Number 
              <HoverCard>
                <HoverCardTrigger asChild>
                  <button className="ml-1.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-blue-100 hover:bg-blue-200 transition-colors">
                    <Info className="h-3 w-3 text-blue-700" />
                  </button>
                </HoverCardTrigger>
                <HoverCardContent className="w-80 p-4 text-sm">
                  <h4 className="font-medium mb-2">Why do we need this?</h4>
                  <p>Our goal is to help you receive the flight compensation you deserve. To do this efficiently, we may need to contact you quickly, saving you the time and effort of writing lengthy emails.</p>
                </HoverCardContent>
              </HoverCard>
            </FormLabel>
            <FormControl>
              <Input placeholder="Enter your phone number" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default PersonalInfoFields;
