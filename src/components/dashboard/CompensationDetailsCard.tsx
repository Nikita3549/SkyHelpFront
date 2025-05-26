
import React from "react";
import { Separator } from "@/components/ui/separator";

interface Claim {
  compensation: string;
}

interface CompensationDetailsCardProps {
  claim: Claim;
}

const CompensationDetailsCard = ({ claim }: CompensationDetailsCardProps) => {
  return (
    <div>
      <h3 className="text-sm font-medium text-gray-500 mb-2">Compensation Details</h3>
      <div className="bg-gray-50 rounded-lg p-4 space-y-3">
        <div className="flex justify-between">
          <span className="text-sm text-gray-500">Amount</span>
          <span className="text-lg font-semibold text-primary">{claim.compensation}</span>
        </div>
        <Separator />
        <div className="flex justify-between">
          <span className="text-sm text-gray-500">Our Fee (25%)</span>
          <span className="text-sm font-medium">
            {claim.compensation.startsWith("€") 
              ? "€" + (parseFloat(claim.compensation.substring(1)) * 0.25).toFixed(2)
              : "Calculated on settlement"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-500">You Receive</span>
          <span className="text-sm font-medium">
            {claim.compensation.startsWith("€") 
              ? "€" + (parseFloat(claim.compensation.substring(1)) * 0.75).toFixed(2)
              : "Calculated on settlement"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CompensationDetailsCard;
