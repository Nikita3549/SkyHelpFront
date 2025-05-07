
import React from "react";

interface ProgressBarProps {
  step: number;
  totalSteps: number;
}

const ProgressBar = ({ step, totalSteps }: ProgressBarProps) => {
  // Adjust for the decimal step value
  let percentage = 0;
  
  if (step === 2.5) {
    percentage = (2.5 / totalSteps) * 100;
  } else {
    percentage = (step / totalSteps) * 100;
  }

  return (
    <div className="w-full h-1 bg-gray-200 rounded-full mb-8">
      <div 
        className="h-1 bg-primary rounded-full transition-all duration-500 ease-in-out" 
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

export default ProgressBar;
