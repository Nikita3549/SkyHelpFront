import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import {
  Clock,
  Plane,
  FileText,
  Upload,
  Download,
  MessageSquare,
  Check,
  AlertCircle,
  Calendar,
  CreditCard,
  ExternalLink,
  ChevronRight,
  CheckCircle2,
  MoreHorizontal,
  User,
  MapPin,
  Phone,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useQuery } from "@tanstack/react-query";
import { claimsService } from "@/services/claimsService";

// Updated StatusBadge component to accept className prop
const StatusBadge = ({ status, className }: { status: string; className?: string }) => {
  const variants: Record<string, { variant: "default" | "outline" | "secondary" | "destructive", icon: React.ReactNode }> = {
    completed: {
      variant: "default",
      icon: <CheckCircle2 className="h-3 w-3 mr-1" />,
    },
    in_progress: {
      variant: "secondary",
      icon: <Clock className="h-3 w-3 mr-1" />,
    },
    review: {
      variant: "outline",
      icon: <FileText className="h-3 w-3 mr-1" />,
    },
    rejected: {
      variant: "destructive",
      icon: <AlertCircle className="h-3 w-3 mr-1" />,
    },
  };

  const { variant, icon } = variants[status] || variants.review;

  return (
    <Badge variant={variant} className={cn("flex items-center", className)}>
      {icon}
      {status === "completed" && "Completed"}
      {status === "in_progress" && "In Progress"}
      {status === "review" && "Under Review"}
      {status === "rejected" && "Rejected"}
    </Badge>
  );
};

