
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Claim } from "@/lib/supabase";
import { X } from "lucide-react";
import { toast } from "sonner";
import CustomerInfoCard from "../claims/details/CustomerInfoCard";
import FlightInfoCard from "../claims/details/FlightInfoCard";
import ClaimStatusCard from "../claims/details/ClaimStatusCard";
import IssueDetailsCard from "../claims/details/IssueDetailsCard";
import PaymentDetailsCard from "../claims/details/PaymentDetailsCard";
import ActionButtons from "../claims/details/ActionButtons";
import CommunicationTab from "../claims/details/CommunicationTab";
import NotEligibleModal, { EmailData } from "./NotEligibleModal";

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
    const updatedClaim = { 
      ...claim, 
      status: "not_eligible",
      additionalinformation: `Not eligible reason: ${reason}`,
      lastupdated: new Date().toISOString().split('T')[0]
    };
    
    // If email is being sent, add to communication log
    if (emailData && emailData.sendEmail) {
      const currentDate = new Date().toISOString().split('T')[0];
      
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

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Claim Details</TabsTrigger>
            <TabsTrigger value="communication">Communication</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Customer Information Section */}
              <CustomerInfoCard claim={claim} />

              {/* Flight Information Section */}
              <FlightInfoCard claim={claim} />

              {/* Claim Status Section */}
              <ClaimStatusCard claim={claim} />
            </div>

            <Separator className="my-6" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Issue Details Section */}
              <IssueDetailsCard claim={claim} />

              {/* Payment Details Section */}
              <PaymentDetailsCard claim={claim} />
            </div>

            <Separator className="my-6" />

            {/* Action Buttons */}
            <ActionButtons 
              onSendEmail={handleSendEmail} 
              onUpdateStatus={handleUpdateStatus} 
              onEdit={handleEdit}
              onMarkNotEligible={handleMarkAsNotEligible}
            />
          </TabsContent>
          
          <TabsContent value="communication" className="mt-6">
            <CommunicationTab claim={claim} />
          </TabsContent>
          
          <TabsContent value="documents" className="mt-6">
            <div className="p-4 text-center text-gray-500">
              Document management features will be added soon.
            </div>
          </TabsContent>
        </Tabs>
        
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
