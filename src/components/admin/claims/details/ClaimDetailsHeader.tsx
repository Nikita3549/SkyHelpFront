import React from 'react';
import { Button } from '@/components/ui/button';
import { XCircle } from 'lucide-react';
import { CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Claim } from '@/lib/supabase';

type ClaimDetailsHeaderProps = {
  selectedClaim: string;
  claim: Claim;
  setSelectedClaim: (id: string | null) => void;
};

const ClaimDetailsHeader = ({
  selectedClaim,
  claim,
  setSelectedClaim,
}: ClaimDetailsHeaderProps) => {
  return (
    <CardHeader className="flex flex-row items-start justify-between">
      <div>
        <CardTitle>Claim Details: {selectedClaim}</CardTitle>
        <CardDescription>{claim?.customer}</CardDescription>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setSelectedClaim(null)}
      >
        <XCircle className="h-4 w-4" />
      </Button>
    </CardHeader>
  );
};

export default ClaimDetailsHeader;
