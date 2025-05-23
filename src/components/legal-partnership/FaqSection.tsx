
import React from "react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    question: "How much can I earn per client?",
    answer: "Legal partners typically earn 15-25% commission on each successful claim. The exact amount depends on the claim value and partnership tier. For an average EU261 claim of €600, partners can earn between €90-150 per successful case."
  },
  {
    question: "Do I need to process the case myself?",
    answer: "No. After referring the case to SkyHelp, our team takes care of all the processing, airline communication, documentation, and customer support. You simply refer the client and we handle the rest."
  },
  {
    question: "What happens if the airline rejects the claim?",
    answer: "If an airline rejects a valid claim, our legal team will escalate the case through the appropriate channels, which may include ADR bodies or court proceedings if necessary. We handle all escalation procedures at no additional cost to you or the passenger."
  },
  {
    question: "Is this partnership exclusive?",
    answer: "No, our partnerships are non-exclusive. You can continue to work with other service providers or handle cases yourself. We believe in providing value that makes you choose to work with us."
  },
  {
    question: "How quickly are payouts processed?",
    answer: "Partner commissions are processed monthly for all successful claims closed in the previous month. Payments are typically made within the first 10 business days of each month."
  },
  {
    question: "What support do legal partners receive?",
    answer: "Partners receive access to a dedicated dashboard, marketing materials, technical support, and a personal account manager to help maximize your referrals and earnings."
  }
];

const FaqSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-custom">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about partnering with SkyHelp.
          </p>
        </motion.div>
        
        <div className="max-w-3xl mx-auto mt-12">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <AccordionItem value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-lg font-medium">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
