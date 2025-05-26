
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
  return format(new Date(), "dd/MM/yyyy");
};

export const handlePrint = () => {
  return new Promise<void>((resolve, reject) => {
    try {
      const printContent = document.getElementById("assignment-agreement");
      if (!printContent) {
        reject(new Error("Assignment agreement element not found"));
        return;
      }
      
      const windowUrl = 'about:blank';
      const uniqueName = new Date().getTime();
      const windowName = `Print_${uniqueName}`;
      const printWindow = window.open(windowUrl, windowName, 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
      
      if (!printWindow) {
        reject(new Error("Could not open print window"));
        return;
      }
      
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Assignment Agreement - SkyHelp</title>
          <meta charset="UTF-8">
          <style>
            @page {
              size: A4;
              margin: 2cm;
            }
            
            body { 
              font-family: 'Times New Roman', serif; 
              line-height: 1.5; 
              color: #000000; 
              padding: 0;
              margin: 0;
              background-color: white;
              font-size: 12px;
            }
            
            .document-container {
              max-width: 100%;
              background: white;
              color: #000000;
            }
            
            .header { 
              text-align: center; 
              margin-bottom: 40px; 
            }
            
            .document-title { 
              font-size: 24px; 
              font-weight: 700; 
              margin: 20px 0 10px; 
              color: #000000;
              text-transform: uppercase;
              letter-spacing: 2px;
            }
            
            .date { 
              font-size: 14px; 
              margin-top: 10px; 
              color: #000000; 
              font-weight: 500;
            }
            
            .client-info { 
              text-align: center; 
              margin-bottom: 40px; 
              padding: 20px;
              border: 2px solid #000000;
            }
            
            .client-name { 
              font-weight: bold; 
              font-size: 16px; 
              color: #000000;
              margin-bottom: 5px;
            }
            
            .client-details { 
              font-size: 14px; 
              color: #000000; 
              margin-bottom: 5px;
            }
            
            .client-caption { 
              font-size: 12px; 
              color: #000000; 
              font-style: italic; 
              margin-top: 10px; 
            }
            
            .section-title { 
              font-weight: bold; 
              margin: 25px 0 15px 0; 
              font-size: 14px;
              color: #000000;
              text-transform: uppercase;
              text-decoration: underline;
            }
            
            .claim-details { 
              margin-bottom: 30px; 
            }
            
            .claim-table { 
              width: 100%; 
              margin-bottom: 20px; 
              border-collapse: collapse; 
              border: 1px solid #000000;
            }
            
            .claim-table td { 
              padding: 12px;
              vertical-align: top; 
              line-height: 1.5;
              border: 1px solid #000000;
              color: #000000;
            }
            
            .claim-table td:first-child { 
              width: 150px;
              font-weight: 600;
              background-color: #f8f8f8;
            }
            
            .claim-id { 
              font-weight: 600; 
              margin-bottom: 15px; 
              font-size: 14px;
              color: #000000;
            }
            
            .legal-text { 
              margin-bottom: 20px; 
              text-align: justify; 
              font-size: 12px; 
              line-height: 1.6;
              color: #000000;
            }
            
            .legal-text p { 
              margin-bottom: 15px; 
            }
            
            .numbered-list {
              padding-left: 25px;
              margin: 15px 0;
              list-style-type: decimal;
            }
            
            .numbered-item {
              margin-bottom: 12px;
              line-height: 1.6;
              padding-left: 5px;
              color: #000000;
            }
            
            .signature-section { 
              display: flex; 
              justify-content: space-between; 
              margin-top: 80px; 
              page-break-inside: avoid;
            }
            
            .signature-box { 
              width: 45%; 
            }
            
            .signature-title { 
              font-weight: bold; 
              margin-bottom: 10px; 
              color: #000000;
              font-size: 12px;
            }
            
            .signature-name { 
              margin-bottom: 30px; 
              color: #000000;
              font-weight: 500;
            }
            
            .signature-line { 
              border-top: 2px solid #000000; 
              margin: 40px 0 10px 0; 
              width: 100%;
            }
            
            .signature-label { 
              font-size: 10px; 
              color: #000000; 
              text-align: center;
              font-weight: 500;
            }
            
            .logo-wrapper {
              display: flex;
              justify-content: center;
              margin-bottom: 15px;
            }
            
            .logo {
              width: 100px;
              height: auto;
            }
          </style>
        </head>
        <body>
      `);
      printWindow.document.write(printContent.innerHTML);
      printWindow.document.write('</body></html>');
      
      printWindow.document.close();
      printWindow.focus();
      
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
        resolve();
      }, 500);
    } catch (error) {
      reject(error);
    }
  });
};

export const handleDownload = () => {
  return new Promise<void>((resolve, reject) => {
    const element = document.getElementById("assignment-agreement");
    
    if (!element) {
      reject(new Error("Assignment agreement element not found"));
      return;
    }

    // Clone element to avoid modifying the visible document
    const clonedElement = element.cloneNode(true) as HTMLElement;
    
    // Apply print-specific styling
    clonedElement.style.fontFamily = '"Times New Roman", serif';
    clonedElement.style.color = '#000000';
    clonedElement.style.backgroundColor = '#ffffff';
    
    // Set up html2pdf options for PDF/A compliance
    const opt = {
      margin: [15, 15, 15, 15],
      filename: `assignment_agreement_${new Date().getTime()}.pdf`,
      image: { 
        type: 'jpeg', 
        quality: 1.0 
      },
      html2canvas: { 
        scale: 2,
        useCORS: true,
        logging: false,
        letterRendering: true,
        allowTaint: false,
        backgroundColor: '#ffffff',
        removeContainer: true
      },
      jsPDF: { 
        unit: 'mm', 
        format: 'a4', 
        orientation: 'portrait',
        compress: true,
        precision: 2
      },
      pagebreak: { 
        mode: ['avoid-all', 'css', 'legacy'],
        before: '.signature-section',
        after: '.legal-text'
      }
    };
    
    // Generate PDF with enhanced settings for compliance
    html2pdf()
      .from(clonedElement)
      .set(opt)
      .toPdf()
      .get('pdf')
      .then((pdf: any) => {
        // Add metadata for PDF/A compliance
        pdf.setProperties({
          title: 'Assignment Agreement - SkyHelp',
          subject: 'Flight Compensation Assignment Agreement',
          author: 'SkyHelp',
          creator: 'SkyHelp Platform',
          producer: 'SkyHelp Document Generator'
        });
        return pdf;
      })
      .save()
      .then(() => {
        resolve();
      })
      .catch((err: Error) => {
        console.error('Error generating PDF:', err);
        reject(err);
      });
  });
};
