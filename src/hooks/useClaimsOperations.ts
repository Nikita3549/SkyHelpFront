
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
  });
  
  const updateClaimMutation = useMutation({
    mutationFn: ({ claimId, updates }: { claimId: string, updates: Partial<Claim> }) => 
      claimsService.updateClaim(claimId, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['claims'] });
    },
    onError: (error) => {
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

  const handleUpdateStatus = (claimId: string, newStatus: string, reason?: string) => {
    const updates: Partial<Claim> = { 
      status: newStatus as any,
      lastupdated: new Date().toISOString().split('T')[0]
    };
    
    // If a reason was provided (for not_eligible status), store it in additionalinformation
    if (reason && newStatus === 'not_eligible') {
      updates.additionalinformation = `Not eligible reason: ${reason}`;
    }
    
    updateClaimMutation.mutate({ 
      claimId, 
      updates
    });
    
    if (newStatus !== 'not_eligible') {
      toast.success("Status updated", {
        description: `Claim ${claimId} status changed to ${newStatus}`,
      });
    }
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

  const handleEditClaim = (claim: Claim) => {
    setSelectedClaimForEdit(claim);
    setIsEditClaimModalOpen(true);
  };

  const handleEditClaimSubmit = (claimData: Partial<Claim>) => {
    if (!claimData.id) return;
    
    updateClaimMutation.mutate({
      claimId: claimData.id,
      updates: claimData
    });
    
    toast.success("Claim updated", {
      description: `Claim ${claimData.id} has been updated successfully`,
    });
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
    handleEditClaimSubmit
  };
}
