
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Claim } from "@/lib/supabase";
import { toast } from "sonner";

// Import sub-components
import CustomerInfoCard from "./details/CustomerInfoCard";
import FlightInfoCard from "./details/FlightInfoCard";
import ClaimStatusCard from "./details/ClaimStatusCard";
import IssueDetailsCard from "./details/IssueDetailsCard";
import PaymentDetailsCard from "./details/PaymentDetailsCard";
import ActionButtons from "./details/ActionButtons";
import ClaimDetailsHeader from "./details/ClaimDetailsHeader";
import CommunicationTab from "./details/CommunicationTab";
import NotEligibleModal from "../modals/NotEligibleModal";
import ClaimProgressManager, { type ClaimStep } from "./details/ClaimProgressManager";
import ComprehensiveDetailsTab from "./details/comprehensive/ComprehensiveDetailsTab";

type ClaimDetailsSectionProps = {
  selectedClaim: string | null;
  setSelectedClaim: (id: string | null) => void;
  claimsData: Claim[];
  handleSendEmail: (claimId: string) => void;
  handleUpdateStatus: (claimId: string, newStatus: string, reason?: string, emailData?: any) => void;
  onEditClaim: (claim: Claim) => void;
};

const ClaimDetailsSection = ({
  selectedClaim,
  setSelectedClaim,
  claimsData,
  handleSendEmail,
  handleUpdateStatus,
  onEditClaim,
}: ClaimDetailsSectionProps) => {
  const [activeTab, setActiveTab] = useState("comprehensive");
  const [isNotEligibleModalOpen, setIsNotEligibleModalOpen] = useState(false);
  
  if (!selectedClaim) return null;

  const claim = claimsData.find((claim) => claim.id === selectedClaim);
  
  if (!claim) return null;

  // Create handler functions for ActionButtons component
  const handleSendEmailClick = () => {
    handleSendEmail(selectedClaim);
  };

  const handleUpdateStatusClick = () => {
    // This can be updated later if needed to handle specific status updates
    // For now, we'll just pass a function that can be implemented later
  };

  const handleEditClick = () => {
    onEditClaim(claim);
  };
  
  const handleMarkAsNotEligible = () => {
    setIsNotEligibleModalOpen(true);
  };
  
  const handleConfirmNotEligible = (reason: string, additionalNotes?: string, emailData?: any) => {
    handleUpdateStatus(selectedClaim, "not_eligible", reason, emailData);
    
    if (emailData && emailData.sendEmail) {
      toast.success("Email sent to customer", {
        description: `Explaining the ineligibility reason: ${reason}`,
      });
    } else {
      toast.success("Claim marked as not eligible", {
        description: `Reason: ${reason}`,
      });
    }
  };
  
  const handleUpdateProgress = (steps: ClaimStep[]) => {
    const updatedClaim = {
      ...claim,
      progressSteps: JSON.stringify(steps),
      lastupdated: new Date().toISOString().split('T')[0]
    };
    
    // Update the claim with new progress steps
    handleUpdateStatus(selectedClaim, claim.status, undefined, {
      sendEmail: false,
      progressSteps: JSON.stringify(steps)
    });
    
    toast.success("Claim progress updated", {
      description: "The progress timeline has been updated successfully",
    });
  };

  return (
    <motion.div
      id="claim-details-section"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <ClaimDetailsHeader 
          selectedClaim={selectedClaim} 
          claim={claim} 
          setSelectedClaim={setSelectedClaim} 
        />
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-5 mb-4">
              <TabsTrigger value="comprehensive">Complete Details</TabsTrigger>
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="communication">Communication</TabsTrigger>
              <TabsTrigger value="progress">Progress</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>
            
            <TabsContent value="comprehensive" className="space-y-6">
              <ComprehensiveDetailsTab 
                claim={claim}
                onSendEmail={handleSendEmailClick}
                onUpdateStatus={handleUpdateStatusClick}
                onEdit={handleEditClick}
                onMarkNotEligible={handleMarkAsNotEligible}
              />
            </TabsContent>

            <TabsContent value="summary" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <CustomerInfoCard claim={claim} />
                <FlightInfoCard claim={claim} />
                <ClaimStatusCard claim={claim} />
              </div>

              <Separator className="my-6" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <IssueDetailsCard claim={claim} />
                <PaymentDetailsCard claim={claim} />
              </div>

              <Separator className="my-6" />

              <ActionButtons 
                onSendEmail={handleSendEmailClick}
                onUpdateStatus={handleUpdateStatusClick}
                onEdit={handleEditClick}
                onMarkNotEligible={handleMarkAsNotEligible}
              />
            </TabsContent>
            
            <TabsContent value="communication" className="mt-6">
              <CommunicationTab claim={claim} />
            </TabsContent>
            
            <TabsContent value="progress" className="mt-6">
              <ClaimProgressManager 
                claim={claim} 
                onUpdateProgress={handleUpdateProgress} 
              />
            </TabsContent>
            
            <TabsContent value="documents" className="mt-6">
              <div className="p-4 text-center text-gray-500">
                Document management features will be added soon.
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <NotEligibleModal 
        isOpen={isNotEligibleModalOpen}
        onClose={() => setIsNotEligibleModalOpen(false)}
        onConfirm={handleConfirmNotEligible}
        claimId={selectedClaim}
        customerName={claim.customer}
        flightNumber={claim.flightnumber}
        flightDate={claim.date}
      />
    </motion.div>
  );
};

export default ClaimDetailsSection;
