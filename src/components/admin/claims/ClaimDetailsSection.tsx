
import React from "react";
import { motion } from "framer-motion";
import ClaimDetailsHeader from "./details/ClaimDetailsHeader";
import CustomerInfoCard from "./details/CustomerInfoCard";
import FlightInfoCard from "./details/FlightInfoCard";
import IssueDetailsCard from "./details/IssueDetailsCard";
import PaymentDetailsCard from "./details/PaymentDetailsCard";
import ClaimStatusCard from "./details/ClaimStatusCard";
import ActionButtons from "./details/ActionButtons";
import { Claim } from "@/lib/supabase";

type ClaimDetailsSectionProps = {
  selectedClaimId: string;
  claim: Claim;
  handleSendEmail: (claimId: string) => void;
  formatPaymentDetails: (claim: Claim | undefined) => string;
  onEditClaim: (claim: Claim) => void;
};

const ClaimDetailsSection = ({
  selectedClaimId,
  claim,
  handleSendEmail,
  formatPaymentDetails,
  onEditClaim,
}: ClaimDetailsSectionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      <ClaimDetailsHeader claim={claim} />
      
      <div className="grid grid-cols-1 gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CustomerInfoCard claim={claim} />
          <ClaimStatusCard claim={claim} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FlightInfoCard claim={claim} />
          <PaymentDetailsCard claim={claim} formatPaymentDetails={formatPaymentDetails} />
        </div>
        
        <IssueDetailsCard claim={claim} />
      </div>
      
      <ActionButtons 
        selectedClaimId={selectedClaimId} 
        claim={claim} 
        handleSendEmail={handleSendEmail} 
        onEditClaim={onEditClaim}
      />
    </motion.div>
  );
};

export default ClaimDetailsSection;
