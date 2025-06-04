import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Clock, FileText, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: string;
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
      {status === 'completed' && 'Completed'}
      {status === 'in_progress' && 'In Progress'}
      {status === 'review' && 'Under Review'}
      {status === 'rejected' && 'Rejected'}
    </Badge>
  );
};

export default StatusBadge;
