import React from 'react';
import { AlertTriangle, ArrowRight, FileClock, Plane } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface EligibilityResultModalProps {
  open: boolean;
  onClose: () => void;
  onContinue: () => void;
  departureAirport?: string;
  arrivalAirport?: string;
}

const EligibilityResultModal: React.FC<EligibilityResultModalProps> = ({
  open,
  onClose,
  onContinue,
  departureAirport,
  arrivalAirport,
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg p-0 gap-0 overflow-hidden">
        <div className="bg-gray-50 p-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-blue-900">
              Unfortunately, there's no compensation for this flight.
            </DialogTitle>
          </DialogHeader>

          <div className="mt-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="text-blue-500">
                <FileClock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-medium text-blue-900">
                Your flight details
              </h3>
            </div>

            <div className="h-px bg-gray-200 my-4"></div>

            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-semibold text-gray-500 uppercase mb-1">
                  DEPARTED
                </p>
                <p className="text-lg font-medium text-blue-900">
                  {departureAirport || 'Departure Airport'}
                </p>
              </div>

              <div className="text-gray-300">
                <Plane className="w-6 h-6 transform rotate-90" />
              </div>

              <div className="text-right">
                <p className="text-sm font-semibold text-gray-500 uppercase mb-1">
                  ARRIVED
                </p>
                <p className="text-lg font-medium text-blue-900">
                  {arrivalAirport || 'Arrival Airport'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          <p className="text-blue-900 mb-4">
            For cancellations, airlines don't have to pay compensation if they
            gave passengers 14 days notice, as it appears they have done in this
            case.
          </p>

          <p className="text-blue-900 font-medium mb-6">
            While we couldn't help this time, we're always here to help you
            understand your rights and check for compensation.
          </p>

          <Button onClick={onContinue} className="w-full">
            Continue anyway
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EligibilityResultModal;
