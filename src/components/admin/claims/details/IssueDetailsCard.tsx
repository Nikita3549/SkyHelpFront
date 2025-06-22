import React from 'react';
import { Info } from 'lucide-react';
import { Claim } from '@/lib/supabase';

type IssueDetailsCardProps = {
  claim: Claim;
};
function normalize(str: string): string {
  if (!str) return str;
  return str[0].toUpperCase() + str.slice(1).replace('_', ' ');
}

const IssueDetailsCard = ({ claim }: IssueDetailsCardProps) => {
  return (
    <div>
      <h3 className="text-sm font-medium text-gray-500 mb-2 flex items-center">
        <Info className="h-4 w-4 mr-1" />
        Issue Details
      </h3>
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Flight Issue:</span>
          <span className="font-medium">
            {`${claim?.flightissue ? normalize(claim?.flightissue) : 'N/A'}`}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Reason Given by Airline:</span>
          <span className="font-medium">
            {claim?.reasongivenbyairline
              ? normalize(claim?.reasongivenbyairline)
              : 'N/A'}
          </span>
        </div>
        <div className="flex flex-col text-sm mb-2">
          <span className="text-gray-500 mb-1">Additional Information:</span>
          <span className="font-medium text-sm bg-gray-50 p-2 rounded-md min-h-[50px] whitespace-pre-wrap">
            {claim?.additionalinformation || 'None provided'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default IssueDetailsCard;
