
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface PaymentNavigationButtonsProps {
  onBack: () => void;
}

const PaymentNavigationButtons: React.FC<PaymentNavigationButtonsProps> = ({ onBack }) => {
  const isMobile = useIsMobile();

  return (
    <div className={`pt-4 flex ${isMobile ? 'flex-col gap-3' : 'justify-between items-center'}`}>
      <Button 
        type="button" 
        variant="outline" 
        onClick={onBack}
        className={`flex items-center ${isMobile ? 'w-full justify-center' : ''}`}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      <Button 
        type="submit"
        className={isMobile ? 'w-full' : ''}
      >
        Submit Claim
        <Check className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};

export default PaymentNavigationButtons;
