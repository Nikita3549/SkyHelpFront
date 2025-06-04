import React from 'react';
import { Button } from '@/components/ui/button';
import { XCircle } from 'lucide-react';

type ErrorStateProps = {
  error: Error | null | unknown;
};

const ErrorState = ({ error }: ErrorStateProps) => {
  return (
    <div className="py-12 md:py-20 min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
      <div className="text-center max-w-md mx-auto">
        <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Error Loading Data</h2>
        <p className="text-gray-600 mb-4">
          {error instanceof Error
            ? error.message
            : 'Failed to load claims data. Please try again.'}
        </p>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    </div>
  );
};

export default ErrorState;
