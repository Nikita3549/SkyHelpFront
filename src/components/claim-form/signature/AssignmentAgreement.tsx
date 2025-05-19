
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import DocumentContent from './agreement/DocumentContent';
import DocumentActions from './agreement/DocumentActions';
import { ClaimData } from './agreement/documentUtils';

interface AssignmentAgreementProps {
  isOpen: boolean;
  onClose: () => void;
  claimData: ClaimData;
  representativeName?: string;
  companyAddress?: string;
}

const AssignmentAgreement: React.FC<AssignmentAgreementProps> = ({
  isOpen,
  onClose,
  claimData,
  representativeName,
  companyAddress
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-xl font-bold text-center">Assignment Agreement</DialogTitle>
        </DialogHeader>
        
        <DocumentActions />
        <DocumentContent 
          claimData={claimData}
          representativeName={representativeName}
          companyAddress={companyAddress}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AssignmentAgreement;
