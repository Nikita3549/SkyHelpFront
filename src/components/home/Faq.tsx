
import React from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface FaqProps {
  faqRef: React.RefObject<HTMLDivElement>;
  faqs: {
    question: string;
    answer: string;
  }[];
}

const Faq = ({ faqRef, faqs }: FaqProps) => {
  return (
    <section ref={faqRef} id="faq" className="py-20 bg-gray-50">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600">
              Everything you need to know about flight compensation and our services.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-2 md:p-6"
          >
            <Accordion type="single" collapsible className="space-y-2">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border border-gray-100 rounded-lg px-4 py-2 mb-2">
                  <AccordionTrigger className="text-left font-medium hover:text-primary hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 pt-2 pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 text-center"
          >
            <p className="text-gray-600 mb-4">Still have questions?</p>
            <a 
              href="mailto:support@cleverclaim.com" 
              className="text-primary hover:text-blue-600 font-medium flex items-center justify-center transition-colors"
            >
              Contact our support team
              <ChevronRight className="h-4 w-4 ml-1" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
