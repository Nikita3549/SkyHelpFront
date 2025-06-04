import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import NewClaimForm from './NewClaimForm';

type NewClaimModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (claimData: any) => void;
};

const NewClaimModal = ({ isOpen, onClose, onSubmit }: NewClaimModalProps) => {
  const handleSubmit = (claimData: any) => {
    onSubmit(claimData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-[90vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Flight Compensation Claim</DialogTitle>
          <DialogDescription>
            Fill in the details to create a new compensation claim.
          </DialogDescription>
        </DialogHeader>
        <NewClaimForm onSubmit={handleSubmit} onCancel={onClose} />
      </DialogContent>
    </Dialog>
  );
};

export default NewClaimModal;
