
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import NewClaimForm from "./NewClaimForm";
import { Claim } from "@/hooks/use-claims";

type NewClaimModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (claimData: Omit<Claim, 'id' | 'created_at' | 'last_updated' | 'status' | 'stage'>) => void;
  isSubmitting?: boolean;
};

const NewClaimModal = ({ isOpen, onClose, onSubmit, isSubmitting }: NewClaimModalProps) => {
  const handleSubmit = (claimData: Omit<Claim, 'id' | 'created_at' | 'last_updated' | 'status' | 'stage'>) => {
    onSubmit(claimData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Создать новую заявку</DialogTitle>
          <DialogDescription>
            Заполните детали для создания новой заявки на компенсацию.
          </DialogDescription>
        </DialogHeader>
        <NewClaimForm 
          onSubmit={handleSubmit} 
          onCancel={onClose} 
          isSubmitting={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  );
};

export default NewClaimModal;
