import React from 'react';
import { CreditCard } from 'lucide-react';
import { Claim } from '@/lib/supabase';
import { formatPaymentDetails } from '@/lib/paymentUtils';

type PaymentDetailsCardProps = {
  claim: Claim;
};

function normalize(str: string): string {
  if (!str) return str;
  return str[0].toUpperCase() + str.slice(1).replace('_', ' ');
}

const PaymentDetailsCard = ({ claim }: PaymentDetailsCardProps) => {
  console.log(claim?.paymentmethod);
  return (
    <div>
      <h3 className="text-sm font-medium text-gray-500 mb-2 flex items-center">
        <CreditCard className="h-4 w-4 mr-1" />
        Payment Details
      </h3>
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Payment Method:</span>
          <span className="font-medium">
            {normalize(claim?.paymentmethod) || 'N/A'}
          </span>
        </div>
        <div className="flex flex-col text-sm">
          <span className="text-gray-500 mb-1">Details:</span>
          <span className="font-medium text-sm bg-gray-50 p-2 rounded-md min-h-[80px] whitespace-pre-wrap">
            {formatPaymentDetails(claim)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetailsCard;
