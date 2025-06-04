import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  phone: z.string().min(1, 'Phone number is required'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(10, 'Message should be at least 10 characters'),
  termsAgreed: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the terms and privacy policy',
  }),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
