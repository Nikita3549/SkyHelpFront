
import React from "react";
import { CreditCard } from "lucide-react";
import { Claim } from "@/lib/supabase";

type PaymentDetailsCardProps = {
  claim: Claim;
  formatPaymentDetails: (claim: Claim | undefined) => string;
};

const PaymentDetailsCard = ({ claim, formatPaymentDetails }: PaymentDetailsCardProps) => {
  return (
    <div className="bg-card rounded-lg border p-4">
      <h3 className="text-sm font-medium text-gray-500 mb-3 flex items-center">
        <CreditCard className="h-4 w-4 mr-1" />
        Payment Details
      </h3>
      <div className="grid grid-cols-1 gap-y-2 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-gray-500">Payment Method:</span>
          <span className="font-medium text-right">
            {(claim?.paymentmethod || "N/A")
              .replace("_", " ")
              .replace(/\b\w/g, (l) => l.toUpperCase())}
          </span>
        </div>
        <div className="mt-1">
          <span className="text-gray-500 block mb-1">Details:</span>
          <span className="font-medium text-sm bg-gray-50 p-2 rounded-md block min-h-[60px] whitespace-pre-wrap">
            {formatPaymentDetails(claim)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetailsCard;
