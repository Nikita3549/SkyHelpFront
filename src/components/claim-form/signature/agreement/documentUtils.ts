
import { format } from "date-fns";
import html2pdf from 'html2pdf.js';

export interface ClaimData {
  customer: string;
  dateOfBirth?: string;
  address?: string;
  id: string;
  airline: string;
  flightnumber: string;
  date: string;
}

export interface AgreementProps {
  claimData: ClaimData;
  representativeName?: string;
  companyAddress?: string;
}

export const getFormattedDate = () => {
  return format(new Date(), "yyyy-MM-dd");
};

export const handlePrint = () => {
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
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        body { 
          font-family: 'Inter', sans-serif; 
          line-height: 1.6; 
          color: #333; 
          padding: 20px; 
          max-width: 800px;
          margin: 0 auto;
          background-color: white;
        }
        .document-container {
          max-width: 21cm;
          min-height: 29.7cm;
          padding: 2cm;
          margin: 0 auto;
          background: white;
          box-shadow: none;
        }
        .header { text-align: center; margin-bottom: 30px; }
        .document-title { 
          font-size: 24px; 
          font-weight: 700; 
          margin: 15px 0 5px; 
          color: #333;
          text-transform: uppercase;
        }
        .date { font-size: 14px; margin-top: 5px; color: #555; }
        .client-info { 
          text-align: center; 
          margin-bottom: 30px; 
          padding: 15px;
          border-top: 1px solid #eee;
          border-bottom: 1px solid #eee;
        }
        .client-name { font-weight: bold; font-size: 16px; }
        .client-details { font-size: 14px; color: #555; }
        .client-caption { 
          font-size: 12px; 
          color: #777; 
          font-style: italic; 
          margin-top: 8px; 
        }
        .section-title { font-weight: bold; margin-bottom: 10px; }
        .claim-details { margin-bottom: 20px; }
        .claim-table { 
          width: 100%; 
          margin-bottom: 20px; 
          border-collapse: collapse; 
        }
        .claim-table td { 
          padding: 5px 0;
          vertical-align: top; 
        }
        .claim-table td:first-child { 
          width: 120px;
          font-weight: 600;
        }
        .claim-id { font-weight: 600; margin-bottom: 10px; }
        .legal-text { 
          margin-bottom: 20px; 
          text-align: justify; 
          font-size: 14px; 
        }
        .legal-text p { margin-bottom: 15px; }
        .bullet-list { padding-left: 20px; margin: 15px 0; }
        .bullet-item { margin-bottom: 10px; }
        .signature-section { 
          display: flex; 
          justify-content: space-between; 
          margin-top: 60px; 
        }
        .signature-box { width: 45%; }
        .signature-title { font-weight: bold; margin-bottom: 5px; }
        .signature-name { margin-bottom: 20px; }
        .signature-line { 
          border-top: 1px solid #333; 
          margin: 30px 0 5px 0; 
          width: 100%;
        }
        .signature-label { font-size: 12px; color: #777; }
        .logo-wrapper {
          display: flex;
          justify-content: center;
          margin-bottom: 10px;
        }
        .logo {
          width: 100px;
          height: auto;
        }
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

export const handleDownload = () => {
  const element = document.getElementById("assignment-agreement");
  
  if (!element) {
    console.error("Assignment agreement element not found");
    return;
  }

  // Clone element to avoid modifying the visible document
  const clonedElement = element.cloneNode(true) as HTMLElement;
  
  // Create a temporary container with A4 size constraints
  const container = document.createElement('div');
  container.appendChild(clonedElement);
  
  // Set up html2pdf options
  const opt = {
    margin: [10, 10],
    filename: 'assignment_agreement.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { 
      scale: 2,
      useCORS: true,
      logging: false
    },
    jsPDF: { 
      unit: 'mm', 
      format: 'a4', 
      orientation: 'portrait' 
    }
  };
  
  // Generate PDF
  html2pdf()
    .from(clonedElement)
    .set(opt)
    .save()
    .catch((err: Error) => {
      console.error('Error generating PDF:', err);
      alert('There was an error generating the PDF. Please try again.');
    })
    .finally(() => {
      // Clean up
      container.removeChild(clonedElement);
    });
};
