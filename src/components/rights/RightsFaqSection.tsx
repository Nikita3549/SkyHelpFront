
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export interface FaqItem {
  question: string;
  answer: React.ReactNode;
}

interface RightsFaqSectionProps {
  faqs: FaqItem[];
  title?: string;
  className?: string;
  id?: string; // Added id prop
}

/**
 * Reusable FAQ component with accordion for rights pages
 */
const RightsFaqSection = ({ 
  faqs, 
  title = "Frequently Asked Questions", 
  className = "",
  id = "faq" // Default to "faq" if not provided
}: RightsFaqSectionProps) => {
  return (
    <div className={className} id={id}>
      {title && <h2 className="text-2xl font-bold mt-8 mb-4 scroll-mt-24">{title}</h2>}
      <Accordion type="single" collapsible className="mb-8">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-lg font-medium">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-gray-700">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default RightsFaqSection;
