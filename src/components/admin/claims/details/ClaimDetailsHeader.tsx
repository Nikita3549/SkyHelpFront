
import React from "react";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Claim } from "@/lib/supabase";

type ClaimDetailsHeaderProps = {
  claim: Claim;
};

const ClaimDetailsHeader = ({ claim }: ClaimDetailsHeaderProps) => {
  return (
    <CardHeader className="flex flex-row items-start justify-between">
      <div>
        <CardTitle>Claim Details: {claim.id}</CardTitle>
        <CardDescription>
          {claim?.customer}
        </CardDescription>
      </div>
    </CardHeader>
  );
};

export default ClaimDetailsHeader;
