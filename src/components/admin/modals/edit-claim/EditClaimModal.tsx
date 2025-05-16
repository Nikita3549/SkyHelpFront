
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Claim } from "@/lib/supabase";
import { toast } from "sonner";
import TabsContainer from "./TabsContainer";
import { EmailData } from "../NotEligibleModal";
import NotEligibleModal from "../NotEligibleModal";
import { MessageEntry } from "@/hooks/useClaimsOperations";

type EditClaimModalProps = {
  isOpen: boolean;
  onClose: () => void;
  claim: Claim;
  onSubmit?: (claimData: Partial<Claim>) => void;
};

const EditClaimModal = ({ isOpen, onClose, claim, onSubmit }: EditClaimModalProps) => {
  const [activeTab, setActiveTab] = useState("details");
  const [isNotEligibleModalOpen, setIsNotEligibleModalOpen] = useState(false);

  const handleSendEmail = () => {
    // Log the email to communication history
    const currentDate = new Date().toISOString();
    const emailEntry: MessageEntry = {
      date: currentDate,
      type: "email",
      direction: "outgoing",
      subject: "Email from Support",
      body: "This is a placeholder for an email sent from the support team.",
      status: "sent"
    };
    
    // Add this email to communication log
    let communicationLog = [];
    try {
      if (claim.communicationlog) {
        communicationLog = JSON.parse(claim.communicationlog);
      }
    } catch (e) {
      console.error("Error parsing communication log", e);
    }
    
    communicationLog.push(emailEntry);
    
    // Submit updated claim with new communication log
    if (onSubmit) {
      onSubmit({
        ...claim,
        communicationlog: JSON.stringify(communicationLog)
      });
    }
    
    toast.success("Email sent successfully", {
      description: `Notification email sent to ${claim.customer}`,
    });
  };

  const handleUpdateStatus = () => {
    toast.success("Status updated", {
      description: `Claim ${claim.id} status has been updated`,
    });
  };

  const handleEdit = () => {
    if (onSubmit) {
      onSubmit(claim);
    }
  };
  
  const handleMarkAsNotEligible = () => {
    setIsNotEligibleModalOpen(true);
  };
  
  const handleConfirmNotEligible = (reason: string, additionalNotes?: string, emailData?: EmailData) => {
    // Update claim data
    const updatedClaim: Partial<Claim> = { 
      ...claim, 
      status: "not_eligible",
      additionalinformation: `Not eligible reason: ${reason}`,
      lastupdated: new Date().toISOString().split('T')[0]
    };
    
    // If email is being sent, add to communication log
    if (emailData && emailData.sendEmail) {
      const currentDate = new Date().toISOString();
      
      let communicationLog = [];
      try {
        if (claim.communicationlog) {
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
      
      // Also add a system message about status change
      communicationLog.push({
        date: currentDate,
        type: "message",
        direction: "system",
        sender: "system",
        content: `Claim status changed to Not Eligible. Reason: ${reason}`,
        read: true
      });
      
      updatedClaim.communicationlog = JSON.stringify(communicationLog);
      
      toast.success("Email sent to customer", {
        description: `Explaining the ineligibility reason: ${reason}`,
      });
    } else {
      toast.success("Claim marked as not eligible", {
        description: `Reason: ${reason}`,
      });
    }
    
    // Submit the updated claim data
    if (onSubmit) {
      onSubmit(updatedClaim);
    }
    
    setIsNotEligibleModalOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
        <DialogHeader className="flex flex-row items-center justify-between">
          <div>
            <DialogTitle className="text-xl font-semibold">Claim Details: {claim.id}</DialogTitle>
            <p className="text-sm text-gray-500">{claim.customer}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-4 right-4"
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <TabsContainer 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          claim={claim} 
          onSendEmail={handleSendEmail}
          onUpdateStatus={handleUpdateStatus}
          onEdit={handleEdit}
          onMarkNotEligible={handleMarkAsNotEligible}
        />
        
        <NotEligibleModal 
          isOpen={isNotEligibleModalOpen}
          onClose={() => setIsNotEligibleModalOpen(false)}
          onConfirm={handleConfirmNotEligible}
          claimId={claim.id}
          customerName={claim.customer}
          flightNumber={claim.flightnumber}
          flightDate={claim.date}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditClaimModal;
