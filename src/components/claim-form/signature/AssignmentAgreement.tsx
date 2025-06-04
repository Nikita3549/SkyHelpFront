import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import DocumentContent from './agreement/DocumentContent';
import DocumentActions from './agreement/DocumentActions';
import { ClaimData } from './agreement/documentUtils';
import './agreement/agreementStyles.css';

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
  representativeName = 'Max Iliasov',
  companyAddress = 'bd.mosova 16',
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto print-container p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-xl font-bold text-center">
            Assignment Agreement
          </DialogTitle>
        </DialogHeader>

        <DocumentActions />
        <div className="print-friendly-wrapper">
          <DocumentContent
            claimData={claimData}
            representativeName={representativeName}
            companyAddress={companyAddress}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AssignmentAgreement;
