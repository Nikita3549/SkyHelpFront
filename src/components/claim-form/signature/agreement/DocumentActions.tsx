
import React from 'react';
import { Button } from "@/components/ui/button";
import { Printer, Download } from "lucide-react";
import { handlePrint, handleDownload } from './documentUtils';

const DocumentActions: React.FC = () => {
  return (
    <div className="mt-4 flex justify-end px-6 space-x-2">
      <Button variant="outline" onClick={handlePrint} className="flex items-center">
        <Printer className="h-4 w-4 mr-2" />
        Print
      </Button>
      <Button variant="outline" onClick={handleDownload} className="flex items-center">
        <Download className="h-4 w-4 mr-2" />
        Download
      </Button>
    </div>
  );
};

export default DocumentActions;
