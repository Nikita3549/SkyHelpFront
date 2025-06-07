import React from 'react';
import FlightDetailsCard from './FlightDetailsCard';
import CompensationDetailsCard from './CompensationDetailsCard';
import NextStepsCard from './NextStepsCard';
import ClaimProgressTimeline from './ClaimProgressTimeline';

interface Claim {
  id: string;
  airline: string;
  flightNumber: string;
  departureDate: string;
  route: string;
  status: string;
  statusText: string;
  compensation: string;
  progress: number;
  lastUpdate: string;
  estimatedCompletion?: string;
  paymentDate?: string;
  documents: Array<{ name: string; status: string }>;
  messages: Array<{ date: string; content: string; isFromTeam: boolean }>;
}

interface OverviewTabProps {
  claim: Claim;
  onUploadDocument: () => void;
  onContactSupport: () => void;
}

const OverviewTab = ({
  claim,
  onUploadDocument,
  onContactSupport,
}: OverviewTabProps) => {
  // Get status-based progress steps
  const getProgressSteps = (claim: Claim) => {
    const baseSteps = [
      {
        id: 'received',
        title: 'Claim Received',
        description:
          "We've received your claim and started the review process.",
        date: new Date(claim.departureDate).toLocaleDateString(),
        status: 'completed' as const,
      },
      {
        id: 'verified',
        title: 'Documents Verified',
        description: 'Your documents have been reviewed and approved.',
        date:
          claim.status !== 'review'
            ? new Date(claim.lastUpdate).toLocaleDateString()
            : undefined,
        status:
          claim.status === 'review'
            ? ('current' as const)
            : ('completed' as const),
      },
      {
        id: 'contacted',
        title: 'Airline Contacted',
        description: "We've sent your compensation.svg request to the airline.",
        date:
          claim.status === 'completed' || claim.status === 'in_progress'
            ? new Date(claim.lastUpdate).toLocaleDateString()
            : undefined,
        status:
          claim.status === 'review'
            ? ('upcoming' as const)
            : claim.status === 'in_progress'
              ? ('current' as const)
              : ('completed' as const),
      },
      {
        id: 'awaiting',
        title: 'Awaiting Response',
        description: 'We are waiting for a response from the airline.',
        date:
          claim.status === 'completed'
            ? new Date(claim.lastUpdate).toLocaleDateString()
            : undefined,
        status:
          claim.status !== 'completed' && claim.status !== 'in_progress'
            ? ('upcoming' as const)
            : claim.status === 'in_progress'
              ? ('current' as const)
              : ('completed' as const),
      },
    ];

    // Add final step based on claim status
    if (claim.status === 'completed') {
      baseSteps.push({
        id: 'completed',
        title: 'Compensation Paid',
        description: `Your compensation of ${claim.compensation} has been processed.`,
        date: claim.paymentDate
          ? new Date(claim.paymentDate).toLocaleDateString()
          : undefined,
        status: 'completed' as const,
      });
    } else {
      baseSteps.push({
        id: 'pending',
        title: 'Compensation Pending',
        description: 'Once approved, your compensation.svg will be processed.',
        date: undefined,
        status: 'upcoming' as const,
      });
    }

    return baseSteps;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <FlightDetailsCard claim={claim} />
        </div>

        <div className="space-y-6">
          <CompensationDetailsCard claim={claim} />
        </div>
      </div>

      <NextStepsCard claim={claim} onUploadDocument={onUploadDocument} />

      <ClaimProgressTimeline
        steps={getProgressSteps(claim)}
        claimOpenedDate={new Date(claim.departureDate).toLocaleDateString()}
        onContactSupport={onContactSupport}
      />
    </div>
  );
};

export default OverviewTab;
