
import React from "react";
import { Claim } from "@/lib/supabase";
import ClaimProgressManager, { type ClaimStep } from "../../../claims/details/ClaimProgressManager";
import { toast } from "sonner";

type ProgressTabProps = {
  claim: Claim;
  onUpdateClaim?: (updates: Partial<Claim>) => void;
};

const ProgressTab = ({ claim, onUpdateClaim }: ProgressTabProps) => {
  const handleUpdateProgress = (steps: ClaimStep[]) => {
    if (onUpdateClaim) {
      onUpdateClaim({
        progressSteps: JSON.stringify(steps),
        lastupdated: new Date().toISOString().split('T')[0]
      });
      
      toast.success("Claim progress updated", {
        description: "The progress timeline has been updated successfully",
      });
    }
  };
  
  return (
    <div className="mt-4">
      <ClaimProgressManager 
        claim={claim} 
        onUpdateProgress={handleUpdateProgress} 
      />
    </div>
  );
};

export default ProgressTab;
