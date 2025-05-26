
import React from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreHorizontal,
  Download,
  MessageSquare,
  AlertCircle,
  FileText,
  Upload,
  Check,
  Clock,
  User,
} from "lucide-react";
import StatusBadge from "./StatusBadge";
import ClaimProgressTimeline from "./ClaimProgressTimeline";
import MessageWritingZone from "./MessageWritingZone";

interface Claim {
  id: string;
  airline: string;
  flightNumber: string;
  departureDate: string;
  route: string;
  status: string;
  statusText: string;
  compensation: string;
  progress: number;
  lastUpdate: string;
  estimatedCompletion?: string;
  paymentDate?: string;
  documents: Array<{ name: string; status: string }>;
  messages: Array<{ date: string; content: string; isFromTeam: boolean }>;
}

interface ClaimDetailsProps {
  claim: Claim;
  messageText: string;
  onMessageChange: (text: string) => void;
  onSendMessage: () => void;
  onContactSupport: () => void;
  onUploadDocument: () => void;
  onGenerateNewMessage: () => void;
}

const ClaimDetails = ({
  claim,
  messageText,
  onMessageChange,
  onSendMessage,
  onContactSupport,
  onUploadDocument,
  onGenerateNewMessage,
}: ClaimDetailsProps) => {
  // Get status-based progress steps
  const getProgressSteps = (claim: Claim) => {
    const baseSteps = [
      {
        id: "received",
        title: "Claim Received",
        description: "We've received your claim and started the review process.",
        date: new Date(claim.departureDate).toLocaleDateString(),
        status: "completed" as const,
      },
      {
        id: "verified",
        title: "Documents Verified",
        description: "Your documents have been reviewed and approved.",
        date: claim.status !== "review" ? new Date(claim.lastUpdate).toLocaleDateString() : undefined,
        status: claim.status === "review" ? "current" as const : "completed" as const,
      },
      {
        id: "contacted",
        title: "Airline Contacted",
        description: "We've sent your compensation request to the airline.",
        date: claim.status === "completed" || claim.status === "in_progress" ? new Date(claim.lastUpdate).toLocaleDateString() : undefined,
        status: claim.status === "review" ? "upcoming" as const : claim.status === "in_progress" ? "current" as const : "completed" as const,
      },
      {
        id: "awaiting",
        title: "Awaiting Response",
        description: "We are waiting for a response from the airline.",
        date: claim.status === "completed" ? new Date(claim.lastUpdate).toLocaleDateString() : undefined,
        status: claim.status !== "completed" && claim.status !== "in_progress" ? "upcoming" as const : claim.status === "in_progress" ? "current" as const : "completed" as const,
      }
    ];

    // Add final step based on claim status
    if (claim.status === "completed") {
      baseSteps.push({
        id: "completed",
        title: "Compensation Paid",
        description: `Your compensation of ${claim.compensation} has been processed.`,
        date: claim.paymentDate ? new Date(claim.paymentDate).toLocaleDateString() : undefined,
        status: "completed" as const,
      });
    } else {
      baseSteps.push({
        id: "pending",
        title: "Compensation Pending",
        description: "Once approved, your compensation will be processed.",
        date: undefined,
        status: "upcoming" as const,
      });
    }

    return baseSteps;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="lg:col-span-2"
    >
      <Card className="shadow-md h-full">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="flex items-center">
                Claim {claim.id}
                <StatusBadge status={claim.status} className="ml-3" />
              </CardTitle>
              <CardDescription className="mt-1">
                {claim.airline} · {claim.flightNumber} · {new Date(claim.departureDate).toLocaleDateString()}
              </CardDescription>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Options</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <Download className="mr-2 h-4 w-4" /> Export claim details
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" onClick={onContactSupport}>
                  <MessageSquare className="mr-2 h-4 w-4" /> Contact support
                </DropdownMenuItem>
                {claim.status !== "completed" && (
                  <DropdownMenuItem className="cursor-pointer text-destructive">
                    <AlertCircle className="mr-2 h-4 w-4" /> Cancel claim
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <Tabs defaultValue="overview">
            <TabsList className="mx-6 mb-2">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="px-6 pt-2 pb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Flight Details</h3>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Route</span>
                        <span className="text-sm font-medium">{claim.route}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Flight Number</span>
                        <span className="text-sm font-medium">{claim.flightNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Date</span>
                        <span className="text-sm font-medium">{new Date(claim.departureDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Compensation Details</h3>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Amount</span>
                        <span className="text-lg font-semibold text-primary">{claim.compensation}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Our Fee (25%)</span>
                        <span className="text-sm font-medium">
                          {claim.compensation.startsWith("€") 
                            ? "€" + (parseFloat(claim.compensation.substring(1)) * 0.25).toFixed(2)
                            : "Calculated on settlement"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">You Receive</span>
                        <span className="text-sm font-medium">
                          {claim.compensation.startsWith("€") 
                            ? "€" + (parseFloat(claim.compensation.substring(1)) * 0.75).toFixed(2)
                            : "Calculated on settlement"}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
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
                </div>
              </div>
              
              <ClaimProgressTimeline 
                steps={getProgressSteps(claim)}
                claimOpenedDate={new Date(claim.departureDate).toLocaleDateString()}
                onContactSupport={onContactSupport}
              />
            </TabsContent>
            
            <TabsContent value="documents" className="p-6 pt-2">
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-4">Required Documents</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {claim.documents.map((doc, index) => (
                      <Card key={index} className="overflow-hidden">
                        <CardContent className="p-0">
                          <div className="flex items-center justify-between p-4">
                            <div className="flex items-center">
                              <FileText className="h-5 w-5 text-gray-400 mr-3" />
                              <div>
                                <p className="font-medium">{doc.name}</p>
                                <p className="text-xs text-gray-500 mt-0.5">
                                  {doc.status === "uploaded" ? "Uploaded" : "Required"}
                                </p>
                              </div>
                            </div>
                            
                            {doc.status === "uploaded" ? (
                              <Badge variant="outline" className="text-green-600 bg-green-50 border-green-200">
                                <Check className="h-3 w-3 mr-1" />
                                Uploaded
                              </Badge>
                            ) : (
                              <Button onClick={onUploadDocument} size="sm" variant="outline">
                                <Upload className="h-3 w-3 mr-1" />
                                Upload
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-4">Document Guidelines</h3>
                  <Card>
                    <CardContent className="p-4 text-sm">
                      <ul className="space-y-2 text-gray-600">
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                          <span>Please upload documents in PDF, JPG, or PNG format</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                          <span>Maximum file size is 10MB per document</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                          <span>Ensure all documents are clearly legible</span>
                        </li>
                        <li className="flex items-start">
                          <Check className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                          <span>ID documents must match the passenger name in the claim</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="messages" className="p-6 pt-2">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-medium text-gray-500">Communication History</h3>
                  <Button onClick={onGenerateNewMessage} size="sm" variant="outline">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    New Message
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {claim.messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.isFromTeam ? "justify-start" : "justify-end"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-4 ${
                          message.isFromTeam
                            ? "bg-white border shadow-sm"
                            : "bg-primary text-white"
                        }`}
                      >
                        <div className="flex items-center mb-2">
                          {message.isFromTeam ? (
                            <>
                              <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                                <User className="h-3 w-3 text-primary" />
                              </div>
                              <span className="text-xs font-medium">
                                Support Team
                              </span>
                            </>
                          ) : (
                            <span className="text-xs font-medium">You</span>
                          )}
                          <span className="text-xs ml-auto opacity-70">
                            {new Date(message.date).toLocaleDateString()}
                          </span>
                        </div>
                        <p className={`text-sm ${message.isFromTeam ? "text-gray-700" : "text-white"}`}>
                          {message.content}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {claim.messages.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No messages yet</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>

        <CardFooter className="flex flex-col border-t p-6 space-y-4">
          <MessageWritingZone
            messageText={messageText}
            onMessageChange={onMessageChange}
            onSendMessage={onSendMessage}
          />
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ClaimDetails;
