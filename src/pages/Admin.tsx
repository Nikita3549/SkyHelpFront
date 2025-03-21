
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Plane,
  User,
  Clock,
  Calendar,
  Mail,
  FileText,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Download,
  Search,
  Filter,
  PlusCircle,
  MailCheck,
  Users,
  BarChart4,
  CreditCard,
  Banknote,
  MoreHorizontal,
  ChevronRight,
  ChevronLeft,
  ArrowUpDown,
} from "lucide-react";
import { toast } from "sonner";
import NewClaimModal from "@/components/admin/NewClaimModal";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { claimsService } from "@/services/claimsService";
import { Claim } from "@/lib/supabase";

// Dashboard statistics
const dashboardStats = [
  { title: "Total Claims", value: "156", icon: <FileText className="h-5 w-5 text-blue-500" />, change: "+12%" },
  { title: "Active Claims", value: "87", icon: <Clock className="h-5 w-5 text-orange-500" />, change: "+5%" },
  { title: "Successful Claims", value: "42", icon: <CheckCircle2 className="h-5 w-5 text-green-500" />, change: "+8%" },
  { title: "Total Compensation", value: "€53,250", icon: <Banknote className="h-5 w-5 text-emerald-500" />, change: "+15%" },
];

// Recent activities
const recentActivities = [
  { id: 1, action: "Claim submitted", claimId: "CLM-1007", user: "David Wilson", time: "Today, 09:45 AM" },
  { id: 2, action: "Airline responded", claimId: "CLM-1002", user: "System", time: "Today, 08:30 AM" },
  { id: 3, action: "Payment processed", claimId: "CLM-1004", user: "Admin", time: "Yesterday, 05:20 PM" },
  { id: 4, action: "Documents verified", claimId: "CLM-1001", user: "Admin", time: "Yesterday, 02:15 PM" },
  { id: 5, action: "Claim rejected", claimId: "CLM-1005", user: "System", time: "2 days ago, 11:30 AM" },
];

// Status badge component for admin
const StatusBadge = ({ status }: { status: string }) => {
  const statusConfig: Record<string, { label: string, variant: "default" | "outline" | "secondary" | "destructive", icon: React.ReactNode }> = {
    pending: {
      label: "Pending",
      variant: "outline",
      icon: <Clock className="h-3 w-3 mr-1" />,
    },
    in_progress: {
      label: "In Progress",
      variant: "secondary",
      icon: <Plane className="h-3 w-3 mr-1" />,
    },
    escalated: {
      label: "Escalated",
      variant: "default",
      icon: <AlertCircle className="h-3 w-3 mr-1" />,
    },
    completed: {
      label: "Completed",
      variant: "default",
      icon: <CheckCircle2 className="h-3 w-3 mr-1" />,
    },
    rejected: {
      label: "Rejected",
      variant: "destructive",
      icon: <XCircle className="h-3 w-3 mr-1" />,
    },
  };

  const { label, variant, icon } = statusConfig[status] || statusConfig.pending;

  return (
    <Badge variant={variant} className="flex items-center">
      {icon}
      {label}
    </Badge>
  );
};

