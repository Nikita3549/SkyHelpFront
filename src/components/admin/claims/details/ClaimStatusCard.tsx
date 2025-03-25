
import React from "react";
import { AlertCircle } from "lucide-react";
import { Claim } from "@/lib/supabase";
import StatusBadge from "../StatusBadge";

type ClaimStatusCardProps = {
  claim: Claim;
};

const ClaimStatusCard = ({ claim }: ClaimStatusCardProps) => {
  return (
    <div className="bg-card rounded-lg border p-4">
      <h3 className="text-sm font-medium text-gray-500 mb-3 flex items-center">
        <AlertCircle className="h-4 w-4 mr-1" />
        Claim Status
      </h3>
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-gray-500">Status:</span>
          <StatusBadge status={claim?.status || ""} />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-500">Stage:</span>
          <span className="font-medium text-right">
            {claim?.stage
              ?.replace("_", " ")
              .replace(/\b\w/g, (l) => l.toUpperCase())}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-500">Amount:</span>
          <span className="font-medium text-right">{claim?.amount}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-500">Last Updated:</span>
          <span className="font-medium text-right">
            {new Date(claim?.lastupdated || "").toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ClaimStatusCard;
