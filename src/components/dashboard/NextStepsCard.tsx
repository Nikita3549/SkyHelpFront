
import React from "react";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Upload,
  Check,
  Clock,
  Download,
} from "lucide-react";

interface Claim {
  status: string;
  compensation: string;
}

interface NextStepsCardProps {
  claim: Claim;
  onUploadDocument: () => void;
}

const NextStepsCard = ({ claim, onUploadDocument }: NextStepsCardProps) => {
  return (
    <div className="col-span-full">
      <h3 className="text-sm font-medium text-gray-500 mb-2">Next Steps</h3>
      <div className="bg-gray-50 rounded-lg p-4">
        {claim.status === "review" && (
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
              <FileText className="h-3 w-3 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">Documents Required</p>
              <p className="text-xs text-gray-500 mt-1">
                Please upload the requested documents to proceed with your claim.
              </p>
              <Button onClick={onUploadDocument} variant="outline" size="sm" className="mt-3">
                <Upload className="mr-2 h-3 w-3" />
                Upload Documents
              </Button>
            </div>
          </div>
        )}
        
        {claim.status === "in_progress" && (
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
              <Clock className="h-3 w-3 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">Claim in Progress</p>
              <p className="text-xs text-gray-500 mt-1">
                We're working with the airline to process your claim. We'll update you on any developments.
              </p>
            </div>
          </div>
        )}
        
        {claim.status === "completed" && (
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
              <Check className="h-3 w-3 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium">Claim Completed</p>
              <p className="text-xs text-gray-500 mt-1">
                Your claim has been successfully processed and payment has been made.
              </p>
              <Button variant="outline" size="sm" className="mt-3">
                <Download className="mr-2 h-3 w-3" />
                Download Receipt
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NextStepsCard;
