
import React from 'react';
import AgreementHeader from './AgreementHeader';
import ClientInfoSection from './ClientInfoSection';
import ClaimDetailsSection from './ClaimDetailsSection';
import LegalTextSection from './LegalTextSection';
import SignatureSection from './SignatureSection';
import { AgreementProps } from './documentUtils';

const DocumentContent: React.FC<AgreementProps> = ({ 
  claimData,
  representativeName = "Sigitas Kačiušis",
  companyAddress = "Dariaus ir Girėno St. 21A, Vilnius, the Republic of Lithuania"
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
