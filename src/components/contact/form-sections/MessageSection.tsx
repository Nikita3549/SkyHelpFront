
import React from "react";
import { MessageSquare } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { ContactFormValues } from "../schema";

interface MessageSectionProps {
  form: UseFormReturn<ContactFormValues>;
}

const MessageSection: React.FC<MessageSectionProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="message"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Your message</FormLabel>
          <FormControl>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Textarea 
                placeholder="Type your message here..." 
                className="min-h-[180px] pl-10" 
                {...field} 
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default MessageSection;
