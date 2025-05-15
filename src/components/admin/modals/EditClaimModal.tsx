
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Claim } from "@/lib/supabase";
import { X } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import CustomerInfoCard from "../claims/details/CustomerInfoCard";
import FlightInfoCard from "../claims/details/FlightInfoCard";
import ClaimStatusCard from "../claims/details/ClaimStatusCard";
import IssueDetailsCard from "../claims/details/IssueDetailsCard";
import PaymentDetailsCard from "../claims/details/PaymentDetailsCard";
import ActionButtons from "../claims/details/ActionButtons";
import CommunicationTab from "../claims/details/CommunicationTab";

type EditClaimModalProps = {
  isOpen: boolean;
  onClose: () => void;
  claim: Claim;
  onSubmit?: (claimData: Partial<Claim>) => void;
};

const EditClaimModal = ({ isOpen, onClose, claim, onSubmit }: EditClaimModalProps) => {
  const [activeTab, setActiveTab] = useState("details");

  const handleSendEmail = () => {
    toast({
      title: "Email sent successfully",
      description: `Notification email sent to ${claim.customer}`,
    });
  };

  const handleUpdateStatus = () => {
    toast({
      title: "Status updated",
      description: `Claim ${claim.id} status has been updated`,
    });
  };

  const handleEdit = () => {
    if (onSubmit) {
      onSubmit(claim);
    }
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
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="details">Claim Details</TabsTrigger>
            <TabsTrigger value="communication">Communication Log</TabsTrigger>
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
            />
          </TabsContent>
          
          <TabsContent value="communication" className="mt-6">
            <CommunicationTab claim={claim} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default EditClaimModal;
