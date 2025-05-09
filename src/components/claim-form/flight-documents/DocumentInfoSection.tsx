
import React from "react";
import { FileText, Info, HelpCircle, ChevronDown, ChevronUp } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface DocumentInfoSectionProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DocumentInfoSection: React.FC<DocumentInfoSectionProps> = ({ isOpen, setIsOpen }) => {
  return (
    <div className="mt-8 space-y-4">
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="bg-gray-50 rounded-lg border border-gray-100"
      >
        <CollapsibleTrigger className="w-full p-4 flex items-center justify-between text-left">
          <div className="flex items-center gap-3">
            <HelpCircle className="w-6 h-6 text-blue-500 flex-shrink-0" />
            <h3 className="text-lg font-medium text-gray-900">What is a boarding pass or an e-ticket?</h3>
          </div>
          {isOpen ? (
            <ChevronUp className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-500" />
          )}
        </CollapsibleTrigger>
        <CollapsibleContent className="px-4 pb-4 pt-1 space-y-4">
          <p className="text-gray-700">
            The boarding pass is the physical slip you receive after checking in at the airport, or an in-app document if you check-in online. You use this to board the plane and it has details like your name and seat number.
          </p>
          <p className="text-gray-700">
            <span className="font-medium text-gray-900">E-ticket</span> you'll receive your e-ticket after making your booking - it's an electronic confirmation that gets emailed to you containing the passenger's names, flight details, and booking reference.
          </p>
        </CollapsibleContent>
      </Collapsible>
      
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
