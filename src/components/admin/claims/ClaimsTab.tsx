
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, FileDown } from "lucide-react";
import { Claim } from "@/lib/supabase";
import ClaimsTableHeader from "./ClaimsTableHeader";
import ClaimsTable from "./ClaimsTable";
import ClaimDetailsSection from "./ClaimDetailsSection";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [selectedClaim, setSelectedClaim] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  // Filter claims based on search query and status filter
  const filteredClaims = claimsData
    .filter((claim) => {
      if (statusFilter && claim.status !== statusFilter) return false;
      
      const searchTerm = searchQuery.toLowerCase();
      return (
        claim.id.toLowerCase().includes(searchTerm) ||
        claim.customer.toLowerCase().includes(searchTerm) ||
        claim.email.toLowerCase().includes(searchTerm) ||
        claim.airline.toLowerCase().includes(searchTerm) ||
        claim.flightnumber.toLowerCase().includes(searchTerm)
      );
    })
    .slice((page - 1) * 10, page * 10);
  
  const totalClaims = claimsData.filter((claim) => {
    if (statusFilter && claim.status !== statusFilter) return false;
    
    const searchTerm = searchQuery.toLowerCase();
    return (
      claim.id.toLowerCase().includes(searchTerm) ||
      claim.customer.toLowerCase().includes(searchTerm) ||
      claim.email.toLowerCase().includes(searchTerm) ||
      claim.airline.toLowerCase().includes(searchTerm) ||
      claim.flightnumber.toLowerCase().includes(searchTerm)
    );
  }).length;

  const selectedClaimData = claimsData.find(claim => claim.id === selectedClaim);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Claims Management</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleExportClaims}>
            <FileDown className="h-4 w-4 mr-2" />
            Export to CSV
          </Button>
          <Button size="sm" onClick={() => setIsNewClaimModalOpen(true)}>
            <PlusCircle className="h-4 w-4 mr-2" />
            New Claim
          </Button>
        </div>
      </div>

      <ClaimsTableHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      <ClaimsTable
        filteredClaims={filteredClaims}
        totalClaims={totalClaims}
        selectedClaim={selectedClaim}
        setSelectedClaim={setSelectedClaim}
        page={page}
        setPage={setPage}
        handleSendEmail={handleSendEmail}
        handleUpdateStatus={handleUpdateStatus}
        onEditClaim={onEditClaim}
      />

      {selectedClaim && selectedClaimData && (
        <ClaimDetailsSection
          selectedClaimId={selectedClaim}
          claim={selectedClaimData}
          handleSendEmail={handleSendEmail}
          formatPaymentDetails={formatPaymentDetails}
          onEditClaim={onEditClaim}
        />
      )}
    </div>
  );
};

export default ClaimsTab;
