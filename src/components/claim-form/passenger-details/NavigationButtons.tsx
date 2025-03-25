
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

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
  return (
    <div className="pt-4 flex justify-between items-center">
      {showBackButton ? (
        <Button 
          type="button" 
          variant="outline" 
          onClick={onBack}
          className="flex items-center"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      ) : (
        <div></div> // Empty div to maintain flex spacing when back button is hidden
      )}

      <Button type="submit" disabled={isSubmitting}>
        {continueText}
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};

export default NavigationButtons;
