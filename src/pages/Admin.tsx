
import React, { useState } from "react";
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

// Sample admin data
const claimsData = [
  {
    id: "CLM-1001",
    customer: "John Smith",
    email: "john.smith@example.com",
    airline: "Lufthansa",
    flightNumber: "LH1234",
    date: "2023-12-10",
    status: "pending",
    stage: "document_verification",
    amount: "€400",
    lastUpdated: "2023-12-15",
  },
  {
    id: "CLM-1002",
    customer: "Sarah Johnson",
    email: "sarah.j@example.com",
    airline: "British Airways",
    flightNumber: "BA0934",
    date: "2023-11-28",
    status: "in_progress",
    stage: "airline_communication",
    amount: "€250",
    lastUpdated: "2023-12-14",
  },
  {
    id: "CLM-1003",
    customer: "Michael Chen",
    email: "m.chen@example.com",
    airline: "Air France",
    flightNumber: "AF1234",
    date: "2023-12-05",
    status: "escalated",
    stage: "regulator_appeal",
    amount: "€600",
    lastUpdated: "2023-12-13",
  },
  {
    id: "CLM-1004",
    customer: "Emma Williams",
    email: "emma.w@example.com",
    airline: "Ryanair",
    flightNumber: "FR7892",
    date: "2023-11-15",
    status: "completed",
    stage: "payment_processed",
    amount: "€250",
    lastUpdated: "2023-12-10",
  },
  {
    id: "CLM-1005",
    customer: "Robert Garcia",
    email: "r.garcia@example.com",
    airline: "EasyJet",
    flightNumber: "EZY6790",
    date: "2023-12-01",
    status: "rejected",
    stage: "claim_rejected",
    amount: "€0",
    lastUpdated: "2023-12-12",
  },
  {
    id: "CLM-1006",
    customer: "Lisa Müller",
    email: "l.mueller@example.com",
    airline: "Eurowings",
    flightNumber: "EW1820",
    date: "2023-12-08",
    status: "pending",
    stage: "initial_review",
    amount: "€400",
    lastUpdated: "2023-12-15",
  },
  {
    id: "CLM-1007",
    customer: "David Wilson",
    email: "d.wilson@example.com",
    airline: "KLM",
    flightNumber: "KL1345",
    date: "2023-11-30",
    status: "in_progress",
    stage: "airline_communication",
    amount: "€400",
    lastUpdated: "2023-12-14",
  },
];

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

  // Filter claims based on search term and status
  const filteredClaims = claimsData.filter((claim) => {
    const matchesSearch = 
      claim.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.airline.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.flightNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
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
    toast.success("Status updated", {
      description: `Claim ${claimId} status changed to ${newStatus}`,
    });
  };

  const handleExportClaims = () => {
    toast.success("Export initiated", {
      description: "Claims data is being exported to CSV",
    });
  };

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
              {/* Stats Overview */}
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
                {/* Recent Activity */}
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

                {/* Charts and Performance Metrics */}
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

              {/* Quick Actions */}
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
              {/* Filters and Search */}
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
                  <Button size="sm">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    New Claim
                  </Button>
                </div>
              </motion.div>

              {/* Claims Table */}
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
                                <div className="text-xs text-gray-500">{claim.flightNumber}</div>
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

              {/* Selected Claim Details */}
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
                                {claimsData.find((claim) => claim.id === selectedClaim)?.flightNumber}
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
                {/* Email Templates */}
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

                {/* Communication Log */}
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
                          <p className="text-xs text-gray-500">To: john.smith@example.com</p>
                        </div>
                        <Badge>Sent</Badge>
                      </div>
                      <p className="text-sm text-gray-500 mb-2">
                        Update on claim CLM-1001 status change to document verification
                      </p>
                      <p className="text-xs text-gray-400">Today, 10:45 AM</p>
                    </div>
                    <div className="rounded-lg border p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-medium">Document Request</h3>
                          <p className="text-xs text-gray-500">To: m.chen@example.com</p>
                        </div>
                        <Badge>Sent</Badge>
                      </div>
                      <p className="text-sm text-gray-500 mb-2">
                        Request for additional documentation for claim CLM-1003
                      </p>
                      <p className="text-xs text-gray-400">Today, 09:30 AM</p>
                    </div>
                    <div className="rounded-lg border p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-medium">Airline Appeal</h3>
                          <p className="text-xs text-gray-500">To: claims@lufthansa.com</p>
                        </div>
                        <Badge>Sent</Badge>
                      </div>
                      <p className="text-sm text-gray-500 mb-2">
                        Appeal for claim CLM-1001 with additional evidence
                      </p>
                      <p className="text-xs text-gray-400">Yesterday, 04:15 PM</p>
                    </div>
                    <div className="rounded-lg border p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-medium">Payment Confirmation</h3>
                          <p className="text-xs text-gray-500">To: emma.w@example.com</p>
                        </div>
                        <Badge>Sent</Badge>
                      </div>
                      <p className="text-sm text-gray-500 mb-2">
                        Confirmation of compensation payment for claim CLM-1004
                      </p>
                      <p className="text-xs text-gray-400">Yesterday, 02:30 PM</p>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-4">
                    <Button variant="ghost" className="w-full text-sm" size="sm">
                      View All Communications
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>

              {/* Bulk Email */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Bulk Email Campaign</CardTitle>
                    <CardDescription>Send mass communications to customers</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="email-template">Email Template</Label>
                          <Select>
                            <SelectTrigger id="email-template">
                              <SelectValue placeholder="Select template" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="status_update">Status Update</SelectItem>
                              <SelectItem value="document_request">Document Request</SelectItem>
                              <SelectItem value="payment_notification">Payment Notification</SelectItem>
                              <SelectItem value="custom">Custom Message</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="subject">Subject Line</Label>
                          <Input id="subject" placeholder="Enter email subject" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="recipient-filter">Recipient Filter</Label>
                          <Select>
                            <SelectTrigger id="recipient-filter">
                              <SelectValue placeholder="Select filter" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Customers</SelectItem>
                              <SelectItem value="pending">Pending Claims</SelectItem>
                              <SelectItem value="in_progress">In Progress Claims</SelectItem>
                              <SelectItem value="completed">Completed Claims</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message Content</Label>
                        <textarea
                          id="message"
                          placeholder="Enter your message"
                          className="min-h-[200px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        ></textarea>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-4 flex justify-between">
                    <Button variant="outline">Preview Email</Button>
                    <Button>
                      <Mail className="mr-2 h-4 w-4" />
                      Send Campaign
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
