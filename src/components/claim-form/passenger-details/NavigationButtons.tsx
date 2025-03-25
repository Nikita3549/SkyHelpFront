
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface NavigationButtonsProps {
  onBack: () => void;
  showBackButton?: boolean;
  continueText?: string;
  isSubmitting?: boolean;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({ 
  onBack,
  showBackButton = true,
  continueText = "Continue",
  isSubmitting = false
}) => {
  const isMobile = useIsMobile();

  return (
    <div className={`pt-4 flex ${isMobile ? 'flex-col gap-3' : 'justify-between items-center'}`}>
      {showBackButton ? (
        <Button 
          type="button" 
          variant="outline" 
          onClick={onBack}
          className={`flex items-center ${isMobile ? 'w-full justify-center' : ''}`}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      ) : (
        !isMobile && <div></div> // Empty div to maintain flex spacing when back button is hidden (desktop only)
      )}

      <Button 
        type="submit" 
        disabled={isSubmitting}
        className={isMobile ? 'w-full' : ''}
      >
        {continueText}
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};

export default NavigationButtons;
