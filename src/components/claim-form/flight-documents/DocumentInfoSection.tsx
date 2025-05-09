
import React from "react";
import { Info, HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface DocumentInfoSectionProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DocumentInfoSection: React.FC<DocumentInfoSectionProps> = ({ isOpen, setIsOpen }) => {
  return (
    <div className="mt-8 space-y-4">
      <Accordion type="single" collapsible className="border-none">
        <AccordionItem value="boarding-pass-info" className="border-0">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
            <AccordionTrigger className="flex items-center gap-3 p-0 hover:no-underline text-left w-full">
              <HelpCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <span className="text-gray-800 text-sm font-medium text-left">
                What is a boarding pass or an e-ticket?
              </span>
              {/* The default chevron icon is handled by the AccordionTrigger component */}
            </AccordionTrigger>
            <AccordionContent className="pt-4 pb-0 text-sm text-gray-700 leading-relaxed">
              <p className="mb-3">
                The boarding pass is the physical slip you receive after checking in at the airport, or an in-app document if you check-in online. You use this to board the plane and it has details like your name and seat number.
              </p>
              <p>
                <span className="font-medium text-gray-900">E-ticket</span> you'll receive your e-ticket after making your booking - it's an electronic confirmation that gets emailed to you containing the passenger's names, flight details, and booking reference.
              </p>
            </AccordionContent>
          </div>
        </AccordionItem>
      </Accordion>
      
      <div className="bg-white rounded-lg p-4 border border-gray-100">
        <div className="flex items-center gap-3">
          <Info className="w-5 h-5 text-blue-500 flex-shrink-0" />
          <p className="text-gray-700 text-sm">
            We fully comply with data protection laws, and your data is safe with us.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DocumentInfoSection;
