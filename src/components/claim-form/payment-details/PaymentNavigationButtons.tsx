
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check } from "lucide-react";

interface PaymentNavigationButtonsProps {
  onBack: () => void;
}

const PaymentNavigationButtons: React.FC<PaymentNavigationButtonsProps> = ({ onBack }) => {
  return (
    <div className="pt-4 flex justify-between items-center">
      <Button 
        type="button" 
        variant="outline" 
        onClick={onBack}
        className="flex items-center"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      <Button type="submit">
        Submit Claim
        <Check className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};

export default PaymentNavigationButtons;
