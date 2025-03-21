
import React from "react";

interface ProgressBarProps {
  step: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ step, totalSteps }) => {
  const percentage = Math.round((step / totalSteps) * 100);

  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-primary">Step {step} of {totalSteps}</span>
        <span className="text-sm text-gray-500">{percentage}% complete</span>
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
