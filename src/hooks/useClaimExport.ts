import { toast } from 'sonner';
import { Claim } from '@/lib/supabase';

export function useClaimExport() {
  const handleExportClaims = (claimsData: Claim[]) => {
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

  return {
    handleExportClaims,
  };
}
