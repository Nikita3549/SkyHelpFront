
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface LegalLinksProps {
  onOpenAssignmentAgreement: () => void;
}

interface LegalDocumentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: React.ReactNode;
}

const LegalDocumentDialog: React.FC<LegalDocumentDialogProps> = ({
  isOpen,
  onClose,
  title,
  content
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{title}</DialogTitle>
        </DialogHeader>
        <div className="p-6">{content}</div>
      </DialogContent>
    </Dialog>
  );
};

export const LegalLinks: React.FC<LegalLinksProps> = ({ onOpenAssignmentAgreement }) => {
  const [termsOpen, setTermsOpen] = React.useState(false);
  const [priceListOpen, setPriceListOpen] = React.useState(false);

  return (
    <>
      <span>By signing you agree to </span>
      <a 
        href="#" 
        className="text-blue-600 hover:underline"
        onClick={(e) => {
          e.preventDefault();
          setTermsOpen(true);
        }}
      >
        Terms and Conditions
      </a>
      <span> and </span>
      <a 
        href="#" 
        className="text-blue-600 hover:underline"
        onClick={(e) => {
          e.preventDefault();
          setPriceListOpen(true);
        }}
      >
        Price List
      </a>
      <span>, and you authorize us to show your signature on the </span>
      <a 
        href="#" 
        className="text-blue-600 hover:underline"
        onClick={(e) => {
          e.preventDefault();
          onOpenAssignmentAgreement();
        }}
      >
        Assignment Agreement
      </a>
      <span>.</span>

      <LegalDocumentDialog
        isOpen={termsOpen}
        onClose={() => setTermsOpen(false)}
        title="Terms and Conditions"
        content={
          <div className="space-y-4 text-gray-700">
            <h3 className="text-lg font-semibold">1. Introduction</h3>
            <p>These Terms and Conditions govern your use of our flight compensation claim service. By using our service, you agree to these terms in full.</p>
            
            <h3 className="text-lg font-semibold">2. Our Service</h3>
            <p>We provide assistance in claiming compensation for flight delays, cancellations, and denied boarding under applicable regulations such as EC 261/2004.</p>
            
            <h3 className="text-lg font-semibold">3. Fee Structure</h3>
            <p>Our service operates on a "No Win, No Fee" basis. If we are unsuccessful in claiming compensation for you, you will not be charged. If successful, our fee is 25% of the compensation amount plus applicable VAT.</p>
            
            <h3 className="text-lg font-semibold">4. Your Responsibilities</h3>
            <p>You agree to provide accurate and complete information regarding your flight and the disruption experienced. You authorize us to act on your behalf in communications with the airline.</p>
            
            <h3 className="text-lg font-semibold">5. Data Protection</h3>
            <p>We process your personal data in accordance with our Privacy Policy. We only use your data to process your claim and for related communications.</p>
            
            <h3 className="text-lg font-semibold">6. Termination</h3>
            <p>Either party may terminate this agreement with written notice. If termination occurs after we have initiated the claim process, our standard fee may still apply if the claim is subsequently successful.</p>
            
            <h3 className="text-lg font-semibold">7. Liability</h3>
            <p>Our liability is limited to the amount of compensation received. We are not liable for any indirect or consequential losses.</p>
            
            <h3 className="text-lg font-semibold">8. Governing Law</h3>
            <p>These terms are governed by and construed in accordance with the laws of Lithuania.</p>
          </div>
        }
      />

      <LegalDocumentDialog
        isOpen={priceListOpen}
        onClose={() => setPriceListOpen(false)}
        title="Price List"
        content={
          <div className="space-y-4 text-gray-700">
            <h3 className="text-lg font-semibold">Service Fees</h3>
            <p>Our service operates on a "No Win, No Fee" basis. We only charge a fee if we successfully secure compensation for your claim.</p>
            
            <div className="mt-4 border rounded-lg overflow-hidden">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fee</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Flight Delay Compensation Claim</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">25% of the compensation amount + VAT</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Flight Cancellation Compensation Claim</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">25% of the compensation amount + VAT</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Denied Boarding Compensation Claim</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">25% of the compensation amount + VAT</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Additional Legal Proceedings (if required)</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Additional 10% of the compensation amount + VAT</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <h3 className="text-lg font-semibold mt-6">Payment Terms</h3>
            <p>Fees are deducted from the compensation amount before the remaining balance is transferred to you. We aim to process payments within 14 days of receiving compensation from the airline.</p>
            
            <h3 className="text-lg font-semibold mt-6">Example Calculation</h3>
            <p>For a successful claim with €600 compensation:</p>
            <ul className="list-disc pl-5 mt-2">
              <li>Compensation amount: €600</li>
              <li>Our fee (25%): €150</li>
              <li>VAT (if applicable): €31.50</li>
              <li>Amount you receive: €418.50</li>
            </ul>
            
            <p className="mt-4 text-sm italic">Prices effective as of January 2025. Subject to change. VAT rates may vary based on your country of residence.</p>
          </div>
        }
      />
    </>
  );
};

export default LegalLinks;
