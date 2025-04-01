
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { contactFormSchema, type ContactFormValues } from "../schema";

export function useContactForm() {
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

  return {
    form,
    onSubmit,
  };
}
