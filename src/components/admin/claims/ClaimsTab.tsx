import React, { useState } from 'react';
import { Claim } from '@/lib/supabase';
import ClaimsTableHeader from './ClaimsTableHeader';
import ClaimsTable from './ClaimsTable';
import ClaimDetailsSection from './ClaimDetailsSection';

type ClaimsTabProps = {
  claimsData: Claim[];
  handleSendEmail: (claimId: string) => void;
  handleUpdateStatus: (
    claimId: string,
    newStatus: string,
    reason?: string,
  ) => void;
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
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedClaim, setSelectedClaim] = useState<string | null>(null);

  const filteredClaims = claimsData.filter((claim) => {
    const matchesSearch =
      claim.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.airline.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.flightnumber.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' || claim.status === statusFilter;

    return matchesSearch && matchesStatus;
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
