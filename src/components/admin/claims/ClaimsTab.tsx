
import React, { useState, useEffect } from "react";
import { Claim } from "@/lib/supabase";
import ClaimsTableHeader from "./ClaimsTableHeader";
import ClaimsTable from "./ClaimsTable";
import ClaimDetailsSection from "./ClaimDetailsSection";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

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

  // Force refresh on tab mount and periodically
  useEffect(() => {
    console.log("Claims tab mounted - refreshing claims data");
    queryClient.invalidateQueries({ queryKey: ['claims'] });
    
    // Set up periodic refresh for real-time updates
    const interval = setInterval(() => {
      queryClient.invalidateQueries({ queryKey: ['claims'] });
    }, 3000); // Refresh every 3 seconds
    
    return () => {
      clearInterval(interval);
      console.log("Claims tab unmounted");
    };
  }, [queryClient]);

  // Log claims data for debugging
  useEffect(() => {
    console.log("Claims data in ClaimsTab:", claimsData);
    if (claimsData.length === 0) {
      console.log("No claims data available!");
      // Show toast if no claims data is available when we expect some
      if (window.location.pathname.includes('admin')) {
        toast.info("No claims data available", {
          description: "Add new claims using the 'New Claim' button"
        });
      }
    }
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

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [searchTerm, statusFilter]);

  // Calculate pagination
  const itemsPerPage = 10;
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedClaims = filteredClaims.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.max(1, Math.ceil(filteredClaims.length / itemsPerPage));

  // Force page reset if the current page is beyond available pages
  useEffect(() => {
    if (page > totalPages && totalPages > 0) {
      setPage(totalPages);
    }
  }, [totalPages, page]);

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