const Admin = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedClaim, setSelectedClaim] = useState<string | null>(null);
  const [isNewClaimModalOpen, setIsNewClaimModalOpen] = useState(false);
  
  const queryClient = useQueryClient();
  
  // Fetch claims data from Supabase
  const { data: claimsData = [], isLoading, error } = useQuery({
    queryKey: ['claims'],
    queryFn: claimsService.getClaims,
  });
  
  // Mutation for updating claim status
  const updateClaimMutation = useMutation({
    mutationFn: ({ claimId, newStatus }: { claimId: string, newStatus: string }) => 
      claimsService.updateClaim(claimId, { status: newStatus as any }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['claims'] });
    },
    onError: (error) => {
      toast.error("Failed to update status", {
        description: error instanceof Error ? error.message : "An unknown error occurred",
      });
    },
  });
  
  // Mutation for creating a new claim
  const createClaimMutation = useMutation({
    mutationFn: (claimData: Omit<Claim, 'created_at'>) => 
      claimsService.createClaim(claimData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['claims'] });
    },
    onError: (error) => {
      toast.error("Failed to create claim", {
        description: error instanceof Error ? error.message : "An unknown error occurred",
      });
    },
  });

  // Filter claims based on search term and status
  const filteredClaims = claimsData.filter((claim) => {
    const matchesSearch = 
      claim.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.airline.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.flightnumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || claim.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Actions
  const handleSendEmail = (claimId: string) => {
    toast.success("Email sent successfully", {
      description: `Notification email sent for claim ${claimId}`,
    });
  };

  const handleUpdateStatus = (claimId: string, newStatus: string) => {
    updateClaimMutation.mutate({ claimId, newStatus });
    
    toast.success("Status updated", {
      description: `Claim ${claimId} status changed to ${newStatus}`,
    });
  };

  const handleExportClaims = () => {
    // Create CSV content
    const headers = ["ID", "Customer", "Email", "Airline", "Flight Number", "Date", "Status", "Stage", "Amount", "Last Updated"];
    const csvRows = [headers];
    
    filteredClaims.forEach(claim => {
      csvRows.push([
        claim.id,
        claim.customer,
        claim.email,
        claim.airline,
        claim.flightnumber,
        claim.date,
        claim.status,
        claim.stage,
        claim.amount,
        claim.lastupdated
      ]);
    });
    
    const csvContent = csvRows.map(row => row.join(",")).join("\n");
    
    // Create and trigger download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `flight-claims-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("Export completed", {
      description: "Claims data has been exported to CSV",
    });
  };

  const handleNewClaimSubmit = (claimData: any) => {
    createClaimMutation.mutate(claimData);
    
    toast.success("New claim created", {
      description: `Claim ${claimData.id} has been created successfully`,
    });
  };

  if (isLoading) {
    return (
      <div className="py-12 md:py-20 min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading claims data...</p>
        </div>
      </div>
    );
  }

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

  return (
    <div className="py-12 md:py-20 min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">
            Manage and process flight compensation claims
          </p>
        </motion.div>

        <Tabs defaultValue="dashboard">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="claims">Claims Management</TabsTrigger>
            <TabsTrigger value="communications">Communications</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard">
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
              >
                {dashboardStats.map((stat, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm text-gray-500">{stat.title}</p>
                          <h4 className="text-2xl font-bold mt-1">{stat.value}</h4>
                          <p className="text-xs text-green-600 mt-1">
                            {stat.change} from last month
                          </p>
                        </div>
                        <div className="p-2 rounded-full bg-gray-50">
                          {stat.icon}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="lg:col-span-1"
                >
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle className="text-lg">Recent Activity</CardTitle>
                      <CardDescription>Latest claim updates and activities</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {recentActivities.map((activity) => (
                        <div key={activity.id} className="flex items-start space-x-3 pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                          <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                            {activity.action.includes("submitted") && <PlusCircle className="h-4 w-4 text-blue-500" />}
                            {activity.action.includes("responded") && <MailCheck className="h-4 w-4 text-orange-500" />}
                            {activity.action.includes("processed") && <Banknote className="h-4 w-4 text-green-500" />}
                            {activity.action.includes("verified") && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                            {activity.action.includes("rejected") && <XCircle className="h-4 w-4 text-red-500" />}
                          </div>
                          <div>
                            <p className="text-sm font-medium">{activity.action}</p>
                            <p className="text-xs text-gray-500">
                              {activity.claimId} • {activity.user}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                    <CardFooter className="border-t pt-4">
                      <Button variant="ghost" className="w-full text-sm" size="sm">
                        View All Activity
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="lg:col-span-2"
                >
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle className="text-lg">Performance Overview</CardTitle>
                      <CardDescription>Claims status and processing metrics</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px] flex items-center justify-center">
                        <div className="text-center text-gray-500">
                          <BarChart4 className="h-16 w-16 mx-auto opacity-30" />
                          <p className="mt-2">Charts and metrics visualization</p>
                          <p className="text-sm">(Actual charts would be implemented here)</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t pt-4 flex justify-between">
                      <div className="grid grid-cols-3 w-full gap-4 text-center">
                        <div>
                          <p className="text-xs text-gray-500">Avg. Processing Time</p>
                          <p className="font-semibold">18 days</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Success Rate</p>
                          <p className="font-semibold">78%</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Revenue</p>
                          <p className="font-semibold">€13,312</p>
                        </div>
                      </div>
                    </CardFooter>
                  </Card>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Actions</CardTitle>
                    <CardDescription>Common administrative tasks</CardDescription>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Button variant="outline" className="h-auto py-6 flex flex-col items-center justify-center">
                      <Users className="h-5 w-5 mb-2" />
                      <span>User Management</span>
                    </Button>
                    <Button variant="outline" className="h-auto py-6 flex flex-col items-center justify-center">
                      <Mail className="h-5 w-5 mb-2" />
                      <span>Bulk Email</span>
                    </Button>
                    <Button variant="outline" className="h-auto py-6 flex flex-col items-center justify-center">
                      <FileText className="h-5 w-5 mb-2" />
                      <span>Generate Reports</span>
                    </Button>
                    <Button variant="outline" className="h-auto py-6 flex flex-col items-center justify-center">
                      <Download className="h-5 w-5 mb-2" />
                      <span>Export Data</span>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          {/* Claims Management Tab */}
          <TabsContent value="claims">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col sm:flex-row gap-4 items-center justify-between"
              >
                <div className="flex flex-col sm:flex-row gap-4 items-center w-full sm:w-auto">
                  <div className="relative w-full sm:w-80">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                    <Input
                      type="search"
                      placeholder="Search claims, customers..."
                      className="pl-9"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  <div className="flex items-center space-x-2 w-full sm:w-auto">
                    <Label htmlFor="status-filter" className="sr-only">
                      Status
                    </Label>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger id="status-filter" className="w-full sm:w-36">
                        <div className="flex items-center">
                          <Filter className="mr-2 h-4 w-4 text-gray-400" />
                          <SelectValue placeholder="Filter status" />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="in_progress">In Progress</SelectItem>
                        <SelectItem value="escalated">Escalated</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex gap-2 w-full sm:w-auto">
                  <Button variant="outline" size="sm" onClick={handleExportClaims}>
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                  <Button size="sm" onClick={() => setIsNewClaimModalOpen(true)}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    New Claim
                  </Button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px]">ID</TableHead>
                          <TableHead>Customer</TableHead>
                          <TableHead>Flight Details</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredClaims.map((claim) => (
                          <TableRow key={claim.id} className={selectedClaim === claim.id ? "bg-blue-50" : undefined}>
                            <TableCell className="font-medium">{claim.id}</TableCell>
                            <TableCell>
                              <div>
                                <div className="font-medium">{claim.customer}</div>
                                <div className="text-xs text-gray-500">{claim.email}</div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div>
                                <div className="font-medium">{claim.airline}</div>
                                <div className="text-xs text-gray-500">{claim.flightnumber}</div>
                              </div>
                            </TableCell>
                            <TableCell>{new Date(claim.date).toLocaleDateString()}</TableCell>
                            <TableCell>{claim.amount}</TableCell>
                            <TableCell>
                              <StatusBadge status={claim.status} />
                            </TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem onClick={() => setSelectedClaim(claim.id)}>
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleSendEmail(claim.id)}>
                                    Send Email
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem onClick={() => handleUpdateStatus(claim.id, "in_progress")}>
                                    Mark as In Progress
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleUpdateStatus(claim.id, "completed")}>
                                    Mark as Completed
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleUpdateStatus(claim.id, "rejected")}>
                                    Mark as Rejected
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                  <CardFooter className="border-t flex items-center justify-between p-4">
                    <div className="text-sm text-gray-500">
                      Showing {filteredClaims.length} of {claimsData.length} claims
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="px-3">
                        Page {page}
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        disabled={filteredClaims.length < 10}
                        onClick={() => setPage(page + 1)}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>

              {selectedClaim && (
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
                          {claimsData.find((claim) => claim.id === selectedClaim)?.customer}
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
                          <h3 className="text-sm font-medium text-gray-500 mb-2">Customer Information</h3>
                          <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-500">Name:</span>
                              <span className="font-medium">
                                {claimsData.find((claim) => claim.id === selectedClaim)?.customer}
                              </span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-500">Email:</span>
                              <span className="font-medium">
                                {claimsData.find((claim) => claim.id === selectedClaim)?.email}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-sm font-medium text-gray-500 mb-2">Flight Information</h3>
                          <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-500">Airline:</span>
                              <span className="font-medium">
                                {claimsData.find((claim) => claim.id === selectedClaim)?.airline}
                              </span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-500">Flight Number:</span>
                              <span className="font-medium">
                                {claimsData.find((claim) => claim.id === selectedClaim)?.flightnumber}
                              </span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-500">Date:</span>
                              <span className="font-medium">
                                {new Date(
                                  claimsData.find((claim) => claim.id === selectedClaim)?.date || ""
                                ).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-sm font-medium text-gray-500 mb-2">Claim Status</h3>
                          <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-500">Status:</span>
                              <StatusBadge
                                status={claimsData.find((claim) => claim.id === selectedClaim)?.status || ""}
                              />
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-500">Stage:</span>
                              <span className="font-medium">
                                {claimsData
                                  .find((claim) => claim.id === selectedClaim)
                                  ?.stage.replace("_", " ")
                                  .replace(/\b\w/g, (l) => l.toUpperCase())}
                              </span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-500">Amount:</span>
                              <span className="font-medium">
                                {claimsData.find((claim) => claim.id === selectedClaim)?.amount}
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
              )}
            </div>
          </TabsContent>

          {/* Communications Tab */}
          <TabsContent value="communications">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Email Templates</CardTitle>
                    <CardDescription>Pre-configured email templates for common scenarios</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="rounded-lg border p-4 cursor-pointer hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium">Claim Confirmation</h3>
                        <Badge variant="outline">Automated</Badge>
                      </div>
                      <p className="text-sm text-gray-500">Sent when a new claim is submitted</p>
                    </div>
                    <div className="rounded-lg border p-4 cursor-pointer hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium">Document Request</h3>
                        <Badge variant="outline">Manual</Badge>
                      </div>
                      <p className="text-sm text-gray-500">Request additional documents from customer</p>
                    </div>
                    <div className="rounded-lg border p-4 cursor-pointer hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium">Claim Status Update</h3>
                        <Badge variant="outline">Automated</Badge>
                      </div>
                      <p className="text-sm text-gray-500">Notify customer about claim status changes</p>
                    </div>
                    <div className="rounded-lg border p-4 cursor-pointer hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium">Successful Claim</h3>
                        <Badge variant="outline">Automated</Badge>
                      </div>
                      <p className="text-sm text-gray-500">Notification about successful compensation</p>
                    </div>
                    <div className="rounded-lg border p-4 cursor-pointer hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium">Airline Communication</h3>
                        <Badge variant="outline">Manual</Badge>
                      </div>
                      <p className="text-sm text-gray-500">Template for airline communication</p>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-4">
                    <Button variant="outline" className="w-full">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Create New Template
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Recent Communications</CardTitle>
                    <CardDescription>Latest emails sent to customers and airlines</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="rounded-lg border p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-medium">Claim Update Notification</h3>
                          <p className="text-xs text-gray-500">Sent to customer@example.com</p>
                        </div>
                        <Badge>2 hours ago</Badge>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        Notification about claim CLM-1002 status change to "In Progress"
                      </p>
                    </div>
                    <div className="rounded-lg border p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-medium">Airline Response</h3>
                          <p className="text-xs text-gray-500">To airline@example.com</p>
                        </div>
                        <Badge>Yesterday</Badge>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        Follow-up request for compensation for claim CLM-1003
                      </p>
                    </div>
                    <div className="rounded-lg border p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-medium">Document Request</h3>
                          <p className="text-xs text-gray-500">Sent to customer@example.com</p>
                        </div>
                        <Badge>3 days ago</Badge>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        Request for boarding pass and ID for claim CLM-1008
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-4">
                    <Button variant="ghost" className="w-full text-sm">
                      View Communication History
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">New Email</CardTitle>
                  <CardDescription>Send an email to a customer or airline</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="recipient">Recipient</Label>
                      <Input id="recipient" placeholder="Email address" type="email" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="template">Template</Label>
                      <Select>
                        <SelectTrigger id="template">
                          <SelectValue placeholder="Select a template" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">No template</SelectItem>
                          <SelectItem value="update">Status Update</SelectItem>
                          <SelectItem value="document">Document Request</SelectItem>
                          <SelectItem value="compensation">Compensation Info</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="Email subject" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <div className="rounded-md border">
                      {/* Rich text editor would go here */}
                      <div className="p-3 text-sm text-gray-500">
                        (Rich text editor would be implemented here)
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="justify-end space-x-2">
                  <Button variant="outline">Save Draft</Button>
                  <Button>
                    <Mail className="mr-2 h-4 w-4" />
                    Send Email
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {isNewClaimModalOpen && (
        <NewClaimModal
          isOpen={isNewClaimModalOpen}
          onClose={() => setIsNewClaimModalOpen(false)}
          onSubmit={handleNewClaimSubmit}
        />
      )}
    </div>
  );
};

export default Admin;
