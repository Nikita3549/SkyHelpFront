
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { User, Phone, Mail, MessageSquare, Clock } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(1, "Phone number is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message should be at least 10 characters"),
  termsAgreed: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and privacy policy",
  }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const Contact = () => {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      subject: "",
      message: "",
      termsAgreed: false,
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    console.log("Form submitted:", data);
    toast.success("Your message has been sent! We'll get back to you soon.");
    form.reset();
  };

  return (
    <div className="container-custom py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div>
              <h1 className="text-4xl font-bold mb-2">
                <span className="text-green-500">Contact</span> form
              </h1>
              <h2 className="text-2xl font-medium text-gray-700 mb-6">
                HIT US WITH A MESSAGE
              </h2>
              <p className="text-gray-600">
                Alternatively, you can use the following contact form to
                send us a message. One of our operators will get in touch
                with you regarding the information you need.
              </p>
            </div>

            <div className="space-y-4 mt-8">
              <div className="flex items-center space-x-3 text-gray-700">
                <Mail className="w-5 h-5 text-primary" />
                <span>support@cleverclaim.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-700">
                <Phone className="w-5 h-5 text-primary" />
                <span>+44 123 456 7890</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-700">
                <Clock className="w-5 h-5 text-primary" />
                <span>Monday - Friday, 9:00 - 17:00</span>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-blue-50 p-8 rounded-xl"
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Name and surname <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <Input 
                              placeholder="John Doe" 
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
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Phone number <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <Input 
                              placeholder="+40 770770770" 
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

                <FormField
                  control={form.control}
                  name="termsAgreed"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="font-normal text-sm">
                          I have read and acknowledged{" "}
                          <a href="#" className="text-green-500 hover:underline">
                            Privacy Data Policy
                          </a>{" "}
                          and the{" "}
                          <a href="#" className="text-green-500 hover:underline">
                            Terms and conditions
                          </a>{" "}
                          of the website.
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full md:w-auto md:ml-auto md:block bg-green-500 hover:bg-green-600 text-white py-3 px-8 rounded-md font-medium"
                >
                  Send your message
                </Button>
              </form>
            </Form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
