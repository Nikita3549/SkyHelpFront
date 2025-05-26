
import React, { useState } from "react";
import { Claim } from "@/lib/supabase";
import ClaimsTableHeader from "./ClaimsTableHeader";
import ClaimsTable from "./ClaimsTable";
import ClaimDetailsSection from "./ClaimDetailsSection";

type FilterState = {
  dateFrom?: Date;
  dateTo?: Date;
  amountFrom?: string;
  amountTo?: string;
  airline?: string;
};

type ClaimsTabProps = {
  claimsData: Claim[];
  handleSendEmail: (claimId: string) => void;
  handleUpdateStatus: (claimId: string, newStatus: string, reason?: string) => void;
  handleExportClaims: () => void;
  setIsNewClaimModalOpen: (value: boolean) => void;
  onEditClaim: (claim: Claim) => void;
};

const ClaimsTab = ({
  claimsData,
  handleSendEmail,
  handleUpdateStatus,
  handleExportClaims,
  setIsNewClaimModalOpen,
  onEditClaim,
}: ClaimsTabProps) => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedClaim, setSelectedClaim] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterState>({});

  const filteredClaims = claimsData.filter((claim) => {
    const matchesSearch = 
      claim.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.airline.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.flightnumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || claim.status === statusFilter;
    
    // Date range filter
    let matchesDateRange = true;
    if (filters.dateFrom || filters.dateTo) {
      const claimDate = new Date(claim.date);
      if (filters.dateFrom && claimDate < filters.dateFrom) {
        matchesDateRange = false;
      }
      if (filters.dateTo && claimDate > filters.dateTo) {
        matchesDateRange = false;
      }
    }
    
    // Amount range filter
    let matchesAmountRange = true;
    if (filters.amountFrom || filters.amountTo) {
      // Extract numeric value from amount string (e.g., "€250" -> 250)
      const amountMatch = claim.amount.match(/\d+/);
      const claimAmount = amountMatch ? parseInt(amountMatch[0]) : 0;
      
      if (filters.amountFrom && claimAmount < parseInt(filters.amountFrom)) {
        matchesAmountRange = false;
      }
      if (filters.amountTo && claimAmount > parseInt(filters.amountTo)) {
        matchesAmountRange = false;
      }
    }
    
    // Airline filter
    const matchesAirline = !filters.airline || claim.airline.toLowerCase().includes(filters.airline.toLowerCase());
    
    return matchesSearch && matchesStatus && matchesDateRange && matchesAmountRange && matchesAirline;
  });

  return (
    <div className="space-y-6">
      <ClaimsTableHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        handleExportClaims={handleExportClaims}
        setIsNewClaimModalOpen={setIsNewClaimModalOpen}
        filters={filters}
        setFilters={setFilters}
      />

      <ClaimsTable
        filteredClaims={filteredClaims}
        totalClaims={claimsData.length}
        selectedClaim={selectedClaim}
        setSelectedClaim={setSelectedClaim}
        page={page}
        setPage={setPage}
        handleSendEmail={handleSendEmail}
        handleUpdateStatus={handleUpdateStatus}
      />

      <ClaimDetailsSection
        selectedClaim={selectedClaim}
        setSelectedClaim={setSelectedClaim}
        claimsData={claimsData}
        handleSendEmail={handleSendEmail}
        handleUpdateStatus={handleUpdateStatus}
        onEditClaim={onEditClaim}
      />
    </div>
  );
};

export default ClaimsTab;
