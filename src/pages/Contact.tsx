import React from 'react';
import ContactInfo from '@/components/contact/ContactInfo';
import ContactForm from '@/components/contact/ContactForm';

const Contact = () => {
  return (
    <div className="container-custom py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5">
          <ContactInfo />
        </div>

        <div className="lg:col-span-7">
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default Contact;
