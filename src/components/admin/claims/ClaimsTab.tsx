import React, { useEffect, useState } from 'react';
import { Claim } from '@/lib/supabase';
import ClaimsTableHeader from './ClaimsTableHeader';
import ClaimsTable from './ClaimsTable';
import ClaimDetailsSection from './ClaimDetailsSection';
import api from '@/api/axios.ts';
import { IClaimBackend } from '@/components/claim-form/interfaces/claim-back.interface.ts';
import { toast } from 'sonner';

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
  handleSendEmail,
  handleUpdateStatus,
  setIsNewClaimModalOpen,
  onEditClaim,
}: ClaimsTabProps) => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedClaim, setSelectedClaim] = useState<string | null>(null);
  const [claimsData, setClaimsData] = useState<Claim[]>([]);

  const handleExportClaims = () => {
    const headers = [
      'ID',
      'Customer',
      'Email',
      'Airline',
      'Flight Number',
      'Date',
      'Status',
      'Stage',
      'Amount',
      'Last Updated',
    ];
    const csvRows = [headers];

    claimsData.forEach((claim) => {
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
        claim.lastupdated,
      ]);
    });

    const csvContent = csvRows.map((row) => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute(
      'download',
      `flight-claims-${new Date().toISOString().split('T')[0]}.csv`,
    );
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success('Export completed', {
      description: 'Claims data has been exported to CSV',
    });
  };

  useEffect(() => {
    (async () => {
      const res = await api.get<IClaimBackend[]>(
        `/claims/admin/all?page=${page}`,
      );

      setClaimsData(
        res.data.map((c) => ({
          id: c.id,
          email: c.customer.email,
          bookingRef: c.details.bookingRef,
          customer: `${c.customer.firstName} ${c.customer.lastName}`,
          airline: c.details.airlines.name,
          airlineIcao: c.details.airlines.icao,
          flightnumber: c.details.flightNumber,
          date: c.details.date.slice(0, 10),
          status: c.state.status.toLowerCase() as
            | 'pending'
            | 'in_progress'
            | 'escalated'
            | 'completed'
            | 'rejected'
            | 'not_eligible',
          stage: '-',
          amount: c.state.amount.toString(),
          lastupdated: c.updatedAt,
          created_at: c.createdAt,
          phone: c.customer.phone,
          address: c.customer.address,
          numberofpassengers: '1',
          departureairport: `${c.details?.routes.find((r) => r.troubled)?.DepartureAirport.name} (${c.details?.routes.find((r) => r.troubled)?.DepartureAirport.icao})`,
          arrivalairport: `${c.details?.routes.find((r) => r.troubled)?.ArrivalAirport.name} (${c.details?.routes.find((r) => r.troubled)?.ArrivalAirport.icao})`,
          flightissue: c.issue.disruptionType,
          reasongivenbyairline: c.issue.airlineReason,
          additionalinformation: c.issue.additionalInfo,
          paymentmethod: c.payment.paymentMethod,
          paymentdetails: {
            ...c.payment,
          },
          communicationlog: '-',
          progressSteps: '-',
          documents: c.documents.map((d) => ({
            ...d,
            status: 'uploaded',
            title: d.name,
          })),
          progresses: c.state.progress,
          routes: [...c.details.routes],
        })),
      );
    })();
  }, [page]);

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
