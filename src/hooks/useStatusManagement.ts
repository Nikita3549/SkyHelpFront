
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { claimsService } from "@/services/claimsService";
import { Claim } from "@/lib/supabase";
import { EmailData } from "@/types/claims";

export function useStatusManagement() {
  const queryClient = useQueryClient();

  const updateClaimMutation = useMutation({
    mutationFn: ({ claimId, updates }: { claimId: string, updates: Partial<Claim> }) => 
      claimsService.updateClaim(claimId, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['claims'] });
    },
    onError: (error) => {
      toast.error("Failed to update claim", {
        description: error instanceof Error ? error.message : "An unknown error occurred",
      });
    },
  });

  const handleUpdateStatus = (
    claimId: string, 
    newStatus: string, 
    reason?: string, 
    emailData?: EmailData & { progressSteps?: string },
    claims?: Claim[]
  ) => {
    const updates: Partial<Claim> = { 
      status: newStatus as any,
      lastupdated: new Date().toISOString().split('T')[0]
    };
    
    // Add progress steps if provided
    if (emailData && emailData.progressSteps) {
      updates.progressSteps = emailData.progressSteps;
    }
    
    // Store reason in additionalinformation
    if (reason && newStatus === 'not_eligible') {
      updates.additionalinformation = `Not eligible reason: ${reason}`;
      
      // Add email log if email was sent
      if (emailData && emailData.sendEmail) {
        const currentDate = new Date().toISOString().split('T')[0];
        
        // Check if there's existing communication log
        const claim = claims?.find(c => c.id === claimId);
        let communicationLog = [];
        
        try {
          if (claim && claim.communicationlog) {
            communicationLog = JSON.parse(claim.communicationlog);
          }
        } catch (e) {
          console.error("Error parsing communication log", e);
        }
        
        // Add new email to log
        communicationLog.push({
          date: currentDate,
          type: "email",
          direction: "outgoing",
          subject: emailData.subject,
          body: emailData.body,
          status: "sent"
        });
        
        // Add system message about status change
        communicationLog.push({
          date: currentDate,
          type: "message",
          direction: "system",
          sender: "system",
          content: `Claim status changed to Not Eligible. Reason: ${reason}`,
          read: true
        });
        
        updates.communicationlog = JSON.stringify(communicationLog);
      }
    }
    
    // For other status changes, also add a system message
    else if (newStatus !== 'not_eligible') {
      const currentDate = new Date().toISOString().split('T')[0];
      const claim = claims?.find(c => c.id === claimId);
      let communicationLog = [];
      
      try {
        if (claim && claim.communicationlog) {
          communicationLog = JSON.parse(claim.communicationlog);
        }
      } catch (e) {
        console.error("Error parsing communication log", e);
      }
      
      // Add system message about status change
      communicationLog.push({
        date: currentDate,
        type: "message",
        direction: "system",
        sender: "system",
        content: `Claim status changed to ${newStatus}`,
        read: true
      });
      
      updates.communicationlog = JSON.stringify(communicationLog);
    }
    
    updateClaimMutation.mutate({ 
      claimId, 
      updates
    });
    
    if (newStatus !== 'not_eligible' || !emailData || !emailData.sendEmail) {
      toast.success("Status updated", {
        description: `Claim ${claimId} status changed to ${newStatus}`,
      });
    }
  };

  return {
    handleUpdateStatus
  };
}
