
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Clock, Plane, AlertCircle, CheckCircle2, XCircle, CircleSlash } from "lucide-react";

type StatusBadgeProps = {
  status: string;
};

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const statusConfig: Record<string, { label: string, variant: "default" | "outline" | "secondary" | "destructive", icon: React.ReactNode }> = {
    pending: {
      label: "Pending",
      variant: "outline",
      icon: <Clock className="h-3 w-3 mr-1" />,
    },
    in_progress: {
      label: "In Progress",
      variant: "secondary",
      icon: <Plane className="h-3 w-3 mr-1" />,
    },
    escalated: {
      label: "Escalated",
      variant: "default",
      icon: <AlertCircle className="h-3 w-3 mr-1" />,
    },
    completed: {
      label: "Completed",
      variant: "default",
      icon: <CheckCircle2 className="h-3 w-3 mr-1" />,
    },
    rejected: {
      label: "Rejected",
      variant: "destructive",
      icon: <XCircle className="h-3 w-3 mr-1" />,
    },
    not_eligible: {
      label: "Not Eligible",
      variant: "outline",
      icon: <CircleSlash className="h-3 w-3 mr-1" />,
    },
  };

  const { label, variant, icon } = statusConfig[status] || statusConfig.pending;

  return (
    <Badge variant={variant} className={`flex items-center ${status === 'not_eligible' ? 'bg-gray-400 text-white hover:bg-gray-500' : ''}`}>
      {icon}
      {label}
    </Badge>
  );
};

export default StatusBadge;
