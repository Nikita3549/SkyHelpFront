
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Eye, CreditCard } from "lucide-react";
import { Claim } from "@/lib/supabase";

type BookingLegalCardProps = {
  claim: Claim;
};

const BookingLegalCard = ({ claim }: BookingLegalCardProps) => {
  // Parse additional information
  let additionalInfo = {};
  try {
    if (claim.additionalinformation) {
      additionalInfo = JSON.parse(claim.additionalinformation);
    }
  } catch (e) {
    // Ignore parsing errors
  }

  const paymentDetails = claim.paymentdetails ? 
    (typeof claim.paymentdetails === 'string' ? JSON.parse(claim.paymentdetails) : claim.paymentdetails) 
    : {};

  const handleDownloadAgreement = () => {
    // Placeholder for agreement download functionality
    console.log("Download assignment agreement for claim:", claim.id);
  };

  const handleViewDocuments = () => {
    // Placeholder for document viewing functionality
    console.log("View uploaded documents for claim:", claim.id);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Booking & Legal Documents
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-500">Booking Reference (PNR)</label>
          <p className="text-sm font-medium">{(additionalInfo as any).bookingReference || "Not provided"}</p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-500">Assignment Agreement</label>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleDownloadAgreement}>
              <Download className="h-4 w-4 mr-1" />
              Download
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownloadAgreement}>
              <Eye className="h-4 w-4 mr-1" />
              View
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-500">Flight Documents</label>
          <div className="p-3 border rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-gray-400" />
                <span className="text-sm">Uploaded Documents</span>
              </div>
              <Button variant="outline" size="sm" onClick={handleViewDocuments}>
                <Eye className="h-4 w-4 mr-1" />
                View Files
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {(additionalInfo as any).uploadedDocuments?.length || 0} document(s) uploaded
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-gray-400" />
            <label className="text-sm font-medium text-gray-500">Payment Details</label>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Method:</span>
                <span className="text-sm font-medium">{claim.paymentmethod || "Not specified"}</span>
              </div>
              
              {claim.paymentmethod === "bank_transfer" && (
                <>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Bank Name:</span>
                    <span className="text-sm font-medium">{paymentDetails.bankName || "Not provided"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Account Holder:</span>
                    <span className="text-sm font-medium">{paymentDetails.accountHolderName || paymentDetails.accountName || "Not provided"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">IBAN:</span>
                    <span className="text-sm font-medium">{paymentDetails.iban || "Not provided"}</span>
                  </div>
                </>
              )}
              
              {claim.paymentmethod === "paypal" && (
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">PayPal Email:</span>
                  <span className="text-sm font-medium">{paymentDetails.paypalEmail || "Not provided"}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingLegalCard;
