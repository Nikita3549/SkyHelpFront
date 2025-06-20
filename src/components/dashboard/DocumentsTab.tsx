import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Upload, Check } from 'lucide-react';

interface Document {
  name: string;
  status: string;
}

interface DocumentsTabProps {
  documents: Document[];
  onUploadDocument: () => void;
}

const DocumentsTab = ({ documents, onUploadDocument }: DocumentsTabProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-500 mb-4">Documents</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {documents.map((doc, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="font-medium">{doc.name}</p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {doc.status === 'uploaded' ? 'Uploaded' : 'Required'}
                      </p>
                    </div>
                  </div>

                  {doc.status === 'uploaded' ? (
                    <Badge
                      variant="outline"
                      className="text-green-600 bg-green-50 border-green-200"
                    >
                      <Check className="h-3 w-3 mr-1" />
                      Uploaded
                    </Badge>
                  ) : (
                    <Button
                      onClick={onUploadDocument}
                      size="sm"
                      variant="outline"
                    >
                      <Upload className="h-3 w-3 mr-1" />
                      Upload
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <Button
        onClick={onUploadDocument}
        size="sm"
        className="w-full"
        variant="outline"
      >
        <Upload className="h-3 w-full mr-1" />
        Upload
      </Button>

      <div>
        <h3 className="text-sm font-medium text-gray-500 mb-4">
          Document Guidelines
        </h3>
        <Card>
          <CardContent className="p-4 text-sm">
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <Check className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                <span>Please upload documents in PDF, JPG, or PNG format</span>
              </li>
              <li className="flex items-start">
                <Check className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                <span>Maximum file size is 10MB per document</span>
              </li>
              <li className="flex items-start">
                <Check className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                <span>Ensure all documents are clearly legible</span>
              </li>
              <li className="flex items-start">
                <Check className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                <span>
                  ID documents must match the passenger name in the claim
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DocumentsTab;
