
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { claimsService } from "@/services/claimsService";
import { Claim } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Plus, FileText, ArrowUpRight, LogOut } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'in_progress':
      return 'bg-blue-100 text-blue-800';
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'rejected':
      return 'bg-red-100 text-red-800';
    case 'escalated':
      return 'bg-purple-100 text-purple-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const formatStatus = (status: string) => {
  return status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
};

const UserDashboard = () => {
  const { user, signOut } = useAuth();
  const [claims, setClaims] = useState<Claim[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserClaims = async () => {
      if (!user?.email) return;
      
      try {
        const userClaims = await claimsService.getUserClaims(user.email);
        setClaims(userClaims);
      } catch (err) {
        console.error("Error fetching user claims:", err);
        setError("Failed to load your claims. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserClaims();
  }, [user]);

  const handleNewClaim = () => {
    navigate('/claim');
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading your claims...</span>
      </div>
    );
  }

  return (
    <div className="container max-w-5xl mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">My Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Welcome back, {user?.email}
          </p>
        </div>
        <div className="flex gap-3 mt-4 md:mt-0">
          <Button onClick={handleNewClaim} className="flex items-center">
            <Plus className="mr-1 h-4 w-4" />
            New Claim
          </Button>
          <Button variant="outline" onClick={handleSignOut} className="flex items-center">
            <LogOut className="mr-1 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>My Claims</CardTitle>
          <CardDescription>
            View and manage all your flight compensation claims
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error ? (
            <div className="text-center py-8 text-red-500">{error}</div>
          ) : claims.length === 0 ? (
            <div className="text-center py-10 space-y-4">
              <FileText className="h-12 w-12 mx-auto text-gray-400" />
              <div className="space-y-2">
                <h3 className="text-lg font-medium">No claims yet</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  You haven't submitted any flight compensation claims yet. Create your first claim to get started.
                </p>
              </div>
              <Button onClick={handleNewClaim} className="mt-2">
                Start a New Claim
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Flight</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Airline</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Last Updated</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {claims.map((claim) => (
                    <TableRow key={claim.id} className="cursor-pointer hover:bg-gray-50">
                      <TableCell className="font-medium">{claim.flightnumber}</TableCell>
                      <TableCell>{claim.date}</TableCell>
                      <TableCell>{claim.airline}</TableCell>
                      <TableCell>
                        <Badge className={`${getStatusColor(claim.status)} font-normal`}>
                          {formatStatus(claim.status)}
                        </Badge>
                      </TableCell>
                      <TableCell>€{claim.amount}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {claim.lastupdated}
                          <Button variant="ghost" size="icon" className="ml-2 h-6 w-6">
                            <ArrowUpRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDashboard;
