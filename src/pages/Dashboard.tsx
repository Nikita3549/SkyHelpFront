
import React, { useState, useEffect } from "react";
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
import { toast } from "sonner";
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
    escalated: {
      variant: "secondary",
      icon: <AlertCircle className="h-3 w-3 mr-1" stroke="orange" />,
    },
    rejected: {
      variant: "destructive",
      icon: <AlertCircle className="h-3 w-3 mr-1" />,
    },
  };

  const { variant, icon } = variants[status] || variants.pending;

  return (
    <Badge variant={variant} className={cn("flex items-center", className)}>
      {icon}
      {status === "completed" && "Completed"}
      {status === "in_progress" && "In Progress"}
      {status === "pending" && "Under Review"}
      {status === "escalated" && "Escalated"}
      {status === "rejected" && "Rejected"}
    </Badge>
  );
};

const Dashboard = () => {
  const [claims, setClaims] = useState<Claim[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedClaimId, setSelectedClaimId] = useState<string | null>(null);
  const selectedClaim = claims.find((claim) => claim.id === selectedClaimId);

  // Fetch claims from the database
  useEffect(() => {
    const fetchClaims = async () => {
      try {
        setIsLoading(true);
        const claimsData = await claimsService.getClaims();
        setClaims(claimsData);
        
        // Select the first claim automatically if we have claims
        if (claimsData.length > 0 && !selectedClaimId) {
          setSelectedClaimId(claimsData[0].id);
        }
      } catch (error) {
        console.error("Error fetching claims:", error);
        toast.error("Failed to load claims", {
          description: "Please try refreshing the page.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchClaims();
  }, []);

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

  // Function to calculate progress based on status
  const getProgressValue = (status: string): number => {
    switch (status) {
      case "completed": return 100;
      case "in_progress": return 60;
      case "escalated": return 75;
      case "rejected": return 100;
      case "pending":
      default: return 30;
    }
  };

  // Function to get formatted route from departure and arrival airports
  const getRoute = (departure?: string, arrival?: string): string => {
    if (!departure || !arrival) return "Flight route unavailable";
    return `${departure} to ${arrival}`;
  };

  // Function to get estimated completion date (3 weeks from claim date)
  const getEstimatedCompletion = (dateStr?: string): string => {
    if (!dateStr) return new Date().toISOString().split('T')[0];
    const date = new Date(dateStr);
    date.setDate(date.getDate() + 21);
    return date.toISOString().split('T')[0];
  };

  // Mock document data since we don't store this in the database yet
  const getDocuments = () => [
    { name: "Boarding Pass", status: "requested" },
    { name: "Flight Ticket", status: "requested" },
    { name: "ID Document", status: "requested" },
  ];

  // Mock messages data since we don't store this in the database yet
  const getMessages = (claim?: Claim) => {
    if (!claim) return [];
    
    return [
      {
        date: claim.lastupdated || new Date().toISOString().split('T')[0],
        content: "Your claim has been received and is currently under initial review.",
        isFromTeam: true,
      }
    ];
  };

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
                {isLoading ? (
                  <div className="flex justify-center items-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : claims.length === 0 ? (
                  <div className="text-center py-12">
                    <FileText className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium mb-2">No Claims Yet</h3>
                    <p className="text-gray-500 mb-6">You haven't submitted any claims yet.</p>
                    <Link to="/claim">
                      <Button>Start Your First Claim</Button>
                    </Link>
                  </div>
                ) : (
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
                                <span className="text-sm font-medium">{claim.amount || "Pending"}</span>
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
                )}
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
            {isLoading ? (
              <Card className="shadow-md h-full flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </Card>
            ) : !selectedClaim ? (
              <Card className="shadow-md h-full">
                <div className="flex flex-col items-center justify-center h-full p-12 text-center">
                  <FileText className="h-16 w-16 text-gray-300 mb-4" />
                  <h3 className="text-xl font-medium mb-2">No Claim Selected</h3>
                  <p className="text-gray-500 mb-6 max-w-md">
                    {claims.length > 0 
                      ? "Select a claim from the list to view its details" 
                      : "You don't have any claims yet. Start your first claim to get compensation for your disrupted flight."}
                  </p>
                  {claims.length === 0 && (
                    <Link to="/claim">
                      <Button>Start New Claim</Button>
                    </Link>
                  )}
                </div>
              </Card>
            ) : (
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
                                  {getRoute(selectedClaim.departureairport, selectedClaim.arrivalairport)}
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
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-500">Issue</span>
                                <span className="text-sm font-medium capitalize">{selectedClaim.flightissue || "Disruption"}</span>
                              </div>
                            </div>
                          </div>
                          
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
                                <span className="text-sm text-gray-500">Last Update</span>
                                <span className="text-sm font-medium">{new Date(selectedClaim.lastupdated).toLocaleDateString()}</span>
                              </div>
                              {selectedClaim.status !== "completed" && (
                                <div className="flex justify-between">
                                  <span className="text-sm text-gray-500">Estimated Completion</span>
                                  <span className="text-sm font-medium">{new Date(getEstimatedCompletion(selectedClaim.date)).toLocaleDateString()}</span>
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
                                <span className="text-lg font-semibold text-primary">
                                  {selectedClaim.amount === "€0" ? "Pending Evaluation" : selectedClaim.amount}
                                </span>
                              </div>
                              {selectedClaim.amount !== "€0" && (
                                <>
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
                                </>
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
                                    <p className="text-sm font-medium">Documents Required</p>
                                    <p className="text-xs text-gray-500 mt-1">
                                      Please upload the requested documents to proceed with your claim.
                                    </p>
                                    <Button onClick={uploadDocument} variant="outline" size="sm" className="mt-3">
                                      <Upload className="mr-2 h-3 w-3" />
                                      Upload Documents
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
                              
                              {selectedClaim.status === "escalated" && (
                                <div className="flex items-start space-x-3">
                                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-orange-100 flex items-center justify-center mt-0.5">
                                    <AlertCircle className="h-3 w-3 text-orange-500" />
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium">Claim Escalated</p>
                                    <p className="text-xs text-gray-500 mt-1">
                                      Your claim has been escalated for further review. Our team is working on resolving any issues.
                                    </p>
                                    <Button onClick={generateNewMessage} variant="outline" size="sm" className="mt-3">
                                      <MessageSquare className="mr-2 h-3 w-3" />
                                      Contact Support
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
                            {getDocuments().map((doc, index) => (
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
                          {getMessages(selectedClaim).map((message, index) => (
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
                        
                        {getMessages(selectedClaim).length === 0 && (
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

export default Dashboard;
