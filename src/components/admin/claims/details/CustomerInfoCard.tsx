
import React from "react";
import { User } from "lucide-react";
import { Claim } from "@/lib/supabase";

type CustomerInfoCardProps = {
  claim: Claim;
};

const CustomerInfoCard = ({ claim }: CustomerInfoCardProps) => {
  return (
    <div className="bg-card rounded-lg border p-4">
      <h3 className="text-sm font-medium text-gray-500 mb-3 flex items-center">
        <User className="h-4 w-4 mr-1" />
        Customer Information
      </h3>
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-gray-500">Name:</span>
          <span className="font-medium text-right">{claim?.customer}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-500">Email:</span>
          <span className="font-medium text-right truncate max-w-[150px]" title={claim?.email}>{claim?.email}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-500">Phone:</span>
          <span className="font-medium text-right">{claim?.phone || "N/A"}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-500">Passengers:</span>
          <span className="font-medium text-right">{claim?.numberofpassengers || "1"}</span>
        </div>
        <div className="col-span-2 flex items-start justify-between">
          <span className="text-gray-500">Address:</span>
          <span className="font-medium text-right">{claim?.address || "N/A"}</span>
        </div>
      </div>
    </div>
  );
};

export default CustomerInfoCard;
