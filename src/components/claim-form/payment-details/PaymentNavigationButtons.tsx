
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface PaymentNavigationButtonsProps {
  onBack: () => void;
  onSkip?: () => void;
}

const PaymentNavigationButtons: React.FC<PaymentNavigationButtonsProps> = ({ onBack, onSkip }) => {
  const isMobile = useIsMobile();
  
  const handleBack = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    onBack();
  };

  const handleSkip = () => {
    if (onSkip) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      onSkip();
    }
  };

  return (
    <div className={`pt-4 ${isMobile ? 'space-y-3' : ''}`}>
      <div className={`flex ${isMobile ? 'flex-col gap-3' : 'justify-between items-center'}`}>
        <Button 
          type="button" 
          variant="outline" 
          onClick={handleBack}
          className={`flex items-center ${isMobile ? 'w-full justify-center' : ''}`}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className={`${isMobile ? 'flex flex-col gap-3 w-full' : 'flex gap-3'}`}>
          {onSkip && (
            <Button 
              type="button"
              variant="ghost" 
              onClick={handleSkip}
              className={`text-[#344054] font-medium ${isMobile ? 'w-full' : ''}`}
            >
              I'll do it later
            </Button>
          )}
          
          <Button 
            type="submit"
            className={isMobile ? 'w-full' : ''}
          >
            Submit Claim
            <Check className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentNavigationButtons;
