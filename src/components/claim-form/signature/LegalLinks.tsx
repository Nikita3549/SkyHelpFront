
import React from "react";

interface LegalLinksProps {
  onOpenAssignmentAgreement: () => void;
}

export const LegalLinks: React.FC<LegalLinksProps> = ({ onOpenAssignmentAgreement }) => {
  // Open links in new tabs
  const handleTermsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open("/terms", "_blank");
  };

  const handlePriceClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open("/price", "_blank");
  };

  return (
    <span className="text-sm font-medium">
      I agree to the{" "}
      <a
        href="#"
        onClick={handleTermsClick}
        className="text-blue-600 hover:underline font-medium"
      >
        Terms and Conditions
      </a>
      {" "}and{" "}
      <a
        href="#"
        onClick={handlePriceClick}
        className="text-blue-600 hover:underline font-medium"
      >
        Price List
      </a>
      . I also confirm that I have read the{" "}
      <button
        type="button"
        onClick={onOpenAssignmentAgreement}
        className="text-blue-600 hover:underline font-medium"
      >
        Assignment Agreement
      </button>
      .
    </span>
  );
};
