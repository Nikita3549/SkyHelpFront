import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { Claim } from '@/lib/supabase';
import { toast } from 'sonner';
import TabsContainer from './TabsContainer';
import { EmailData } from '../NotEligibleModal';
import NotEligibleModal from '../NotEligibleModal';
import { MessageEntry } from '@/hooks/useClaimsOperations';
import { IClaimUpdate } from '@/components/claim-form/interfaces/claim-update.interface.ts';

type EditClaimModalProps = {
  isOpen: boolean;
  onClose: () => void;
  claim: Claim;
  onSubmit?: (claimData: Partial<Claim>) => void;
};

const EditClaimModal = ({
  isOpen,
  onClose,
  claim,
  onSubmit,
}: EditClaimModalProps) => {
  const [activeTab, setActiveTab] = useState('details');
  const [isNotEligibleModalOpen, setIsNotEligibleModalOpen] = useState(false);
  const [localClaim, setLocalClaim] = useState<Claim>(claim);

  // Update local claim when prop changes
  React.useEffect(() => {
    setLocalClaim(claim);
  }, [claim]);

  const handleSendEmail = () => {};

  const handleUpdateStatus = () => {
    setLocalClaim(localClaim);
  };

  const handleEdit = () => {
    if (onSubmit) {
      onSubmit(localClaim);
    }
  };

  const handleMarkAsNotEligible = () => {
    setIsNotEligibleModalOpen(true);
  };

  const handleConfirmNotEligible = (
    reason: string,
    additionalNotes?: string,
    emailData?: EmailData,
  ) => {
    // Update claim data
    const updatedClaim: Partial<Claim> = {
      ...localClaim,
      status: 'not_eligible',
      additionalinformation: `Not eligible reason: ${reason}`,
      lastupdated: new Date().toISOString().split('T')[0],
    };

    // If email is being sent, add to communication log
    if (emailData && emailData.sendEmail) {
      const currentDate = new Date().toISOString();

      let communicationLog = [];
      try {
        if (localClaim.communicationlog) {
          communicationLog = JSON.parse(localClaim.communicationlog);
        }
      } catch (e) {
        console.error('Error parsing communication log', e);
      }

      // Add new email to log
      communicationLog.push({
        date: currentDate,
        type: 'email',
        direction: 'outgoing',
        subject: emailData.subject,
        body: emailData.body,
        status: 'sent',
      });

      // Also add a system message about status change
      communicationLog.push({
        date: currentDate,
        type: 'message',
        direction: 'system',
        sender: 'system',
        content: `Claim status changed to Not Eligible. Reason: ${reason}`,
        read: true,
      });

      updatedClaim.communicationlog = JSON.stringify(communicationLog);

      toast.success('Email sent to customer', {
        description: `Explaining the ineligibility reason: ${reason}`,
      });
    } else {
      toast.success('Claim marked as not eligible', {
        description: `Reason: ${reason}`,
      });
    }

    // Update local claim
    setLocalClaim(updatedClaim as Claim);

    // Submit the updated claim data
    if (onSubmit) {
      onSubmit(updatedClaim);
    }

    setIsNotEligibleModalOpen(false);
  };

  const handleUpdateClaim = (updates: Partial<Claim>) => {
    // const updatedClaim = {
    //   ...localClaim,
    //   ...updates,
    //   lastupdated: new Date().toISOString().split('T')[0],
    // };
    //
    // setLocalClaim(updatedClaim);
    //
    // if (onSubmit) {
    //   onSubmit(updatedClaim);
    // }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="min-w-[90vw] max-h-[90vh] overflow-auto">
        <DialogHeader className="flex flex-row items-center justify-between">
          <div>
            <DialogTitle className="text-xl font-semibold">
              Claim Details: {localClaim.id}
            </DialogTitle>
            <p className="text-sm text-gray-500">{localClaim.customer}</p>
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
          claim={localClaim}
          onSendEmail={handleSendEmail}
          onUpdateStatus={handleUpdateStatus}
          onEdit={handleEdit}
          onMarkNotEligible={handleMarkAsNotEligible}
          onUpdateClaim={handleUpdateClaim}
        />

        <NotEligibleModal
          isOpen={isNotEligibleModalOpen}
          onClose={() => setIsNotEligibleModalOpen(false)}
          onConfirm={handleConfirmNotEligible}
          claimId={localClaim.id}
          customerName={localClaim.customer}
          flightNumber={localClaim.flightnumber}
          flightDate={localClaim.date}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditClaimModal;
