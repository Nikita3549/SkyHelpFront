import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EligibilityResultProps {
  isEligible: boolean | null;
  onContinue: () => void;
  disruptionType?: string;
  notificationTime?: string;
  departureAirport?: string;
  arrivalAirport?: string;
}

const EligibilityResult: React.FC<EligibilityResultProps> = ({
  isEligible,
  onContinue,
  disruptionType,
  notificationTime,
  departureAirport,
  arrivalAirport,
}) => {
  if (isEligible === null) return null;

  // Special case for flight cancellations with 14+ days notice is now handled by the modal
  // so we don't need to duplicate it here

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      transition={{ duration: 0.3 }}
      className="mt-8"
    >
      {isEligible ? (
        <div className="bg-green-50 border border-green-100 rounded-lg p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-green-800">
                Good news! You are eligible for compensation
              </h3>
              <div className="mt-2 text-sm text-green-700">
                <p>
                  Based on your flight details, you could be entitled to
                  compensation under EU Regulation 261/2004.
                </p>
                <div className="mt-4">
                  <Button
                    onClick={onContinue}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Continue with your claim
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-yellow-500" />
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-yellow-800">
                You may not be eligible for compensation
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>
                  Based on the information provided, it appears that your
                  situation may not qualify for compensation under EU Regulation
                  261/2004, which requires delays of 3 hours or more.
                </p>
                <div className="mt-4">
                  <Button
                    onClick={onContinue}
                    variant="outline"
                    className="border-yellow-300 text-yellow-700 hover:bg-yellow-100 hover:text-yellow-800 hover:border-yellow-400 focus:ring-yellow-500"
                  >
                    Continue anyway
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default EligibilityResult;
