
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface PaymentNavigationButtonsProps {
  onBack: () => void;
}

const PaymentNavigationButtons: React.FC<PaymentNavigationButtonsProps> = ({ onBack }) => {
  const isMobile = useIsMobile();
  
  const handleBack = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    onBack();
  };

  const handleSubmit = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Form submission is handled by the parent component
  };

  return (
    <div className={`pt-4 flex ${isMobile ? 'flex-col gap-3' : 'justify-between items-center'}`}>
      <Button 
        type="button" 
        variant="outline" 
        onClick={handleBack}
        className={`flex items-center ${isMobile ? 'w-full justify-center' : ''}`}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      <Button 
        type="submit"
        className={isMobile ? 'w-full' : ''}
        onClick={handleSubmit}
      >
        Submit Claim
        <Check className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};

export default PaymentNavigationButtons;
