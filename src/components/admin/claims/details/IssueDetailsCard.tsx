
import React from "react";
import { Info } from "lucide-react";
import { Claim } from "@/lib/supabase";

type IssueDetailsCardProps = {
  claim: Claim;
};

const IssueDetailsCard = ({ claim }: IssueDetailsCardProps) => {
  return (
    <div className="bg-card rounded-lg border p-4">
      <h3 className="text-sm font-medium text-gray-500 mb-3 flex items-center">
        <Info className="h-4 w-4 mr-1" />
        Issue Details
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-gray-500">Flight Issue:</span>
          <span className="font-medium text-right">{claim?.flightissue || "N/A"}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-500">Reason Given by Airline:</span>
          <span className="font-medium text-right">{claim?.reasongivenbyairline || "N/A"}</span>
        </div>
        <div className="col-span-2 mt-2">
          <span className="text-gray-500 block mb-1">Additional Information:</span>
          <span className="font-medium text-sm bg-gray-50 p-2 rounded-md block min-h-[40px] whitespace-pre-wrap">
            {claim?.additionalinformation || "None provided"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default IssueDetailsCard;
