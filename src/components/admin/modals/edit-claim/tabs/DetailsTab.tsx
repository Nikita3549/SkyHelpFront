
import React from "react";
import { Separator } from "@/components/ui/separator";
import { Claim } from "@/lib/supabase";
import CustomerInfoCard from "../../../claims/details/CustomerInfoCard";
import FlightInfoCard from "../../../claims/details/FlightInfoCard";
import ClaimStatusCard from "../../../claims/details/ClaimStatusCard";
import IssueDetailsCard from "../../../claims/details/IssueDetailsCard";
import PaymentDetailsCard from "../../../claims/details/PaymentDetailsCard";
import ActionButtons from "../../../claims/details/ActionButtons";
import ClaimProgressManager, { ClaimStep } from "../../../claims/details/ClaimProgressManager";

type DetailsTabProps = {
  claim: Claim;
  onSendEmail: () => void;
  onUpdateStatus: () => void;
  onEdit: () => void;
  onMarkNotEligible: () => void;
  onUpdateClaim?: (updates: Partial<Claim>) => void;
};

const DetailsTab = ({
  claim,
  onSendEmail,
  onUpdateStatus,
  onEdit,
  onMarkNotEligible,
  onUpdateClaim
}: DetailsTabProps) => {
  
  const handleUpdateProgress = (steps: ClaimStep[]) => {
    if (onUpdateClaim) {
      onUpdateClaim({
        progressSteps: JSON.stringify(steps)
      });
    }
  };
  
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <CustomerInfoCard claim={claim} />
        <FlightInfoCard claim={claim} />
        <ClaimStatusCard claim={claim} />
      </div>

      <Separator className="my-6" />
      
      <ClaimProgressManager 
        claim={claim} 
        onUpdateProgress={handleUpdateProgress} 
      />

      <Separator className="my-6" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <IssueDetailsCard claim={claim} />
        <PaymentDetailsCard claim={claim} />
      </div>

      <Separator className="my-6" />

      <ActionButtons 
        onSendEmail={onSendEmail} 
        onUpdateStatus={onUpdateStatus} 
        onEdit={onEdit}
        onMarkNotEligible={onMarkNotEligible}
      />
    </>
  );
};

export default DetailsTab;
