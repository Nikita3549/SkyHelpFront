
import React, { useState, useEffect } from "react";
import { Claim } from "@/lib/supabase";
import ClaimsTableHeader from "./ClaimsTableHeader";
import ClaimsTable from "./ClaimsTable";
import ClaimDetailsSection from "./ClaimDetailsSection";
import { useQueryClient } from "@tanstack/react-query";

type ClaimsTabProps = {
  claimsData: Claim[];
  handleSendEmail: (claimId: string) => void;
  handleUpdateStatus: (claimId: string, newStatus: string) => void;
  handleExportClaims: () => void;
  formatPaymentDetails: (claim: Claim | undefined) => string;
  setIsNewClaimModalOpen: (value: boolean) => void;
  onEditClaim: (claim: Claim) => void;
};

const ClaimsTab = ({
  claimsData,
  handleSendEmail,
  handleUpdateStatus,
  handleExportClaims,
  formatPaymentDetails,
  setIsNewClaimModalOpen,
  onEditClaim,
}: ClaimsTabProps) => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedClaim, setSelectedClaim] = useState<string | null>(null);

  // Force refresh on tab mount/unmount
  useEffect(() => {
    console.log("Claims tab mounted - refreshing claims data");
    queryClient.invalidateQueries({ queryKey: ['claims'] });
    
    return () => {
      console.log("Claims tab unmounted");
    };
  }, [queryClient]);

  // Log claims data for debugging
  useEffect(() => {
    console.log("Claims data in ClaimsTab:", claimsData);
  }, [claimsData]);

  const filteredClaims = claimsData.filter((claim) => {
    const matchesSearch = 
      claim.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.customer?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.airline?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.flightnumber?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || claim.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Calculate pagination
  const itemsPerPage = 10;
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedClaims = filteredClaims.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filteredClaims.length / itemsPerPage);

  return (
    <div className="space-y-6">
      <ClaimsTableHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        handleExportClaims={handleExportClaims}
        setIsNewClaimModalOpen={setIsNewClaimModalOpen}
      />

      <ClaimsTable
        filteredClaims={paginatedClaims}
        totalClaims={filteredClaims.length}
        selectedClaim={selectedClaim}
        setSelectedClaim={setSelectedClaim}
        page={page}
        setPage={setPage}
        totalPages={totalPages}
        handleSendEmail={handleSendEmail}
        handleUpdateStatus={handleUpdateStatus}
      />

      <ClaimDetailsSection
        selectedClaim={selectedClaim}
        setSelectedClaim={setSelectedClaim}
        claimsData={claimsData}
        handleSendEmail={handleSendEmail}
        formatPaymentDetails={formatPaymentDetails}
        onEditClaim={onEditClaim}
      />
    </div>
  );
};

export default ClaimsTab;
