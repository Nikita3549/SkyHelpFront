import React from 'react';
import FlightDetailsCard from './FlightDetailsCard';
import CompensationDetailsCard from './CompensationDetailsCard';
import NextStepsCard from './NextStepsCard';
import ClaimProgressTimeline from './ClaimProgressTimeline';
import { IClaim } from '@/components/claim-form/interfaces/claims.interface.ts';
import { ClaimStatus } from '@/components/claim-form/enums/claim-status.enum.ts';

interface OverviewTabProps {
  claim: IClaim;
  onUploadDocument: () => void;
  onContactSupport: () => void;
}

const OverviewTab = ({
  claim,
  onUploadDocument,
  onContactSupport,
}: OverviewTabProps) => {
  // Get status-based progress steps
  const getProgressSteps = (claim: IClaim) => {
    const baseSteps = claim.progresses;

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

      {/*<NextStepsCard claim={claim} onUploadDocument={onUploadDocument} />*/}

      <ClaimProgressTimeline
        steps={getProgressSteps(claim)}
        claimOpenedDate={new Date(claim.departureDate).toLocaleDateString()}
        onContactSupport={onContactSupport}
      />
    </div>
  );
};

export default OverviewTab;
