
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Claim } from "@/lib/supabase";
import { X } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import CustomerInfoCard from "../claims/details/CustomerInfoCard";
import FlightInfoCard from "../claims/details/FlightInfoCard";
import ClaimStatusCard from "../claims/details/ClaimStatusCard";
import IssueDetailsCard from "../claims/details/IssueDetailsCard";
import PaymentDetailsCard from "../claims/details/PaymentDetailsCard";
import ActionButtons from "../claims/details/ActionButtons";

type EditClaimModalProps = {
  isOpen: boolean;
  onClose: () => void;
  claim: Claim;
  onSubmit?: (claimData: Partial<Claim>) => void;
};

const EditClaimModal = ({ isOpen, onClose, claim, onSubmit }: EditClaimModalProps) => {
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

  // Format payment details for PaymentDetailsCard
  const formatPaymentDetails = (claim: Claim | undefined) => {
    if (!claim || !claim.paymentdetails) return "No payment details provided";
    
    const details = claim.paymentdetails;
    
    if (claim.paymentmethod === "bank_transfer") {
      return [
        `Bank: ${details.bankName || 'N/A'}`,
        `Account Holder: ${details.accountHolderName || 'N/A'}`,
        `IBAN: ${details.iban || 'N/A'}`,
        details.accountNumber ? `Account Number: ${details.accountNumber}` : ''
      ].filter(Boolean).join('\n');
    } 
    else if (claim.paymentmethod === "paypal") {
      return `PayPal Email: ${details.paypalEmail || 'N/A'}`;
    } 
    else if (claim.paymentmethod === "wise") {
      return [
        `Account Holder: ${details.accountHolderName || 'N/A'}`,
        `IBAN/Account: ${details.ibanOrAccount || 'N/A'}`,
        `Email: ${details.email || 'N/A'}`
      ].filter(Boolean).join('\n');
    }
    
    return "No details available for the selected payment method";
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
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
          <PaymentDetailsCard claim={claim} formatPaymentDetails={formatPaymentDetails} />
        </div>

        <Separator className="my-6" />

        {/* Action Buttons */}
        <ActionButtons 
          onSendEmail={handleSendEmail} 
          onUpdateStatus={handleUpdateStatus} 
          onEdit={handleEdit}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditClaimModal;
