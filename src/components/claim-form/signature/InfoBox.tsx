
import React from "react";
import { AlertCircle } from "lucide-react";

const InfoBox: React.FC = () => {
  return (
    <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mt-6 flex items-center space-x-3">
      <AlertCircle className="h-5 w-5 text-blue-500 flex-shrink-0" />
      <span className="text-sm text-gray-700">
        Your signature should closely resemble the signature on your ID.
      </span>
    </div>
  );
};

export default InfoBox;
