
import React, { useEffect } from "react";
import { useClaimsOperations } from "@/hooks/useClaimsOperations";
import LoadingState from "@/components/admin/LoadingState";
import ErrorState from "@/components/admin/ErrorState";
import AdminContent from "@/components/admin/AdminContent";
import { useQueryClient } from "@tanstack/react-query";

const Admin = () => {
  const queryClient = useQueryClient();
  
  // Force refresh claims data when the admin page loads
  useEffect(() => {
    console.log("Admin page mounted - invalidating claims query");
    queryClient.invalidateQueries({ queryKey: ['claims'] });
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

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
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
