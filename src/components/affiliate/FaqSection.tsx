import React from 'react';
import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const FaqSection: React.FC<{ reference: React.RefObject<HTMLDivElement> }> = ({
  reference,
}) => {
  const faqs = [
    {
      question: 'How does the affiliate program work?',
      answer:
        'Our affiliate program works on a revenue-sharing model. You get a unique affiliate link to share with your audience. When someone clicks your link and successfully files a claim with SkyHelp, you earn 25% of our commission once the claim is approved and paid.',
    },
    {
      question: 'How much can I earn?',
      answer:
        'Your earnings depend on how many people you refer who file successful claims. On average, you can earn €25 per successful claim. Some partners earn €250+ monthly by referring just 10 successful claims.',
    },
    {
      question: 'When do I get paid?',
      answer:
        'Payments are processed once a month, typically on the 15th of each month. We pay you for all successful claims that were completed in the previous month. Payment methods include bank transfer, PayPal, and Wise.',
    },
    {
      question: 'Are there any country restrictions?',
      answer:
        'Our affiliate program is open to partners from most countries worldwide. However, due to regulatory restrictions, we currently cannot accept affiliates from sanctioned countries. Please contact our support team for specific country information.',
    },
    {
      question: 'Do I need a website to join the program?',
      answer:
        "No, you don't need a website. You can share your affiliate link on social media, in messaging apps, email newsletters, or any other channel where you communicate with your audience.",
    },
  ];

  return (
    <section ref={reference} id="faq" className="py-20 bg-gray-50">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-bold mb-4"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-600"
          >
            Find answers to common questions about our affiliate program
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white rounded-lg shadow-sm px-4"
              >
                <AccordionTrigger className="text-left font-medium py-4 hover:text-primary focus:text-primary focus:outline-none">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FaqSection;
