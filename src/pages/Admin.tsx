
import React, { useEffect } from "react";
import { useClaimsOperations } from "@/hooks/useClaimsOperations";
import LoadingState from "@/components/admin/LoadingState";
import ErrorState from "@/components/admin/ErrorState";
import AdminContent from "@/components/admin/AdminContent";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const Admin = () => {
  const queryClient = useQueryClient();
  
  // Force refresh claims data when the admin page loads and periodically
  useEffect(() => {
    console.log("Admin page mounted - invalidating claims query");
    
    // Initial refresh
    queryClient.invalidateQueries({ queryKey: ['claims'] });
    
    // Set up periodic refresh
    const interval = setInterval(() => {
      console.log("Periodic claims refresh");
      queryClient.invalidateQueries({ queryKey: ['claims'] });
    }, 5000); // Refresh every 5 seconds for more responsive updates
    
    return () => {
      clearInterval(interval);
      console.log("Admin page unmounted - clearing interval");
    };
  }, [queryClient]);

  const {
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
  } = useClaimsOperations();

  // Log claims data for debugging
  useEffect(() => {
    console.log("Admin page - current claims data:", claimsData);
    if (claimsData.length === 0) {
      console.log("No claims data available in Admin!");
    }
  }, [claimsData]);

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    toast.error("Error loading claims data", {
      description: "Please try refreshing the page",
    });
    return <ErrorState error={error} />;
  }

  return (
    <AdminContent
      claimsData={claimsData}
      isNewClaimModalOpen={isNewClaimModalOpen}
      setIsNewClaimModalOpen={setIsNewClaimModalOpen}
      isEditClaimModalOpen={isEditClaimModalOpen}
      setIsEditClaimModalOpen={setIsEditClaimModalOpen}
      selectedClaimForEdit={selectedClaimForEdit}
      handleSendEmail={handleSendEmail}
      handleUpdateStatus={handleUpdateStatus}
      handleExportClaims={handleExportClaims}
      formatPaymentDetails={formatPaymentDetails}
      handleNewClaimSubmit={handleNewClaimSubmit}
      handleEditClaim={handleEditClaim}
      handleEditClaimSubmit={handleEditClaimSubmit}
    />
  );
};

export default Admin;
