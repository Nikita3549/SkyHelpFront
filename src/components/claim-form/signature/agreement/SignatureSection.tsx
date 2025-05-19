
import React from 'react';

interface SignatureSectionProps {
  customerName: string;
  representativeName: string;
}

const SignatureSection: React.FC<SignatureSectionProps> = ({ customerName, representativeName }) => {
  return (
    <div className="signature-section">
      <div className="signature-box">
        <div className="signature-title">Client</div>
        <div className="signature-name">{customerName}</div>
        <div className="signature-line"></div>
        <div className="signature-label">Signature</div>
      </div>
      
      <div className="signature-box">
        <div className="signature-title">Head of Operations Department of SkyHelp</div>
        <div className="signature-name">{representativeName}</div>
        <div className="signature-line"></div>
        <div className="signature-label">Signature</div>
      </div>
    </div>
  );
};

export default SignatureSection;
