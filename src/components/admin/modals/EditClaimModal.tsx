
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Claim } from "@/lib/supabase";
import { FileText, Mail, Edit, CheckCircle2, X } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

type EditClaimModalProps = {
  isOpen: boolean;
  onClose: () => void;
  claim: Claim;
};

const EditClaimModal = ({ isOpen, onClose, claim }: EditClaimModalProps) => {
  const handleSendEmail = () => {
    toast({
      title: "Email sent successfully",
      description: `Notification email sent to ${claim.customer}`,
    });
  };

  const handleUpdateStatus = () => {
    toast({
      title: "Status updated",
      description: `Claim ${claim.id} status has been updated`,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
        <DialogHeader className="flex flex-row items-center justify-between">
          <div>
            <DialogTitle className="text-xl font-semibold">Claim Details: {claim.id}</DialogTitle>
            <p className="text-sm text-gray-500">{claim.customer}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-4 right-4"
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          {/* Customer Information Section */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-3 flex items-center">
              <FileText className="h-4 w-4 mr-1" />
              Customer Information
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Name:</span>
                <span className="font-medium">
                  {claim.customer}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Email:</span>
                <span className="font-medium">
                  {claim.email}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Phone:</span>
                <span className="font-medium">
                  {claim.phone || "N/A"}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Address:</span>
                <span className="font-medium">
                  {claim.address || "N/A"}
                </span>
              </div>
            </div>
          </div>

          {/* Flight Information Section */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-3 flex items-center">
              <FileText className="h-4 w-4 mr-1" />
              Flight Information
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Airline:</span>
                <span className="font-medium">
                  {claim.airline}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Flight Number:</span>
                <span className="font-medium">
                  {claim.flightnumber}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Date:</span>
                <span className="font-medium">
                  {claim.date}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Departure:</span>
                <span className="font-medium">
                  {claim.departureairport || "N/A"}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Arrival:</span>
                <span className="font-medium">
                  {claim.arrivalairport || "N/A"}
                </span>
              </div>
            </div>
          </div>

          {/* Claim Status Section */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-3 flex items-center">
              <FileText className="h-4 w-4 mr-1" />
              Claim Status
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Status:</span>
                <span className={`font-medium px-2 py-0.5 rounded-full text-xs ${
                  claim.status === "completed" ? "bg-green-100 text-green-800" :
                  claim.status === "rejected" ? "bg-red-100 text-red-800" :
                  "bg-blue-100 text-blue-800"
                }`}>
                  {claim.status.replace("_", " ").toUpperCase()}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Stage:</span>
                <span className="font-medium">
                  {claim.stage.replace("_", " ")}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Amount:</span>
                <span className="font-medium">
                  {claim.amount}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Last Updated:</span>
                <span className="font-medium">
                  {claim.lastupdated}
                </span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Issue Details Section */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-3 flex items-center">
              <FileText className="h-4 w-4 mr-1" />
              Issue Details
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Flight Issue:</span>
                <span className="font-medium">
                  {claim.flightissue || "N/A"}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Reason Given by Airline:</span>
                <span className="font-medium">
                  {claim.reasongivenbyairline || "N/A"}
                </span>
              </div>
              <div className="flex flex-col text-sm mb-2">
                <span className="text-gray-500 mb-1">Additional Information:</span>
                <span className="font-medium text-sm bg-gray-50 p-2 rounded-md min-h-[80px] whitespace-pre-wrap">
                  {claim.additionalinformation || "None provided"}
                </span>
              </div>
            </div>
          </div>

          {/* Payment Details Section */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-3 flex items-center">
              <FileText className="h-4 w-4 mr-1" />
              Payment Details
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Payment Method:</span>
                <span className="font-medium">
                  {(claim.paymentmethod || "N/A")
                    .replace("_", " ")
                    .replace(/\b\w/g, (l) => l.toUpperCase())}
                </span>
              </div>
              {claim.paymentmethod === "bank_transfer" && claim.paymentdetails && (
                <>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Bank Name:</span>
                    <span className="font-medium">{claim.paymentdetails.bankName || "N/A"}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Account Holder:</span>
                    <span className="font-medium">{claim.paymentdetails.accountHolderName || "N/A"}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">IBAN:</span>
                    <span className="font-medium">{claim.paymentdetails.iban || "N/A"}</span>
                  </div>
                </>
              )}
              {claim.paymentmethod === "paypal" && claim.paymentdetails && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">PayPal Email:</span>
                  <span className="font-medium">{claim.paymentdetails.paypalEmail || "N/A"}</span>
                </div>
              )}
              {claim.paymentmethod === "wise" && claim.paymentdetails && (
                <>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Account Holder:</span>
                    <span className="font-medium">{claim.paymentdetails.accountHolderName || "N/A"}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">IBAN/Account:</span>
                    <span className="font-medium">{claim.paymentdetails.ibanOrAccount || "N/A"}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Email:</span>
                    <span className="font-medium">{claim.paymentdetails.email || "N/A"}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="flex flex-wrap gap-2 justify-end">
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            View Documents
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleSendEmail}
          >
            <Mail className="h-4 w-4 mr-2" />
            Send Email
          </Button>
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4 mr-2" />
            Edit Claim
          </Button>
          <Button 
            size="sm"
            onClick={handleUpdateStatus}
          >
            <CheckCircle2 className="h-4 w-4 mr-2" />
            Update Status
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditClaimModal;
