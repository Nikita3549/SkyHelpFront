
import React from 'react';
import { ClaimData } from './documentUtils';

interface ClaimDetailsSectionProps {
  claimData: ClaimData;
}

const ClaimDetailsSection: React.FC<ClaimDetailsSectionProps> = ({ claimData }) => {
  return (
    <div className="claim-details">
      <p className="section-title">Assignment details:</p>
      
      <p className="claim-id">Claim ID: {claimData.id}</p>
      
      <table className="claim-table">
        <tbody>
          <tr>
            <td>Air carrier:</td>
            <td>{claimData.airline}</td>
          </tr>
          <tr>
            <td>Flight No:</td>
            <td>{claimData.flightnumber}</td>
          </tr>
          <tr>
            <td>Flight date:</td>
            <td>{claimData.date}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ClaimDetailsSection;
