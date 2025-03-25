
import React from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Claim } from "@/lib/supabase";

// Import sub-components
import CustomerInfoCard from "./details/CustomerInfoCard";
import FlightInfoCard from "./details/FlightInfoCard";
import ClaimStatusCard from "./details/ClaimStatusCard";
import IssueDetailsCard from "./details/IssueDetailsCard";
import PaymentDetailsCard from "./details/PaymentDetailsCard";
import ActionButtons from "./details/ActionButtons";

type ClaimDetailsSectionProps = {
  selectedClaim: string | null;
  setSelectedClaim: (id: string | null) => void;
  claimsData: Claim[];
  handleSendEmail: (claimId: string) => void;
  formatPaymentDetails: (claim: Claim | undefined) => string;
  onEditClaim: (claim: Claim) => void;
};

const ClaimDetailsSection = ({
  selectedClaim,
  setSelectedClaim,
  claimsData,
  handleSendEmail,
  formatPaymentDetails,
  onEditClaim,
}: ClaimDetailsSectionProps) => {
  if (!selectedClaim) return null;

  const claim = claimsData.find((claim) => claim.id === selectedClaim);
  
  if (!claim) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <CardHeader className="flex flex-row items-start justify-between">
          <div>
            <CardTitle>Claim Details: {selectedClaim}</CardTitle>
            <CardDescription>
              {claim?.customer}
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSelectedClaim(null)}
          >
            <XCircle className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <CustomerInfoCard claim={claim} />
            <FlightInfoCard claim={claim} />
            <ClaimStatusCard claim={claim} />
          </div>

          <Separator className="my-6" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <IssueDetailsCard claim={claim} />
            <PaymentDetailsCard claim={claim} formatPaymentDetails={formatPaymentDetails} />
          </div>

          <Separator className="my-6" />

          <ActionButtons 
            selectedClaimId={selectedClaim} 
            claim={claim} 
            handleSendEmail={handleSendEmail} 
            onEditClaim={onEditClaim} 
          />
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ClaimDetailsSection;
