
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface ProgressBarProps {
  step: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ step, totalSteps }) => {
  const percentage = Math.round((step / totalSteps) * 100);
  const isMobile = useIsMobile();

  return (
    <div className={`${isMobile ? 'mb-4' : 'mb-8'}`}>
      <div className="flex justify-between items-center mb-2">
        <span className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium text-gray-500`}>
          Step {step} of {totalSteps}
        </span>
        <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-primary font-medium`}>
          {percentage}% complete
        </span>
      </div>
      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-300 ease-in-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
