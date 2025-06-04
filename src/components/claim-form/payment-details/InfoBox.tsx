import React from 'react';

const InfoBox: React.FC = () => {
  return (
    <div className="bg-blue-50 rounded-lg p-4 text-sm text-blue-700">
      <p className="font-medium mb-2">Here's what happens next:</p>
      <ul className="list-disc pl-5 space-y-1">
        <li>
          We'll review your claim details and may contact you for additional
          information.
        </li>
        <li>
          We'll submit your claim to the airline and negotiate on your behalf.
        </li>
        <li>
          Once compensation is received, we'll transfer it to your specified
          payment method.
        </li>
        <li>
          Our service fee (25% + VAT) will be deducted from the compensation
          amount.
        </li>
      </ul>
    </div>
  );
};

export default InfoBox;
