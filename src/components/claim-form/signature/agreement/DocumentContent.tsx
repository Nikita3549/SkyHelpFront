
import React from 'react';
import AgreementHeader from './AgreementHeader';
import ClientInfoSection from './ClientInfoSection';
import ClaimDetailsSection from './ClaimDetailsSection';
import LegalTextSection from './LegalTextSection';
import SignatureSection from './SignatureSection';
import { AgreementProps } from './documentUtils';

const DocumentContent: React.FC<AgreementProps> = ({ 
  claimData,
  representativeName = "Max Iliasov",
  companyAddress = "bd.mosova 16"
}) => {
  return (
    <div id="assignment-agreement" className="p-6 bg-white rounded-lg overflow-auto">
      <div className="document-container">
        <AgreementHeader />
        <ClientInfoSection claimData={claimData} />
        <ClaimDetailsSection claimData={claimData} />
        <LegalTextSection companyAddress={companyAddress} />
        <SignatureSection customerName={claimData.customer} representativeName={representativeName} />
      </div>
    </div>
  );
};

export default DocumentContent;

