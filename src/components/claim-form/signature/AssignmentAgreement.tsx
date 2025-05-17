
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Printer, Download } from "lucide-react";
import { format } from "date-fns";

interface AssignmentAgreementProps {
  isOpen: boolean;
  onClose: () => void;
  claimData: {
    customer: string;
    dateOfBirth?: string;
    address?: string;
    id: string;
    airline: string;
    flightnumber: string;
    date: string;
  };
  representativeName?: string;
  companyAddress?: string;
}

const AssignmentAgreement: React.FC<AssignmentAgreementProps> = ({
  isOpen,
  onClose,
  claimData,
  representativeName = "Sigitas Kačiušis",
  companyAddress = "Dariaus ir Girėno St. 21A, Vilnius, the Republic of Lithuania"
}) => {
  const today = format(new Date(), "yyyy-MM-dd");
  
  // Function to handle printing
  const handlePrint = () => {
    const printContent = document.getElementById("assignment-agreement");
    const windowUrl = 'about:blank';
    const uniqueName = new Date().getTime();
    const windowName = `Print_${uniqueName}`;
    const printWindow = window.open(windowUrl, windowName, 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
    
    if (printWindow && printContent) {
      printWindow.document.write('<html><head><title>Assignment Agreement</title>');
      printWindow.document.write('<link rel="stylesheet" href="/src/index.css" type="text/css" />');
      printWindow.document.write(`
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; padding: 20px; }
          .container { max-width: 800px; margin: 0 auto; padding: 20px; }
          .header { text-align: center; margin-bottom: 30px; }
          .logo { max-width: 80px; margin-bottom: 10px; }
          h1 { font-size: 18px; font-weight: bold; margin: 5px 0; color: #4CAF50; }
          .date { font-size: 14px; margin-top: 5px; }
          .client-info { text-align: center; margin-bottom: 30px; }
          .client-name { font-weight: bold; }
          .client-details { font-size: 14px; color: #555; }
          .client-caption { font-size: 12px; color: #777; font-style: italic; margin-top: 5px; }
          .divider { border-top: 1px solid #eee; margin: 20px 0; }
          .claim-details { margin-bottom: 20px; }
          .claim-table { width: 100%; margin-bottom: 20px; }
          .claim-table td { padding: 5px 0; }
          .claim-table td:first-child { width: 120px; }
          .legal-text { margin-bottom: 20px; text-align: justify; font-size: 14px; }
          .signature-section { display: flex; justify-content: space-between; margin-top: 50px; }
          .signature-box { width: 45%; }
          .signature-line { border-top: 1px solid #ccc; margin: 30px 0 5px 0; }
          .signature-label { font-size: 12px; color: #777; }
          .bullet-list { padding-left: 20px; }
          .bullet-item { margin-bottom: 10px; }
          .company-logo { display: flex; justify-content: center; align-items: center; }
          .company-logo-icon { width: 40px; height: 40px; background-color: #4CAF50; border-radius: 50%; display: flex; justify-content: center; align-items: center; color: white; font-weight: bold; font-size: 20px; }
        </style>
      `);
      printWindow.document.write('</head><body>');
      printWindow.document.write(printContent.innerHTML);
      printWindow.document.write('</body></html>');
      
      printWindow.document.close();
      printWindow.focus();
      
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 250);
    }
  };
  
  // Function to handle download as PDF
  const handleDownload = () => {
    console.log("Download functionality to be implemented with proper PDF generation library");
    alert("PDF download functionality will be implemented with a proper PDF generation library");
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">Assignment Agreement</DialogTitle>
        </DialogHeader>
        
        <div className="mt-4 flex justify-end space-x-2">
          <Button variant="outline" onClick={handlePrint} className="flex items-center">
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
          <Button variant="outline" onClick={handleDownload} className="flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
        
        <div id="assignment-agreement" className="p-6 bg-white rounded-lg">
          <div className="container">
            <div className="header">
              <div className="company-logo mb-3">
                <div className="company-logo-icon">S</div>
              </div>
              <h1>ASSIGNMENT FORM</h1>
              <div className="date">{today}</div>
            </div>
            
            <div className="client-info">
              <div className="client-name">{claimData.customer}</div>
              <div className="client-details">{claimData.dateOfBirth || ""}</div>
              <div className="client-details">{claimData.address || ""}</div>
              <div className="client-caption">First name and last name, date of birth, address ("Client")</div>
            </div>
            
            <div className="divider"></div>
            
            <div className="claim-details">
              <p><strong>Assignment details:</strong></p>
              
              <p><strong>Claim ID:</strong> {claimData.id}</p>
              
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
            
            <div className="legal-text">
              <p>
                In accordance with the Privacy Policy and General Terms & Conditions provided in UAB Skycop.com, legal entity code 304423851, registered address at {companyAddress} ("SkyHelp"), webpage www.skyhelp.md, which were confirmed by the Client after he/she got acquainted with them, by this assignment form ("Assignment Form") the Client assigns to SkyHelp and SkyHelp accepts from the Client full ownership and legal title to monetary claim pursuant to Regulation (EC) No 261/2004 of the European Parliament and of the Council of 11 February 2004 or under any other international or national regulation applicable in respect of the Client in another country establishing common rules on compensation and assistance to passengers in the event of denied boarding and of cancellation or long delay of flights, including all the amounts in relation to the above specified flight as well as taxes and other amounts, when passengers are not able to fly or their flight was disrupted and, any other monetary compensation for lost or damaged baggage ("Assignment").
              </p>
              
              <p>
                The Client understands that by concluding this Assignment Form he cannot engage into any direct contact or receive payment from the flight operating carrier.
              </p>
              
              <p>
                If this Assignment Form cannot be considered valid in the particular country (jurisdiction) or when the parties agree on the provision of services by a separate agreement, this agreement shall be considered as a contract for services according to which SkyHelp administers Client's Assignment and undertakes to organize and finance the collection of the Assignment and to carry out all actions related thereto including but not limited to:
              </p>
              
              <ul className="bullet-list">
                <li className="bullet-item">
                  Instituting proceedings in the Client's name;
                </li>
                <li className="bullet-item">
                  Organizing and financing legal representation of the Client before all third parties and institutions in relation to the Assignment, conducting communication with the flight operating carrier on all issues regarding the Assignment and carrying out all other related actions;
                </li>
                <li className="bullet-item">
                  Collecting and receiving payments in relation to the Assignment on the Client's behalf and settling with the Client in accordance with the agreed terms and conditions provided in SkyHelp's webpage www.skyhelp.md.
                </li>
              </ul>
              
              <p>
                This agreement is terminated immediately if within 14 days since the conclusion of the agreement, the Client submits a withdrawal notice by email support@skyhelp.md. The right to terminate the agreement on this ground ends prematurely if the agreement is fully performed until the expiration of the above-mentioned time limit.
              </p>
              
              <p>
                The Client confirms that he is aware that SkyHelp will commence respective works with the Assignment right after the conclusion of the agreement and that may impact termination of the agreement.
              </p>
              
              <p>
                Privacy Policy and General Terms & Conditions provided in SkyHelp's webpage www.skyhelp.md apply when signing this Assignment Form.
              </p>
            </div>
            
            <div className="signature-section">
              <div className="signature-box">
                <p><strong>Client</strong></p>
                <p>{claimData.customer}</p>
                <div className="signature-line"></div>
                <div className="signature-label">Signature</div>
              </div>
              
              <div className="signature-box">
                <p><strong>Head of Operations Department of SkyHelp</strong></p>
                <p>{representativeName}</p>
                <div className="signature-line"></div>
                <div className="signature-label">Signature</div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AssignmentAgreement;
