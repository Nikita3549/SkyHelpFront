import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2, Clock, ArrowRight, Plane } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Claim } from "@/lib/supabase";
import { motion } from "framer-motion";
import { toast } from "sonner";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  const { data: userClaims = [], isLoading, error, refetch } = useQuery({
    queryKey: ['userClaims'],
    queryFn: async () => {
      console.log("Fetching user claims...");
      
      try {
        await new Promise(resolve => setTimeout(resolve, 300));
        
        const { data, error } = await supabase
          .from('claims')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (error) {
          console.error('Error fetching user claims:', error);
          throw error;
        }

        console.log(`Retrieved ${data?.length || 0} user claims:`, data);
        return data || [];
      } catch (err) {
        console.error("Failed to fetch claims:", err);
        toast.error("Could not load your claims");
        throw err;
      }
    },
    refetchOnWindowFocus: true,
    refetchInterval: 5000,
    staleTime: 1000,
  });

  useEffect(() => {
    console.log("Dashboard mounted - refreshing claims");
    refetch();
    
    return () => {
      console.log("Dashboard unmounted");
    };
  }, [refetch]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'escalated':
        return 'bg-orange-100 text-orange-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'in_progress':
        return <Clock className="h-4 w-4 text-blue-600" />;
      case 'completed':
        return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const formatLastUpdated = (dateStr: string) => {
    if (!dateStr) return "Unknown";
    
    try {
      if (dateStr.includes('.')) {
        const [day, month, year] = dateStr.split('.');
        const date = new Date(`20${year}-${month}-${day}`);
        return formatDistanceToNow(date, { addSuffix: true });
      }
      
      return formatDistanceToNow(new Date(dateStr), { addSuffix: true });
    } catch (err) {
      console.error("Error formatting date:", dateStr, err);
      return dateStr;
    }
  };

  return (
    <div className="py-12 md:py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">Your Dashboard</h1>
          <p className="text-gray-600">
            Track and manage your flight compensation claims
          </p>
        </motion.div>
        
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="myClaims">My Claims</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Total Claims</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{userClaims.length}</p>
                  <p className="text-sm text-gray-500 mt-1">Active claims</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Pending Review</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">
                    {userClaims.filter(claim => claim.status === 'pending').length}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">Awaiting processing</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Completed</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">
                    {userClaims.filter(claim => claim.status === 'completed').length}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">Successfully processed</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="text-center py-6">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-800 mx-auto"></div>
                      <p className="mt-2 text-gray-600">Loading your claims...</p>
                    </div>
                  ) : error ? (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>
                        Failed to load your claims. Please try again later.
                      </AlertDescription>
                    </Alert>
                  ) : userClaims.length === 0 ? (
                    <div className="text-center py-8">
                      <Plane className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                      <h3 className="text-lg font-medium mb-2">No claims yet</h3>
                      <p className="text-gray-500 mb-4">
                        You haven't submitted any flight compensation claims yet.
                      </p>
                      <Button onClick={() => navigate("/claim")}>
                        Start a New Claim
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {userClaims.slice(0, 5).map((claim: Claim) => (
                        <div
                          key={claim.id}
                          className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-0 last:pb-0"
                        >
                          <div>
                            <div className="flex items-center">
                              {getStatusIcon(claim.status)}
                              <p className="font-medium ml-2">{claim.airline} {claim.flightnumber}</p>
                            </div>
                            <p className="text-sm text-gray-500 mt-1">
                              {claim.departureairport} to {claim.arrivalairport} • {claim.date}
                            </p>
                          </div>
                          <div className="text-right">
                            <Badge className={`${getStatusColor(claim.status)}`}>
                              {claim.status.replace('_', ' ')}
                            </Badge>
                            <p className="text-xs text-gray-500 mt-1">
                              Updated {formatLastUpdated(claim.lastupdated)}
                            </p>
                          </div>
                        </div>
                      ))}
                      
                      {userClaims.length > 5 && (
                        <div className="text-center pt-2">
                          <Button variant="outline" onClick={() => setActiveTab("myClaims")}>
                            View All Claims
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="myClaims">
            <Card>
              <CardHeader>
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <CardTitle>My Claims</CardTitle>
                  <Button onClick={() => navigate("/claim")}>
                    New Claim
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="text-center py-6">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-800 mx-auto"></div>
                    <p className="mt-2 text-gray-600">Loading your claims...</p>
                  </div>
                ) : error ? (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                      Failed to load your claims. Please try again later.
                    </AlertDescription>
                  </Alert>
                ) : userClaims.length === 0 ? (
                  <div className="text-center py-8">
                    <Plane className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                    <h3 className="text-lg font-medium mb-2">No claims yet</h3>
                    <p className="text-gray-500 mb-4">
                      You haven't submitted any flight compensation claims yet.
                    </p>
                    <Button onClick={() => navigate("/claim")}>
                      Start a New Claim
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 font-medium">ID</th>
                          <th className="text-left py-3 px-4 font-medium">Flight</th>
                          <th className="text-left py-3 px-4 font-medium">Date</th>
                          <th className="text-left py-3 px-4 font-medium">Amount</th>
                          <th className="text-left py-3 px-4 font-medium">Status</th>
                          <th className="text-left py-3 px-4 font-medium">Last Update</th>
                          <th className="text-right py-3 px-4 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {userClaims.map((claim: Claim) => (
                          <tr key={claim.id} className="border-b border-gray-100">
                            <td className="py-3 px-4 text-gray-700">{claim.id}</td>
                            <td className="py-3 px-4">
                              <div className="font-medium">{claim.airline} {claim.flightnumber}</div>
                              <div className="text-xs text-gray-500">{claim.departureairport} - {claim.arrivalairport}</div>
                            </td>
                            <td className="py-3 px-4">{claim.date}</td>
                            <td className="py-3 px-4">{claim.amount}</td>
                            <td className="py-3 px-4">
                              <Badge className={`${getStatusColor(claim.status)}`}>
                                {claim.status.replace('_', ' ')}
                              </Badge>
                            </td>
                            <td className="py-3 px-4 text-sm">
                              {formatLastUpdated(claim.lastupdated)}
                            </td>
                            <td className="py-3 px-4 text-right">
                              <Button variant="outline" size="sm">
                                Details
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="resources">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>EU Regulation 261/2004</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Learn about your rights under EU Regulation 261/2004 for flight compensation.
                  </p>
                  <Button variant="outline" asChild>
                    <Link to="/resources/eu-regulation">
                      Read More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Claim Process FAQ</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Frequently asked questions about the flight compensation claim process.
                  </p>
                  <Button variant="outline" asChild>
                    <Link to="/resources/faq">
                      View FAQ <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
