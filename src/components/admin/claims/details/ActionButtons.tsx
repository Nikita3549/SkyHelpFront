import React from 'react';
import { Button } from '@/components/ui/button';
import { Mail, AlertCircle, Edit, Ban } from 'lucide-react';

type ActionButtonsProps = {
  onSendEmail: () => void;
  onUpdateStatus: () => void;
  onEdit: () => void;
  onMarkNotEligible?: () => void;
};

const ActionButtons = ({
  onSendEmail,
  onUpdateStatus,
  onEdit,
  onMarkNotEligible,
}: ActionButtonsProps) => {
  return (
    <div className="flex flex-wrap gap-2 justify-end">
      <Button
        variant="outline"
        onClick={onSendEmail}
        className="flex items-center"
      >
        <Mail className="mr-2 h-4 w-4" />
        Send Email
      </Button>
      <Button
        variant="outline"
        onClick={onUpdateStatus}
        className="flex items-center"
      >
        <AlertCircle className="mr-2 h-4 w-4" />
        Update Status
      </Button>
      <Button variant="outline" onClick={onEdit} className="flex items-center">
        <Edit className="mr-2 h-4 w-4" />
        Edit Claim
      </Button>
      {onMarkNotEligible && (
        <Button
          variant="outline"
          onClick={onMarkNotEligible}
          className="flex items-center"
        >
          <Ban className="mr-2 h-4 w-4" />
          Mark as Not Eligible
        </Button>
      )}
    </div>
  );
};

export default ActionButtons;
