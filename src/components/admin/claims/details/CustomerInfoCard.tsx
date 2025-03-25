
import React from "react";
import { User } from "lucide-react";
import { Claim } from "@/lib/supabase";

type CustomerInfoCardProps = {
  claim: Claim;
};

const CustomerInfoCard = ({ claim }: CustomerInfoCardProps) => {
  return (
    <div>
      <h3 className="text-sm font-medium text-gray-500 mb-2 flex items-center">
        <User className="h-4 w-4 mr-1" />
        Customer Information
      </h3>
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Name:</span>
          <span className="font-medium">
            {claim?.customer}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Email:</span>
          <span className="font-medium">
            {claim?.email}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Phone:</span>
          <span className="font-medium">
            {claim?.phone || "N/A"}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Address:</span>
          <span className="font-medium">
            {claim?.address || "N/A"}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Passengers:</span>
          <span className="font-medium">
            {claim?.numberofpassengers || "1"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CustomerInfoCard;
