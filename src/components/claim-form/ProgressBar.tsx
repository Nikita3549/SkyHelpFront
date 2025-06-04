import React from 'react';

interface ProgressBarProps {
  step: number;
  totalSteps: number;
}

const ProgressBar = ({ step, totalSteps }: ProgressBarProps) => {
  // Calculate the percentage based on current step and total steps
  let percentage = 0;

  // Final step (thank you step) always shows 100%
  if (step === 6) {
    percentage = 100;
  } else if (step === 2.5) {
    // Special case for disruption type step (2.5)
    percentage = (2.5 / totalSteps) * 100;
  } else if (step === 5) {
    // Payment details step (5) shows ~90% instead of almost full
    percentage = 90;
  } else {
    // Regular steps follow normal progression
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
