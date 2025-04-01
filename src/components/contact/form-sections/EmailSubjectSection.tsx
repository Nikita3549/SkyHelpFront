
import React from "react";
import { Mail, MessageSquare } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ContactFormValues } from "../schema";

interface EmailSubjectSectionProps {
  form: UseFormReturn<ContactFormValues>;
}

const EmailSubjectSection: React.FC<EmailSubjectSectionProps> = ({ form }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              E-mail address <span className="text-red-500">*</span>
            </FormLabel>
            <FormControl>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input 
                  placeholder="johndoe@gmail.com" 
                  className="pl-10" 
                  {...field} 
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="subject"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Subject</FormLabel>
            <FormControl>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input 
                  placeholder="Subject" 
                  className="pl-10" 
                  {...field} 
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default EmailSubjectSection;
