
import { useState } from "react";
import { toast } from "sonner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { claimsService } from "@/services/claimsService";
import { Claim } from "@/lib/supabase";

export function useClaimsOperations() {
  const [isNewClaimModalOpen, setIsNewClaimModalOpen] = useState(false);
  const [isEditClaimModalOpen, setIsEditClaimModalOpen] = useState(false);
  const [selectedClaimForEdit, setSelectedClaimForEdit] = useState<Claim | null>(null);
  
  const queryClient = useQueryClient();
  
  const { data: claimsData = [], isLoading, error } = useQuery({
    queryKey: ['claims'],
    queryFn: claimsService.getClaims,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    staleTime: 5000, // 5 seconds - make data stale more quickly
    refetchInterval: 30000, // 30 seconds - auto refresh every 30 seconds
  });
  
  console.log("Claims data from useClaimsOperations:", claimsData);
  
  const updateClaimMutation = useMutation({
    mutationFn: ({ claimId, updates }: { claimId: string, updates: Partial<Claim> }) => 
      claimsService.updateClaim(claimId, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['claims'] });
      toast.success("Claim updated successfully");
    },
    onError: (error) => {
      console.error("Failed to update claim:", error);
      toast.error("Failed to update claim", {
        description: error instanceof Error ? error.message : "An unknown error occurred",
      });
    },
  });
  
  const createClaimMutation = useMutation({
    mutationFn: (claimData: Omit<Claim, 'created_at'>) => 
      claimsService.createClaim(claimData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['claims'] });
      toast.success("New claim created successfully");
    },
    onError: (error) => {
      console.error("Failed to create claim:", error);
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
    updateClaimMutation.mutate({ 
      claimId, 
      updates: { status: newStatus as any } 
    });
    
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
    console.log("Submitting new claim:", claimData);
    createClaimMutation.mutate(claimData);
    
    setIsNewClaimModalOpen(false);
  };

  const handleEditClaim = (claim: Claim) => {
    console.log("Editing claim:", claim);
    setSelectedClaimForEdit(claim);
    setIsEditClaimModalOpen(true);
  };

  const handleEditClaimSubmit = (claimData: Partial<Claim>) => {
    if (!claimData.id) {
      console.error("Cannot update claim without ID");
      return;
    }
    
    console.log("Submitting edited claim:", claimData);
    updateClaimMutation.mutate({
      claimId: claimData.id,
      updates: claimData
    });
    
    setIsEditClaimModalOpen(false);
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

  return {
    claimsData,
    isLoading,
    error,
    isNewClaimModalOpen,
    setIsNewClaimModalOpen,
    isEditClaimModalOpen,
    setIsEditClaimModalOpen,
    selectedClaimForEdit,
    handleSendEmail,
    handleUpdateStatus,
    handleExportClaims,
    handleNewClaimSubmit,
    handleEditClaim,
    handleEditClaimSubmit,
    formatPaymentDetails
  };
}
