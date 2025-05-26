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
import { Input } from "@/components/ui/input";
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
  HelpCircle,
  Send,
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
import ClaimProgressTimeline from "@/components/dashboard/ClaimProgressTimeline";

// Sample claims data
const claims = [
  {
    id: "CLM-1234",
    airline: "Lufthansa",
    flightNumber: "LH1234",
    departureDate: "2023-11-15",
    route: "London (LHR) to Frankfurt (FRA)",
    status: "in_progress",
    statusText: "In Progress",
    compensation: "€400",
    progress: 60,
    lastUpdate: "2023-12-10",
    estimatedCompletion: "2024-01-20",
    documents: [
      { name: "Boarding Pass", status: "uploaded" },
      { name: "Flight Ticket", status: "uploaded" },
      { name: "ID Document", status: "requested" },
    ],
    messages: [
      {
        date: "2023-12-10",
        content: "We've submitted your claim to Lufthansa and are awaiting their response.",
        isFromTeam: true,
      },
      {
        date: "2023-12-05",
        content: "Your claim has been reviewed and is valid for compensation. We'll now contact the airline.",
        isFromTeam: true,
      },
    ],
  },
  {
    id: "CLM-5678",
    airline: "British Airways",
    flightNumber: "BA2160",
    departureDate: "2023-10-20",
    route: "Madrid (MAD) to London (LHR)",
    status: "completed",
    statusText: "Completed",
    compensation: "€250",
    progress: 100,
    lastUpdate: "2023-11-30",
    paymentDate: "2023-11-30",
    documents: [
      { name: "Boarding Pass", status: "uploaded" },
      { name: "Flight Ticket", status: "uploaded" },
      { name: "ID Document", status: "uploaded" },
    ],
    messages: [
      {
        date: "2023-11-30",
        content: "Your compensation of €250 has been transferred to your account. Thank you for using our service!",
        isFromTeam: true,
      },
      {
        date: "2023-11-25",
        content: "Good news! British Airways has approved your claim and agreed to pay compensation.",
        isFromTeam: true,
      },
    ],
  },
  {
    id: "CLM-9012",
    airline: "Ryanair",
    flightNumber: "FR8012",
    departureDate: "2023-12-05",
    route: "Barcelona (BCN) to Paris (ORY)",
    status: "review",
    statusText: "Under Review",
    compensation: "€250 (estimated)",
    progress: 30,
    lastUpdate: "2023-12-12",
    estimatedCompletion: "2024-02-15",
    documents: [
      { name: "Boarding Pass", status: "uploaded" },
      { name: "Flight Ticket", status: "requested" },
      { name: "ID Document", status: "requested" },
    ],
    messages: [
      {
        date: "2023-12-12",
        content: "We need your flight ticket to proceed with the claim. Please upload it as soon as possible.",
        isFromTeam: true,
      },
      {
        date: "2023-12-08",
        content: "Your claim has been received and is currently under initial review.",
        isFromTeam: true,
      },
    ],
  },
];

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
  const [selectedClaimId, setSelectedClaimId] = useState(claims[0].id);
  const [messageText, setMessageText] = useState('');
  const selectedClaim = claims.find((claim) => claim.id === selectedClaimId);

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

  // Function to contact support
  const contactSupport = () => {
    console.log("Contact support clicked");
    // In a real app, this would open a support contact form or chat
  };

  // Get status-based progress steps
  const getProgressSteps = (claim) => {
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
        date: undefined, // Explicitly setting undefined for clarity
        status: "upcoming" as const,
      });
    }

    return baseSteps;
  };

  // Handle sending a new message
  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    
    console.log("Sending message:", messageText);
    // In a real app, this would send the message to the support team
    
    // Add the message to the claim's messages
    const newMessage = {
      date: new Date().toISOString().split('T')[0],
      content: messageText,
      isFromTeam: false,
    };
    
    // Update the selected claim's messages (in a real app, this would update the backend)
    const updatedClaim = {
      ...selectedClaim,
      messages: [...(selectedClaim?.messages || []), newMessage]
    };
    
    setMessageText('');
    
    // Show success feedback
    console.log("Message sent successfully");
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
                              <span className="text-sm font-medium">{claim.flightNumber}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-500">Date</span>
                              <span className="text-sm font-medium">{new Date(claim.departureDate).toLocaleDateString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-500">Compensation</span>
                              <span className="text-sm font-medium">{claim.compensation}</span>
                            </div>
                          </div>
                          <div className="mt-3">
                            <div className="flex justify-between text-xs mb-1">
                              <span>Progress</span>
                              <span>{claim.progress}%</span>
                            </div>
                            <Progress value={claim.progress} className="h-1.5" />
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
                        {selectedClaim.airline} · {selectedClaim.flightNumber} · {new Date(selectedClaim.departureDate).toLocaleDateString()}
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
                        <DropdownMenuItem className="cursor-pointer" onClick={contactSupport}>
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
                    
                    <TabsContent value="overview" className="px-6 pt-2 pb-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-6">
                          <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-2">Flight Details</h3>
                            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-500">Route</span>
                                <span className="text-sm font-medium">{selectedClaim.route}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-500">Flight Number</span>
                                <span className="text-sm font-medium">{selectedClaim.flightNumber}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-500">Date</span>
                                <span className="text-sm font-medium">{new Date(selectedClaim.departureDate).toLocaleDateString()}</span>
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
                                <span className="text-lg font-semibold text-primary">{selectedClaim.compensation}</span>
                              </div>
                              <Separator />
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-500">Our Fee (25%)</span>
                                <span className="text-sm font-medium">
                                  {selectedClaim.compensation.startsWith("€") 
                                    ? "€" + (parseFloat(selectedClaim.compensation.substring(1)) * 0.25).toFixed(2)
                                    : "Calculated on settlement"}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-500">You Receive</span>
                                <span className="text-sm font-medium">
                                  {selectedClaim.compensation.startsWith("€") 
                                    ? "€" + (parseFloat(selectedClaim.compensation.substring(1)) * 0.75).toFixed(2)
                                    : "Calculated on settlement"}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-2">Next Steps</h3>
                            <div className="bg-gray-50 rounded-lg p-4">
                              {selectedClaim.status === "review" && (
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
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Claim Progress Timeline Section */}
                      <ClaimProgressTimeline 
                        steps={getProgressSteps(selectedClaim)}
                        claimOpenedDate={new Date(selectedClaim.departureDate).toLocaleDateString()}
                        onContactSupport={contactSupport}
                      />
                    </TabsContent>
                    
                    <TabsContent value="documents" className="p-6 pt-2">
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-sm font-medium text-gray-500 mb-4">Required Documents</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {selectedClaim.documents.map((doc, index) => (
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
                          {selectedClaim.messages.map((message, index) => (
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
                        
                        {selectedClaim.messages.length === 0 && (
                          <div className="text-center py-8">
                            <p className="text-gray-500">No messages yet</p>
                          </div>
                        )}
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>

                <CardFooter className="flex flex-col border-t p-6 space-y-4">
                  <div className="flex justify-between items-center w-full">
                    <div className="text-sm text-gray-500">
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        Claim opened: {new Date(selectedClaim.departureDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  
                  {/* Message Writing Zone */}
                  <div className="w-full">
                    <div className="flex items-center space-x-2 mb-2">
                      <MessageSquare className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">Send a message to support</span>
                    </div>
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Type your message here..."
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                        className="flex-1"
                      />
                      <Button onClick={handleSendMessage} disabled={!messageText.trim()}>
                        <Send className="h-4 w-4 mr-2" />
                        Send
                      </Button>
                    </div>
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
