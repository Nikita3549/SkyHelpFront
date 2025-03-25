
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
    <div className="mb-2">
      <h2 className="text-xl font-semibold">Claim Details: {claim.id}</h2>
      <p className="text-muted-foreground text-sm">{claim?.customer}</p>
    </div>
  );
};

export default ClaimDetailsHeader;
