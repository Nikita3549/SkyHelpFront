import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Printer, Download, Loader2 } from 'lucide-react';
import { handlePrint, handleDownload } from './documentUtils';
import { toast } from '@/components/ui/use-toast';

const DocumentActions: React.FC = () => {
  const [isPrinting, setIsPrinting] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const onPrint = async () => {
    setIsPrinting(true);
    try {
      await handlePrint();
      toast({
        title: 'Print dialog opened',
        description: 'The document has been sent to your printer.',
      });
    } catch (error) {
      console.error('Error printing document:', error);
      toast({
        title: 'Print error',
        description:
          'There was an error opening the print dialog. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsPrinting(false);
    }
  };

  const onDownload = async () => {
    setIsDownloading(true);
    try {
      await handleDownload();
      toast({
        title: 'PDF generated',
        description: 'Your PDF has been generated and downloaded.',
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: 'Download error',
        description: 'There was an error generating the PDF. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="mt-4 flex justify-end px-6 space-x-2">
      <Button
        variant="outline"
        onClick={onPrint}
        className="flex items-center"
        disabled={isPrinting}
      >
        {isPrinting ? (
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
        ) : (
          <Printer className="h-4 w-4 mr-2" />
        )}
        Print
      </Button>
      <Button
        variant="outline"
        onClick={onDownload}
        className="flex items-center"
        disabled={isDownloading}
      >
        {isDownloading ? (
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
        ) : (
          <Download className="h-4 w-4 mr-2" />
        )}
        Download PDF
      </Button>
    </div>
  );
};

export default DocumentActions;
