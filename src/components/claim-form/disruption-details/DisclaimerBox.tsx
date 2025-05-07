
import React from "react";
import { Info } from "lucide-react";

const DisclaimerBox: React.FC = () => {
  return (
    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg shadow-sm">
      <div className="flex items-start">
        <Info className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
        <div>
          <h4 className="text-sm font-medium text-blue-800 mb-1">Improve Your Claim Success Rate</h4>
          <p className="text-sm text-blue-700">
            Sharing specific details about your disruption experience significantly increases your chances of a successful claim. 
            Airlines and authorities respond better to claims with detailed information.
          </p>
          <p className="text-sm text-blue-700 mt-2">
            Be precise about times, communications you received, and how the disruption affected you.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DisclaimerBox;
