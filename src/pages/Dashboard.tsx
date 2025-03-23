
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
  XCircle,
  Loader2,
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
import { claimsService } from "@/services/claimsService";
import { useQuery } from "@tanstack/react-query";
import { Claim } from "@/lib/supabase";

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
    pending: {
      variant: "outline", 
      icon: <FileText className="h-3 w-3 mr-1" />,
    },
    review: {
      variant: "outline",
      icon: <FileText className="h-3 w-3 mr-1" />,
    },
    rejected: {
      variant: "destructive",
      icon: <AlertCircle className="h-3 w-3 mr-1" />,
    },
    escalated: {
      variant: "secondary",
      icon: <AlertCircle className="h-3 w-3 mr-1" />,
    },
  };

  const { variant, icon } = variants[status] || variants.review;

  return (
    <Badge variant={variant} className={cn("flex items-center", className)}>
      {icon}
      {status === "completed" && "Completed"}
      {status === "in_progress" && "In Progress"}
      {status === "pending" && "Pending"}
      {status === "review" && "Under Review"}
      {status === "rejected" && "Rejected"}
      {status === "escalated" && "Escalated"}
    </Badge>
  );
};

const Dashboard = () => {
  // Fetch claims from Supabase
  const { data: claims = [], isLoading, error } = useQuery({
    queryKey: ['user-claims'],
    queryFn: claimsService.getClaims,
  });

  const [selectedClaimId, setSelectedClaimId] = useState<string | null>(null);
  const selectedClaim = claims.length > 0 
    ? claims.find((claim) => claim.id === selectedClaimId) || claims[0]
    : null;

  // If claims are loaded but none are selected, select the first one
  React.useEffect(() => {
    if (claims.length > 0 && !selectedClaimId) {
      setSelectedClaimId(claims[0].id);
    }
  }, [claims, selectedClaimId]);

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

  // Loading state
  if (isLoading) {
    return (
      <div className="py-12 md:py-20 min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-gray-600">Loading your claims...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="py-12 md:py-20 min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Error Loading Data</h2>
          <p className="text-gray-600 mb-4">
            {error instanceof Error ? error.message : "Failed to load claims data. Please try again."}
          </p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    );
  }

  // Empty state - no claims
  if (claims.length === 0) {
    return (
      <div className="py-12 md:py-20 min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold mb-2">My Claims Dashboard</h1>
            <p className="text-gray-600">
              Track and manage your flight compensation claims
            </p>
          </motion.div>

          <div className="flex flex-col items-center justify-center py-16 text-center">
            <FileText className="h-16 w-16 text-gray-300 mb-6" />
            <h2 className="text-2xl font-bold mb-2">No Claims Yet</h2>
            <p className="text-gray-600 mb-8 max-w-md">
              You haven't submitted any claims yet. Start your first claim to get compensation for your disrupted flight.
            </p>
            <Link to="/claim">
              <Button size="lg">
                Start New Claim
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
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
                  {claims.length} {claims.length === 1 ? "claim" : "claims"} in total
                </CardDescription>
              </CardHeader>
              <CardContent>
                <motion.div
                  variants={container}
                  initial="hidden"
                  animate="show"
                  className="space-y-4"
                >
                  {claims.map((claim) => (
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
                              <span>{claim.status === "completed" ? "100" : claim.status === "in_progress" ? "60" : claim.status === "pending" ? "30" : "50"}%</span>
                            </div>
                            <Progress value={claim.status === "completed" ? 100 : claim.status === "in_progress" ? 60 : claim.status === "pending" ? 30 : 50} className="h-1.5" />
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
                            <h3 className="text-sm font-medium text-gray-500 mb-2">Flight Details</h3>
                            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-500">Route</span>
                                <span className="text-sm font-medium">
                                  {selectedClaim.departureairport || "N/A"} to {selectedClaim.arrivalairport || "N/A"}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-500">Flight Number</span>
                                <span className="text-sm font-medium">{selectedClaim.flightnumber}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-500">Date</span>
                                <span className="text-sm font-medium">{new Date(selectedClaim.date).toLocaleDateString()}</span>
                              </div>
                              {selectedClaim.flightissue && (
                                <div className="flex justify-between">
                                  <span className="text-sm text-gray-500">Issue</span>
                                  <span className="text-sm font-medium capitalize">{selectedClaim.flightissue}</span>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-2">Claim Progress</h3>
                            <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                              <div>
                                <div className="flex justify-between text-sm mb-1">
                                  <span>Status</span>
                                  <span className="font-medium capitalize">{selectedClaim.status.replace('_', ' ')}</span>
                                </div>
                                <Progress value={selectedClaim.status === "completed" ? 100 : selectedClaim.status === "in_progress" ? 60 : selectedClaim.status === "pending" ? 30 : 50} className="h-2" />
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-500">Last Update</span>
                                <span className="text-sm font-medium">{new Date(selectedClaim.lastupdated).toLocaleDateString()}</span>
                              </div>
                              {selectedClaim.status !== "completed" && (
                                <div className="flex justify-between">
                                  <span className="text-sm text-gray-500">Estimated Completion</span>
                                  <span className="text-sm font-medium">
                                    {new Date(
                                      new Date(selectedClaim.date).getTime() + 
                                      (selectedClaim.status === "in_progress" ? 30 : 60) * 24 * 60 * 60 * 1000
                                    ).toLocaleDateString()}
                                  </span>
                                </div>
                              )}
                              {selectedClaim.status === "completed" && (
                                <div className="flex justify-between">
                                  <span className="text-sm text-gray-500">Payment Date</span>
                                  <span className="text-sm font-medium">{new Date(selectedClaim.lastupdated).toLocaleDateString()}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-6">
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
                              {selectedClaim.paymentmethod && (
                                <div className="flex justify-between">
                                  <span className="text-sm text-gray-500">Payment Method</span>
                                  <span className="text-sm font-medium capitalize">{selectedClaim.paymentmethod.replace('_', ' ')}</span>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-2">Next Steps</h3>
                            <div className="bg-gray-50 rounded-lg p-4">
                              {selectedClaim.status === "pending" && (
                                <div className="flex items-start space-x-3">
                                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
                                    <FileText className="h-3 w-3 text-primary" />
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium">Claim Under Initial Review</p>
                                    <p className="text-xs text-gray-500 mt-1">
                                      Our team is reviewing your claim details. We'll update you once we begin processing with the airline.
                                    </p>
                                    <Button onClick={generateNewMessage} variant="outline" size="sm" className="mt-3">
                                      <MessageSquare className="mr-2 h-3 w-3" />
                                      Contact Support
                                    </Button>
                                  </div>
                                </div>
                              )}
                              
                              {selectedClaim.status === "in_progress" && (
                                <div className="flex items-start space-x-3">
                                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
                                    <Clock className="h-3 w-3 text-primary" />
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium">Claim in Progress</p>
                                    <p className="text-xs text-gray-500 mt-1">
                                      We're working with the airline to process your claim. We'll update you on any developments.
                                    </p>
                                    <Button onClick={generateNewMessage} variant="outline" size="sm" className="mt-3">
                                      <MessageSquare className="mr-2 h-3 w-3" />
                                      Contact Support
                                    </Button>
                                  </div>
                                </div>
                              )}
                              
                              {selectedClaim.status === "completed" && (
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
                              
                              {selectedClaim.status === "rejected" && (
                                <div className="flex items-start space-x-3">
                                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-red-100 flex items-center justify-center mt-0.5">
                                    <AlertCircle className="h-3 w-3 text-red-600" />
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium">Claim Rejected</p>
                                    <p className="text-xs text-gray-500 mt-1">
                                      Unfortunately, your claim has been rejected. Please contact our support team for more information.
                                    </p>
                                    <Button onClick={generateNewMessage} variant="outline" size="sm" className="mt-3">
                                      <MessageSquare className="mr-2 h-3 w-3" />
                                      Contact Support
                                    </Button>
                                  </div>
                                </div>
                              )}
                              
                              {selectedClaim.status === "escalated" && (
                                <div className="flex items-start space-x-3">
                                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-amber-100 flex items-center justify-center mt-0.5">
                                    <AlertCircle className="h-3 w-3 text-amber-600" />
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium">Claim Escalated</p>
                                    <p className="text-xs text-gray-500 mt-1">
                                      Your claim has been escalated for further review. Our legal team is now handling your case.
                                    </p>
                                    <Button onClick={generateNewMessage} variant="outline" size="sm" className="mt-3">
                                      <MessageSquare className="mr-2 h-3 w-3" />
                                      Contact Support
                                    </Button>
                                  </div>
                                </div>
                              )}
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
                            {[
                              { name: "Boarding Pass", status: "requested" },
                              { name: "Flight Ticket", status: "requested" },
                              { name: "ID Document", status: "requested" }
                            ].map((doc, index) => (
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
                        
                        <div className="text-center py-8">
                          <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                          <p className="text-gray-500">No messages yet</p>
                          <p className="text-sm text-gray-400 mt-1">
                            Send a message to our support team if you have any questions
                          </p>
                          <Button onClick={generateNewMessage} size="sm" variant="outline" className="mt-4">
                            <MessageSquare className="mr-2 h-4 w-4" />
                            Start Conversation
                          </Button>
                        </div>
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

export default Dashboard;