const Dashboard = () => {
  // Use the actual claims data from Supabase
  const { data: claimsData = [], isLoading, error } = useQuery({
    queryKey: ['claims'],
    queryFn: claimsService.getClaims,
  });
  
  const [selectedClaimId, setSelectedClaimId] = useState(claimsData[0]?.id || "");
  const selectedClaim = claimsData.find((claim) => claim.id === selectedClaimId);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  // Function to generate message
  const generateNewMessage = () => {
    console.log("New message generated");
    // In a real app, this would open a message compose UI
  };

  // Function to upload document
  const uploadDocument = () => {
    console.log("Document upload triggered");
    // In a real app, this would open a file upload UI
  };

  // Set selectedClaimId when data loads if not already set
  React.useEffect(() => {
    if (claimsData.length > 0 && !selectedClaimId) {
      setSelectedClaimId(claimsData[0].id);
    }
  }, [claimsData, selectedClaimId]);

  if (isLoading) {
    return (
      <div className="py-12 md:py-20 min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your claims...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-12 md:py-20 min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Error Loading Claims</h2>
          <p className="text-gray-600 mb-4">
            {error instanceof Error ? error.message : "Failed to load your claims. Please try again."}
          </p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    );
  }

  if (claimsData.length === 0) {
    return (
      <div className="py-12 md:py-20 min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">No Claims Found</h2>
          <p className="text-gray-600 mb-4">
            You haven't submitted any claims yet. Start your first claim to get compensation for your flight issues.
          </p>
          <Link to="/claim">
            <Button>
              Start New Claim
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 md:py-20 min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container-custom">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold mb-2">My Claims Dashboard</h1>
            <p className="text-gray-600">
              Track and manage your flight compensation claims
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 md:mt-0"
          >
            <Link to="/claim">
              <Button>
                Start New Claim
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Claims List */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1"
          >
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>My Claims</CardTitle>
                <CardDescription>
                  {claimsData.length} {claimsData.length === 1 ? "claim" : "claims"} in total
                </CardDescription>
              </CardHeader>
              <CardContent>
                <motion.div
                  variants={container}
                  initial="hidden"
                  animate="show"
                  className="space-y-4"
                >
                  {claimsData.map((claim) => (
                    <motion.div
                      key={claim.id}
                      variants={item}
                      transition={{ duration: 0.3 }}
                    >
                      <Card
                        className={`cursor-pointer hover:shadow-md transition-shadow ${
                          selectedClaimId === claim.id
                            ? "border-primary shadow-md"
                            : ""
                        }`}
                        onClick={() => setSelectedClaimId(claim.id)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center">
                              <Plane className="h-4 w-4 text-primary mr-2" />
                              <span className="font-medium">{claim.airline}</span>
                            </div>
                            <StatusBadge status={claim.status} />
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-500">Flight</span>
                              <span className="text-sm font-medium">{claim.flightnumber}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-500">Date</span>
                              <span className="text-sm font-medium">{new Date(claim.date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-500">Compensation</span>
                              <span className="text-sm font-medium">{claim.amount}</span>
                            </div>
                          </div>
                          <div className="mt-3">
                            <div className="flex justify-between text-xs mb-1">
                              <span>Progress</span>
                              <span>{getProgressValue(claim.status)}%</span>
                            </div>
                            <Progress value={getProgressValue(claim.status)} className="h-1.5" />
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Claim Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            {selectedClaim && (
              <Card className="shadow-md h-full">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center">
                        Claim {selectedClaim.id}
                        <StatusBadge status={selectedClaim.status} className="ml-3" />
                      </CardTitle>
                      <CardDescription className="mt-1">
                        {selectedClaim.airline} · {selectedClaim.flightnumber} · {new Date(selectedClaim.date).toLocaleDateString()}
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
                        <DropdownMenuItem className="cursor-pointer" onClick={generateNewMessage}>
                          <MessageSquare className="mr-2 h-4 w-4" /> Contact support
                        </DropdownMenuItem>
                        {selectedClaim.status !== "completed" && (
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
                    
                    <TabsContent value="overview" className="p-6 pt-2">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-6">
                          <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-2">Customer Information</h3>
                            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-500">Name</span>
                                <span className="text-sm font-medium">{selectedClaim.customer}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-500">Email</span>
                                <span className="text-sm font-medium">{selectedClaim.email}</span>
                              </div>
                              {selectedClaim.phone && (
                                <div className="flex justify-between">
                                  <span className="text-sm text-gray-500">Phone</span>
                                  <span className="text-sm font-medium">{selectedClaim.phone}</span>
                                </div>
                              )}
                              {selectedClaim.address && (
                                <div className="flex justify-between">
                                  <span className="text-sm text-gray-500">Address</span>
                                  <span className="text-sm font-medium">{selectedClaim.address}</span>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-2">Flight Details</h3>
                            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-500">Airline</span>
                                <span className="text-sm font-medium">{selectedClaim.airline}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-500">Flight Number</span>
                                <span className="text-sm font-medium">{selectedClaim.flightnumber}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-500">Date</span>
                                <span className="text-sm font-medium">{new Date(selectedClaim.date).toLocaleDateString()}</span>
                              </div>
                              {selectedClaim.departureairport && selectedClaim.arrivalairport && (
                                <div className="flex justify-between">
                                  <span className="text-sm text-gray-500">Route</span>
                                  <span className="text-sm font-medium">{selectedClaim.departureairport} to {selectedClaim.arrivalairport}</span>
                                </div>
                              )}
                              {selectedClaim.numberofpassengers && (
                                <div className="flex justify-between">
                                  <span className="text-sm text-gray-500">Passengers</span>
                                  <span className="text-sm font-medium">{selectedClaim.numberofpassengers}</span>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          {selectedClaim.flightissue && (
                            <div>
                              <h3 className="text-sm font-medium text-gray-500 mb-2">Issue Information</h3>
                              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                                <div className="flex justify-between">
                                  <span className="text-sm text-gray-500">Issue Type</span>
                                  <span className="text-sm font-medium capitalize">{selectedClaim.flightissue}</span>
                                </div>
                                {selectedClaim.reasongivenbyairline && (
                                  <div className="flex justify-between">
                                    <span className="text-sm text-gray-500">Airline Reason</span>
                                    <span className="text-sm font-medium">{selectedClaim.reasongivenbyairline}</span>
                                  </div>
                                )}
                                {selectedClaim.additionalinformation && (
                                  <div>
                                    <span className="text-sm text-gray-500">Additional Information</span>
                                    <p className="text-sm mt-1 bg-white p-2 rounded border">{selectedClaim.additionalinformation}</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                        
                        <div className="space-y-6">
                          <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-2">Claim Progress</h3>
                            <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                              <div>
                                <div className="flex justify-between text-sm mb-1">
                                  <span>Status</span>
                                  <span className="font-medium capitalize">{selectedClaim.status.replace("_", " ")}</span>
                                </div>
                                <Progress value={getProgressValue(selectedClaim.status)} className="h-2" />
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-500">Stage</span>
                                <span className="text-sm font-medium capitalize">{selectedClaim.stage.replace("_", " ")}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-500">Last Update</span>
                                <span className="text-sm font-medium">{selectedClaim.lastupdated}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-2">Compensation Details</h3>
                            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-500">Amount</span>
                                <span className="text-lg font-semibold text-primary">{selectedClaim.amount}</span>
                              </div>
                              <Separator />
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-500">Our Fee (25%)</span>
                                <span className="text-sm font-medium">
                                  {selectedClaim.amount.startsWith("€") 
                                    ? "€" + (parseFloat(selectedClaim.amount.substring(1)) * 0.25).toFixed(2)
                                    : "Calculated on settlement"}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-500">You Receive</span>
                                <span className="text-sm font-medium">
                                  {selectedClaim.amount.startsWith("€") 
                                    ? "€" + (parseFloat(selectedClaim.amount.substring(1)) * 0.75).toFixed(2)
                                    : "Calculated on settlement"}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          {selectedClaim.paymentmethod && (
                            <div>
                              <h3 className="text-sm font-medium text-gray-500 mb-2">Payment Method</h3>
                              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                                <div className="flex justify-between">
                                  <span className="text-sm text-gray-500">Method</span>
                                  <span className="text-sm font-medium capitalize">{selectedClaim.paymentmethod}</span>
                                </div>
                                {selectedClaim.paymentdetails && (
                                  <div>
                                    <span className="text-sm text-gray-500">Payment Details</span>
                                    <div className="text-sm mt-1 bg-white p-2 rounded border">
                                      {Object.entries(selectedClaim.paymentdetails).map(([key, value]) => (
                                        <div key={key} className="flex justify-between border-b last:border-0 py-1">
                                          <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                                          <span>{String(value)}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                          
                          <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-2">Next Steps</h3>
                            <div className="bg-gray-50 rounded-lg p-4">
                              {renderNextStepsBasedOnStatus(selectedClaim.status)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="documents" className="p-6 pt-2">
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-sm font-medium text-gray-500 mb-4">Required Documents</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* @ts-expect-error */}
                            {selectedClaim.documents?.map((doc, index) => (
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
                                      <Button onClick={uploadDocument} size="sm" variant="outline">
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
                          <Button onClick={generateNewMessage} size="sm" variant="outline">
                            <MessageSquare className="mr-2 h-4 w-4" />
                            New Message
                          </Button>
                        </div>
                        
                        <div className="space-y-4">
                          {/* @ts-expect-error */}
                          {selectedClaim.messages?.map((message, index) => (
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
                        
                        {/* @ts-expect-error */}
                        {selectedClaim.messages?.length === 0 && (
                          <div className="text-center py-8">
                            <p className="text-gray-500">No messages yet</p>
                          </div>
                        )}
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>

                <CardFooter className="flex justify-between border-t p-6">
                  <div className="text-sm text-gray-500">
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Claim opened: {new Date(selectedClaim.date).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div>
                    <Button variant="outline" size="sm" onClick={generateNewMessage}>
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Contact Support
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Helper function to get progress percentage based on status
function getProgressValue(status: string): number {
  switch (status) {
    case "pending": return 10;
    case "in_progress": return 50;
    case "escalated": return 75;
    case "completed": return 100;
    case "rejected": return 100;
    default: return 0;
  }
}

// Helper function to render next steps based on claim status
function renderNextStepsBasedOnStatus(status: string) {
  switch (status) {
    case "pending":
      return (
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
            <FileText className="h-3 w-3 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium">Claim Under Review</p>
            <p className="text-xs text-gray-500 mt-1">
              We're reviewing your claim details and will update you soon.
            </p>
          </div>
        </div>
      );
    case "in_progress":
      return (
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
      );
    case "escalated":
      return (
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 h-6 w-6 rounded-full bg-orange-100 flex items-center justify-center mt-0.5">
            <AlertCircle className="h-3 w-3 text-orange-600" />
          </div>
          <div>
            <p className="text-sm font-medium">Claim Escalated</p>
            <p className="text-xs text-gray-500 mt-1">
              Your claim has been escalated for additional review. This may involve legal proceedings.
            </p>
          </div>
        </div>
      );
    case "completed":
      return (
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
            <Check className="h-3 w-3 text-green-600" />
          </div>
          <div>
            <p className="text-sm font-medium">Claim Completed</p>
            <p className="text-xs text-gray-500 mt-1">
              Your claim has been successfully processed and payment has been made.
            </p>
          </div>
        </div>
      );
    case "rejected":
      return (
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 h-6 w-6 rounded-full bg-red-100 flex items-center justify-center mt-0.5">
            <XCircle className="h-3 w-3 text-red-600" />
          </div>
          <div>
            <p className="text-sm font-medium">Claim Rejected</p>
            <p className="text-xs text-gray-500 mt-1">
              Unfortunately, your claim has been rejected. If you believe this is in error, please contact support.
            </p>
          </div>
        </div>
      );
    default:
      return (
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center mt-0.5">
            <FileText className="h-3 w-3 text-gray-600" />
          </div>
          <div>
            <p className="text-sm font-medium">Claim Processing</p>
            <p className="text-xs text-gray-500 mt-1">
              We're working on your claim. Check back for updates.
            </p>
          </div>
        </div>
      );
  }
}

export default Dashboard;
