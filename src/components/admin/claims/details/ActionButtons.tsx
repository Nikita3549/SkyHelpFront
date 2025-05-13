
import React from "react";
import { Button } from "@/components/ui/button";
import { FileText, Mail, Edit, CheckCircle2 } from "lucide-react";
import { Claim } from "@/lib/supabase";

type ActionButtonsProps = {
  onSendEmail: () => void;
  onUpdateStatus: () => void;
  onEdit: () => void;
};

const ActionButtons = ({ onSendEmail, onUpdateStatus, onEdit }: ActionButtonsProps) => {
  return (
    <div className="flex flex-wrap gap-2 justify-end">
      <Button variant="outline" size="sm">
        <FileText className="h-4 w-4 mr-2" />
        View Documents
      </Button>
      <Button 
        variant="outline" 
        size="sm"
        onClick={onSendEmail}
      >
        <Mail className="h-4 w-4 mr-2" />
        Send Email
      </Button>
      <Button 
        variant="outline" 
        size="sm"
        onClick={onEdit}
      >
        <Edit className="h-4 w-4 mr-2" />
        Edit Claim
      </Button>
      <Button 
        size="sm"
        onClick={onUpdateStatus}
      >
        <CheckCircle2 className="h-4 w-4 mr-2" />
        Update Status
      </Button>
    </div>
  );
};

export default ActionButtons;
