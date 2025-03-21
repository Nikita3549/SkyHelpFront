
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { claimsService } from '@/services/claimsService';
import { useAuth } from '@/contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Claim } from '@/lib/supabase';
import {
  Plane,
  Clock,
  Calendar,
  Check,
  ChevronRight,
  AlertCircle,
  FileText,
  Download,
  Upload,
  MessageSquare,
  CheckCircle2,
} from 'lucide-react';

// Reuse the StatusBadge component
const StatusBadge = ({ status }: { status: string }) => {
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
    rejected: {
      variant: "destructive",
      icon: <AlertCircle className="h-3 w-3 mr-1" />,
    },
    escalated: {
      variant: "secondary",
      icon: <AlertCircle className="h-3 w-3 mr-1" />,
    },
  };

  const { variant, icon } = variants[status] || variants.pending;

  return (
    <Badge variant={variant} className="flex items-center">
      {icon}
      {status === "completed" && "Completed"}
      {status === "in_progress" && "In Progress"}
      {status === "pending" && "Pending"}
      {status === "rejected" && "Rejected"}
      {status === "escalated" && "Escalated"}
    </Badge>
  );
};

const UserDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [selectedClaimId, setSelectedClaimId] = useState<string | null>(null);

  // Fetch user claims
  const {
    data: userClaims = [],
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['userClaims'],
    queryFn: claimsService.getUserClaims,
  });

  // Calculate progress based on status
  const getClaimProgress = (status: string): number => {
    switch (status) {
      case 'completed':
        return 100;
      case 'in_progress':
        return 60;
      case 'escalated':
        return 70;
      case 'rejected':
        return 100;
      default:
        return 20;
    }
  };

  useEffect(() => {
    // If no selected claim and we have claims, select the first one
    if (!selectedClaimId && userClaims.length > 0) {
      setSelectedClaimId(userClaims[0].id);
    }
  }, [userClaims, selectedClaimId]);

  // Find selected claim
  const selectedClaim = userClaims.find(claim => claim.id === selectedClaimId);

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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="spinner mb-4"></div>
          <p>Loading your claims...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Error Loading Data</h2>
          <p className="mb-4">There was a problem loading your claims. Please try again.</p>
          <Button onClick={() => refetch()}>Retry</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 md:py-20 min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold mb-2">My Claims Dashboard</h1>
            <p className="text-gray-600">
              Welcome back, {user?.email}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 md:mt-0 flex gap-4"
          >
            <Link to="/claim">
              <Button>
                File New Claim
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Button variant="outline" onClick={() => logout()}>
              Sign Out
            </Button>
          </motion.div>
        </div>

        {userClaims.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-16"
          >
            <div className="max-w-md mx-auto">
              <Plane className="h-16 w-16 text-gray-300 mx-auto mb-6" />
              <h2 className="text-2xl font-bold mb-2">No Claims Found</h2>
              <p className="text-gray-500 mb-8">
                You haven't filed any compensation claims yet. Start by creating your first claim.
              </p>
              <Link to="/claim">
                <Button size="lg">
                  File Your First Claim
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        ) : (
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
                    {userClaims.length} {userClaims.length === 1 ? "claim" : "claims"} in total
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="space-y-4"
                  >
                    {userClaims.map((claim) => (
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
                                <span>{getClaimProgress(claim.status)}%</span>
                              </div>
                              <Progress value={getClaimProgress(claim.status)} className="h-1.5" />
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
                          <StatusBadge status={selectedClaim.status} />
                        </CardTitle>
                        <CardDescription className="mt-1">
                          {selectedClaim.airline} · {selectedClaim.flightnumber} · {new Date(selectedClaim.date).toLocaleDateString()}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="p-0">
                    <Tabs defaultValue="overview">
                      <TabsList className="mx-6 mb-2">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="details">Details</TabsTrigger>
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
                                    {selectedClaim.departureairport || 'N/A'} to {selectedClaim.arrivalairport || 'N/A'}
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
                              </div>
                            </div>
                            
                            <div>
                              <h3 className="text-sm font-medium text-gray-500 mb-2">Claim Progress</h3>
                              <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                                <div>
                                  <div className="flex justify-between text-sm mb-1">
                                    <span>Status</span>
                                    <span className="font-medium">
                                      {selectedClaim.status === 'in_progress' ? 'In Progress' : 
                                       selectedClaim.status === 'pending' ? 'Pending' :
                                       selectedClaim.status === 'completed' ? 'Completed' :
                                       selectedClaim.status === 'rejected' ? 'Rejected' :
                                       selectedClaim.status === 'escalated' ? 'Escalated' : selectedClaim.status}
                                    </span>
                                  </div>
                                  <Progress value={getClaimProgress(selectedClaim.status)} className="h-2" />
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm text-gray-500">Last Updated</span>
                                  <span className="text-sm font-medium">{new Date(selectedClaim.lastupdated).toLocaleDateString()}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm text-gray-500">Current Stage</span>
                                  <span className="text-sm font-medium">{selectedClaim.stage}</span>
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
                            
                            <div>
                              <h3 className="text-sm font-medium text-gray-500 mb-2">Next Steps</h3>
                              <div className="bg-gray-50 rounded-lg p-4">
                                {selectedClaim.status === "pending" && (
                                  <div className="flex items-start space-x-3">
                                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
                                      <FileText className="h-3 w-3 text-primary" />
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium">Claim Under Review</p>
                                      <p className="text-xs text-gray-500 mt-1">
                                        Our team is reviewing your claim. We'll update you on next steps shortly.
                                      </p>
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
                                        We're sorry, but your claim has been rejected. Please contact us if you believe this is in error.
                                      </p>
                                    </div>
                                  </div>
                                )}

                                {selectedClaim.status === "escalated" && (
                                  <div className="flex items-start space-x-3">
                                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-yellow-100 flex items-center justify-center mt-0.5">
                                      <AlertCircle className="h-3 w-3 text-yellow-600" />
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium">Claim Escalated</p>
                                      <p className="text-xs text-gray-500 mt-1">
                                        Your claim has been escalated to our senior team for further action. This typically happens when the airline does not respond.
                                      </p>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="details" className="p-6 pt-2">
                        <div className="space-y-6">
                          <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-4">Contact Information</h3>
                            <div className="bg-gray-50 rounded-lg p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <p className="text-xs text-gray-500">Email</p>
                                <p className="text-sm font-medium">{selectedClaim.email}</p>
                              </div>
                              <div className="space-y-2">
                                <p className="text-xs text-gray-500">Phone</p>
                                <p className="text-sm font-medium">{selectedClaim.phone || 'Not provided'}</p>
                              </div>
                              <div className="space-y-2 md:col-span-2">
                                <p className="text-xs text-gray-500">Address</p>
                                <p className="text-sm font-medium">{selectedClaim.address || 'Not provided'}</p>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-4">Flight Details</h3>
                            <div className="bg-gray-50 rounded-lg p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <p className="text-xs text-gray-500">Airline</p>
                                <p className="text-sm font-medium">{selectedClaim.airline}</p>
                              </div>
                              <div className="space-y-2">
                                <p className="text-xs text-gray-500">Flight Number</p>
                                <p className="text-sm font-medium">{selectedClaim.flightnumber}</p>
                              </div>
                              <div className="space-y-2">
                                <p className="text-xs text-gray-500">Departure Airport</p>
                                <p className="text-sm font-medium">{selectedClaim.departureairport || 'Not provided'}</p>
                              </div>
                              <div className="space-y-2">
                                <p className="text-xs text-gray-500">Arrival Airport</p>
                                <p className="text-sm font-medium">{selectedClaim.arrivalairport || 'Not provided'}</p>
                              </div>
                              <div className="space-y-2">
                                <p className="text-xs text-gray-500">Date</p>
                                <p className="text-sm font-medium">{new Date(selectedClaim.date).toLocaleDateString()}</p>
                              </div>
                              <div className="space-y-2">
                                <p className="text-xs text-gray-500">Number of Passengers</p>
                                <p className="text-sm font-medium">{selectedClaim.numberofpassengers || '1'}</p>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-4">Issue Details</h3>
                            <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                              <div className="space-y-2">
                                <p className="text-xs text-gray-500">Type of Issue</p>
                                <p className="text-sm font-medium">{selectedClaim.flightissue || 'Not specified'}</p>
                              </div>
                              <div className="space-y-2">
                                <p className="text-xs text-gray-500">Reason Given by Airline</p>
                                <p className="text-sm font-medium">{selectedClaim.reasongivenbyairline || 'Not provided'}</p>
                              </div>
                              <div className="space-y-2">
                                <p className="text-xs text-gray-500">Additional Information</p>
                                <p className="text-sm">{selectedClaim.additionalinformation || 'No additional information provided'}</p>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-4">Payment Information</h3>
                            <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                              <div className="space-y-2">
                                <p className="text-xs text-gray-500">Payment Method</p>
                                <p className="text-sm font-medium">
                                  {selectedClaim.paymentmethod ? (
                                    selectedClaim.paymentmethod === 'bank_transfer' ? 'Bank Transfer' :
                                    selectedClaim.paymentmethod === 'paypal' ? 'PayPal' :
                                    selectedClaim.paymentmethod === 'wise' ? 'Wise' :
                                    selectedClaim.paymentmethod
                                  ) : 'Not specified'}
                                </p>
                              </div>
                              {selectedClaim.paymentdetails && (
                                <div className="text-sm">
                                  {selectedClaim.paymentmethod === 'bank_transfer' && selectedClaim.paymentdetails.accountHolderName && (
                                    <div className="text-sm space-y-2">
                                      <p className="font-medium">Bank Account Details:</p>
                                      <p>Account Holder: {selectedClaim.paymentdetails.accountHolderName}</p>
                                      {selectedClaim.paymentdetails.bankName && <p>Bank: {selectedClaim.paymentdetails.bankName}</p>}
                                      {selectedClaim.paymentdetails.iban && <p>IBAN: {selectedClaim.paymentdetails.iban}</p>}
                                      {selectedClaim.paymentdetails.accountNumber && <p>Account Number: {selectedClaim.paymentdetails.accountNumber}</p>}
                                    </div>
                                  )}
                                  
                                  {selectedClaim.paymentmethod === 'paypal' && selectedClaim.paymentdetails.paypalEmail && (
                                    <div className="text-sm space-y-2">
                                      <p className="font-medium">PayPal Account:</p>
                                      <p>Email: {selectedClaim.paymentdetails.paypalEmail}</p>
                                    </div>
                                  )}
                                  
                                  {selectedClaim.paymentmethod === 'wise' && selectedClaim.paymentdetails.accountHolderName && (
                                    <div className="text-sm space-y-2">
                                      <p className="font-medium">Wise Account Details:</p>
                                      <p>Account Holder: {selectedClaim.paymentdetails.accountHolderName}</p>
                                      {selectedClaim.paymentdetails.ibanOrAccount && <p>IBAN/Account: {selectedClaim.paymentdetails.ibanOrAccount}</p>}
                                      {selectedClaim.paymentdetails.email && <p>Email: {selectedClaim.paymentdetails.email}</p>}
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>

                  <CardFooter className="flex justify-between border-t p-6">
                    <div className="text-sm text-gray-500">
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        Claim opened: {selectedClaim.created_at ? new Date(selectedClaim.created_at).toLocaleDateString() : new Date(selectedClaim.date).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <div>
                      <Link to="/claim">
                        <Button variant="outline" size="sm">
                          File Another Claim
                        </Button>
                      </Link>
                    </div>
                  </CardFooter>
                </Card>
              )}
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
