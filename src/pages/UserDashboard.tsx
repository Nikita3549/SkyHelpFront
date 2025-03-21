
import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Claim } from "@/lib/supabase";
import { ClipboardList, RefreshCw, PlusCircle, FileText } from "lucide-react";

const UserDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [claims, setClaims] = useState<Claim[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedClaim, setSelectedClaim] = useState<Claim | null>(null);

  useEffect(() => {
    fetchUserClaims();
  }, [user]);

  const fetchUserClaims = async () => {
    setLoading(true);
    try {
      if (!user) return;

      const { data, error } = await supabase
        .from("claims")
        .select("*")
        .eq("customer", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      setClaims(data || []);
    } catch (error: any) {
      console.error("Error fetching claims:", error);
      toast.error("Failed to load your claims");
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchUserClaims();
    toast.success("Claims refreshed");
  };

  const handleNewClaim = () => {
    navigate("/claim");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "in_progress":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatStatus = (status: string) => {
    return status
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString();
    } catch (e) {
      return dateString;
    }
  };

  if (loading) {
    return (
      <div className="container py-12 flex justify-center items-center min-h-[calc(100vh-4rem)]">
        <div className="flex flex-col items-center">
          <RefreshCw className="h-12 w-12 animate-spin text-primary mb-4" />
          <p className="text-lg">Loading your claims...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Your Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Track and manage your flight compensation claims
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleRefresh} size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button onClick={handleNewClaim} size="sm">
              <PlusCircle className="h-4 w-4 mr-2" />
              New Claim
            </Button>
          </div>
        </div>

        <Tabs defaultValue="claims">
          <TabsList>
            <TabsTrigger value="claims">
              <ClipboardList className="h-4 w-4 mr-2" />
              My Claims
            </TabsTrigger>
            <TabsTrigger value="documents">
              <FileText className="h-4 w-4 mr-2" />
              Documents
            </TabsTrigger>
          </TabsList>
          <TabsContent value="claims" className="mt-6">
            {claims.length === 0 ? (
              <Card>
                <CardHeader>
                  <CardTitle>No Claims Found</CardTitle>
                  <CardDescription>
                    You haven't submitted any claims yet.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Get started by submitting your first flight compensation claim.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleNewClaim}>
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Submit a Claim
                  </Button>
                </CardFooter>
              </Card>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {claims.map((claim) => (
                  <Card 
                    key={claim.id} 
                    className={`cursor-pointer hover:shadow-md transition-shadow ${
                      selectedClaim?.id === claim.id ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => setSelectedClaim(claim === selectedClaim ? null : claim)}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{claim.id}</CardTitle>
                        <Badge
                          className={`${getStatusColor(claim.status)}`}
                        >
                          {formatStatus(claim.status)}
                        </Badge>
                      </div>
                      <CardDescription>
                        {claim.airline} - {claim.flightnumber}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Date:</span>
                          <span>{formatDate(claim.date)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Amount:</span>
                          <span>{claim.amount || "Pending"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Last Updated:</span>
                          <span>{formatDate(claim.lastupdated)}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-1">
                      <Button variant="ghost" size="sm" className="w-full">
                        {selectedClaim?.id === claim.id ? "Hide Details" : "View Details"}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}

            {selectedClaim && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-8"
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Claim Details: {selectedClaim.id}</CardTitle>
                    <CardDescription>
                      {selectedClaim.airline} - Flight {selectedClaim.flightnumber}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-medium mb-2">Flight Information</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Airline:</span>
                            <span>{selectedClaim.airline}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Flight Number:</span>
                            <span>{selectedClaim.flightnumber}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Date:</span>
                            <span>{formatDate(selectedClaim.date)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Departure:</span>
                            <span>{selectedClaim.departureairport || "N/A"}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Arrival:</span>
                            <span>{selectedClaim.arrivalairport || "N/A"}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-medium mb-2">Claim Status</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Status:</span>
                            <Badge className={`${getStatusColor(selectedClaim.status)}`}>
                              {formatStatus(selectedClaim.status)}
                            </Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Stage:</span>
                            <span>
                              {selectedClaim.stage
                                ? formatStatus(selectedClaim.stage)
                                : "Initial Review"}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Amount:</span>
                            <span>{selectedClaim.amount || "Pending Assessment"}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Last Updated:</span>
                            <span>{formatDate(selectedClaim.lastupdated)}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Separator className="my-4" />

                    <div>
                      <h3 className="font-medium mb-2">Issue Details</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Type:</span>
                          <span>{selectedClaim.flightissue ? formatStatus(selectedClaim.flightissue) : "N/A"}</span>
                        </div>
                      </div>
                      <div className="mt-2">
                        <span className="text-muted-foreground text-sm">Additional Information:</span>
                        <p className="mt-1 p-3 bg-gray-50 rounded-md text-sm">
                          {selectedClaim.additionalinformation || "No additional information provided."}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </TabsContent>
          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <CardTitle>Documents</CardTitle>
                <CardDescription>
                  View and manage documents related to your claims
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  No documents uploaded yet. Documents will appear here when available.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default UserDashboard;
