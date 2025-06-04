import React from 'react';
import { motion } from 'framer-motion';

import { Form } from '@/components/ui/form';
import { type ContactFormValues } from './schema';
import { useContactForm } from './hooks/useContactForm';

// Import form section components
import PersonalInfoSection from './form-sections/PersonalInfoSection';
import EmailSubjectSection from './form-sections/EmailSubjectSection';
import MessageSection from './form-sections/MessageSection';
import TermsAgreementSection from './form-sections/TermsAgreementSection';
import SubmitButtonSection from './form-sections/SubmitButtonSection';

const ContactForm = () => {
  const { form, onSubmit } = useContactForm();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-blue-50 p-8 rounded-xl"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <PersonalInfoSection form={form} />
          <EmailSubjectSection form={form} />
          <MessageSection form={form} />
          <TermsAgreementSection form={form} />
          <SubmitButtonSection />
        </form>
      </Form>
    </motion.div>
  );
};

export default ContactForm;
