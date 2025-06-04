import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Check, Clock } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface PaymentNavigationButtonsProps {
  onBack: () => void;
  onSkip: () => void;
}

const PaymentNavigationButtons: React.FC<PaymentNavigationButtonsProps> = ({
  onBack,
  onSkip,
}) => {
  const isMobile = useIsMobile();

  const handleBack = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    onBack();
  };

  const handleSkip = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    onSkip();
  };

  return (
    <div
      className={`pt-4 flex ${isMobile ? 'flex-col gap-3' : 'justify-between items-center'}`}
    >
      <Button
        type="button"
        variant="outline"
        onClick={handleBack}
        className={`flex items-center ${isMobile ? 'w-full justify-center' : ''}`}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      <div
        className={`flex ${isMobile ? 'w-full flex-col' : 'gap-3'} ${isMobile ? 'gap-3' : ''}`}
      >
        <Button
          type="button"
          variant="ghost"
          onClick={handleSkip}
          className={`flex items-center text-gray-700 ${isMobile ? 'w-full justify-center' : ''}`}
        >
          <Clock className="mr-2 h-4 w-4" />
          I'll do it later
        </Button>

        <Button type="submit" className={isMobile ? 'w-full' : ''}>
          Submit Claim
          <Check className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default PaymentNavigationButtons;
