
import React from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { User, Plane, AlertCircle, Info, CreditCard, FileText, Mail, CheckCircle2, XCircle } from "lucide-react";
import StatusBadge from "./StatusBadge";
import { Claim } from "@/lib/supabase";

type ClaimDetailsSectionProps = {
  selectedClaim: string | null;
  setSelectedClaim: (id: string | null) => void;
  claimsData: Claim[];
  handleSendEmail: (claimId: string) => void;
  formatPaymentDetails: (claim: Claim | undefined) => string;
};

const ClaimDetailsSection = ({
  selectedClaim,
  setSelectedClaim,
  claimsData,
  handleSendEmail,
  formatPaymentDetails,
}: ClaimDetailsSectionProps) => {
  if (!selectedClaim) return null;

  const claim = claimsData.find((claim) => claim.id === selectedClaim);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <CardHeader className="flex flex-row items-start justify-between">
          <div>
            <CardTitle>Claim Details: {selectedClaim}</CardTitle>
            <CardDescription>
              {claim?.customer}
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSelectedClaim(null)}
          >
            <XCircle className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2 flex items-center">
                <User className="h-4 w-4 mr-1" />
                Customer Information
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Name:</span>
                  <span className="font-medium">
                    {claim?.customer}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Email:</span>
                  <span className="font-medium">
                    {claim?.email}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Phone:</span>
                  <span className="font-medium">
                    {claim?.phone || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Address:</span>
                  <span className="font-medium">
                    {claim?.address || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Passengers:</span>
                  <span className="font-medium">
                    {claim?.numberofpassengers || "1"}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2 flex items-center">
                <Plane className="h-4 w-4 mr-1" />
                Flight Information
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Airline:</span>
                  <span className="font-medium">
                    {claim?.airline}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Flight Number:</span>
                  <span className="font-medium">
                    {claim?.flightnumber}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Date:</span>
                  <span className="font-medium">
                    {new Date(claim?.date || "").toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Departure:</span>
                  <span className="font-medium">
                    {claim?.departureairport || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Arrival:</span>
                  <span className="font-medium">
                    {claim?.arrivalairport || "N/A"}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                Claim Status
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Status:</span>
                  <StatusBadge status={claim?.status || ""} />
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Stage:</span>
                  <span className="font-medium">
                    {claim?.stage
                      ?.replace("_", " ")
                      .replace(/\b\w/g, (l) => l.toUpperCase())}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Amount:</span>
                  <span className="font-medium">
                    {claim?.amount}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Last Updated:</span>
                  <span className="font-medium">
                    {new Date(claim?.lastupdated || "").toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2 flex items-center">
                <Info className="h-4 w-4 mr-1" />
                Issue Details
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Flight Issue:</span>
                  <span className="font-medium">
                    {claim?.flightissue || "N/A"}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Reason Given by Airline:</span>
                  <span className="font-medium">
                    {claim?.reasongivenbyairline || "N/A"}
                  </span>
                </div>
                <div className="flex flex-col text-sm mb-2">
                  <span className="text-gray-500 mb-1">Additional Information:</span>
                  <span className="font-medium text-sm bg-gray-50 p-2 rounded-md min-h-[50px] whitespace-pre-wrap">
                    {claim?.additionalinformation || "None provided"}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2 flex items-center">
                <CreditCard className="h-4 w-4 mr-1" />
                Payment Details
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Payment Method:</span>
                  <span className="font-medium">
                    {(claim?.paymentmethod || "N/A")
                      .replace("_", " ")
                      .replace(/\b\w/g, (l) => l.toUpperCase())}
                  </span>
                </div>
                <div className="flex flex-col text-sm">
                  <span className="text-gray-500 mb-1">Details:</span>
                  <span className="font-medium text-sm bg-gray-50 p-2 rounded-md min-h-[80px] whitespace-pre-wrap">
                    {formatPaymentDetails(claim)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="flex flex-wrap gap-2 justify-end">
            <Button variant="outline" size="sm">
              <FileText className="h-4 w-4 mr-2" />
              View Documents
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleSendEmail(selectedClaim)}>
              <Mail className="h-4 w-4 mr-2" />
              Send Email
            </Button>
            <Button size="sm">
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Update Status
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ClaimDetailsSection;
