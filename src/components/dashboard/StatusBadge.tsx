import React from 'react';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle2, Clock, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ClaimStatus } from '@/components/claim-form/enums/claim-status.enum.ts';

interface StatusBadgeProps {
  status: ClaimStatus;
  className?: string;
}

const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const variants: Record<
    string,
    {
      variant: 'default' | 'outline' | 'secondary' | 'destructive';
      icon: React.ReactNode;
    }
  > = {
    completed: {
      variant: 'default',
      icon: <CheckCircle2 className="h-3 w-3 mr-1" />,
    },
    in_progress: {
      variant: 'secondary',
      icon: <Clock className="h-3 w-3 mr-1" />,
    },
    review: {
      variant: 'outline',
      icon: <FileText className="h-3 w-3 mr-1" />,
    },
    rejected: {
      variant: 'destructive',
      icon: <AlertCircle className="h-3 w-3 mr-1" />,
    },
  };

  const { variant, icon } = variants[status] || variants.review;

  return (
    <Badge variant={variant} className={cn('flex items-center', className)}>
      {icon}
      {status == ClaimStatus.COMPLETED && 'Completed'}
      {(status == ClaimStatus.IN_PROGRESS || status == ClaimStatus.ESCALATED) &&
        'In Progress'}
      {status == ClaimStatus.PENDING && 'Under Review'}
      {(status == ClaimStatus.REJECTED || status == ClaimStatus.NOT_ELIGIBLE) &&
        'Rejected'}
    </Badge>
  );
};

export default StatusBadge;
