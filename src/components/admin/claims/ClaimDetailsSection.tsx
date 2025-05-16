
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

type ClaimDetailsSectionProps = {
  selectedClaim: string | null;
  setSelectedClaim: (id: string | null) => void;
  claimsData: Claim[];
  handleSendEmail: (claimId: string) => void;
  handleUpdateStatus: (claimId: string, newStatus: string, reason?: string) => void;
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
  const [activeTab, setActiveTab] = useState("details");
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
  
  const handleConfirmNotEligible = (reason: string, additionalNotes?: string) => {
    handleUpdateStatus(selectedClaim, "not_eligible", reason);
    toast.success("Claim marked as not eligible", {
      description: `Reason: ${reason}`,
    });
  };

  return (
    <motion.div
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
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="details">Claim Details</TabsTrigger>
              <TabsTrigger value="communication">Communication</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="space-y-6">
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
      />
    </motion.div>
  );
};

export default ClaimDetailsSection;
