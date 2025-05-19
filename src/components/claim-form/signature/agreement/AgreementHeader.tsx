
import React from 'react';
import Logo from "@/components/ui-custom/Logo";
import { getFormattedDate } from './documentUtils';

const AgreementHeader: React.FC = () => {
  const today = getFormattedDate();
  
  return (
    <div className="header">
      <div className="logo-wrapper">
        <Logo size="md" withLink={false} />
      </div>
      <h1 className="document-title">ASSIGNMENT FORM</h1>
      <div className="date">{today}</div>
    </div>
  );
};

export default AgreementHeader;
