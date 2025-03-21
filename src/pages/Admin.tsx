
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";
import { toast } from "sonner";
import NewClaimModal from "@/components/admin/NewClaimModal";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { claimsService } from "@/services/claimsService";
import { Claim } from "@/lib/supabase";
import DashboardTab from "@/components/admin/dashboard/DashboardTab";
import ClaimsTab from "@/components/admin/claims/ClaimsTab";
import CommunicationsTab from "@/components/admin/communications/CommunicationsTab";

const Admin = () => {
  const [isNewClaimModalOpen, setIsNewClaimModalOpen] = useState(false);
  
  const queryClient = useQueryClient();
  
  const { data: claimsData = [], isLoading, error } = useQuery({
    queryKey: ['claims'],
    queryFn: claimsService.getClaims,
  });
  
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
    const headers = ["ID", "Customer", "Email", "Airline", "Flight Number", "Date", "Status", "Stage", "Amount", "Last Updated"];
    const csvRows = [headers];
    
    claimsData.forEach(claim => {
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

  const formatPaymentDetails = (claim: Claim | undefined) => {
    if (!claim || !claim.paymentmethod || !claim.paymentdetails) {
      return "No payment details available";
    }

    const details = claim.paymentdetails;
    let formattedDetails = "";

    switch (claim.paymentmethod) {
      case "bank_transfer":
        formattedDetails = `Bank: ${details.bankName || 'N/A'}\nAccount holder: ${details.accountHolderName || 'N/A'}\nIBAN: ${details.iban || 'N/A'}\nAccount number: ${details.accountNumber || 'N/A'}`;
        break;
      case "paypal":
        formattedDetails = `PayPal email: ${details.paypalEmail || 'N/A'}`;
        break;
      case "wise":
        formattedDetails = `Account holder: ${details.accountHolderName || 'N/A'}\nIBAN/Account: ${details.ibanOrAccount || 'N/A'}\nEmail: ${details.email || 'N/A'}`;
        break;
      default:
        formattedDetails = "No payment details available";
    }

    return formattedDetails;
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

          <TabsContent value="dashboard">
            <DashboardTab />
          </TabsContent>

          <TabsContent value="claims">
            <ClaimsTab 
              claimsData={claimsData}
              handleSendEmail={handleSendEmail}
              handleUpdateStatus={handleUpdateStatus}
              handleExportClaims={handleExportClaims}
              formatPaymentDetails={formatPaymentDetails}
              setIsNewClaimModalOpen={setIsNewClaimModalOpen}
            />
          </TabsContent>

          <TabsContent value="communications">
            <CommunicationsTab />
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
