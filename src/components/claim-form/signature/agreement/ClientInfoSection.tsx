
import React from 'react';
import { ClaimData } from './documentUtils';

interface ClientInfoSectionProps {
  claimData: ClaimData;
}

const ClientInfoSection: React.FC<ClientInfoSectionProps> = ({ claimData }) => {
  return (
    <div className="client-info">
      <div className="client-name">{claimData.customer}</div>
      <div className="client-details">{claimData.dateOfBirth || ""}</div>
      <div className="client-details">{claimData.address || ""}</div>
      <div className="client-caption">First name and last name, date of birth, address ("Client")</div>
    </div>
  );
};

export default ClientInfoSection;
