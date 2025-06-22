import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Upload, Check, DownloadIcon } from 'lucide-react';
import { Claim } from '@/lib/supabase.ts';
import api from '@/api/axios.ts';
import { toast } from '@/components/ui/use-toast.ts';

interface Document {
  id: string;
  name: string;
  status: string;
}

interface DocumentsTabProps {
  documents: Document[];
  claim: Claim;
}

const DocumentsTab = ({ documents, claim }: DocumentsTabProps) => {
  const uploadDocument = async () => {
    try {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.pdf,.jpg,.jpeg,.png';

      input.onchange = async () => {
        if (!input.files || input.files.length === 0) return;

        const formData = new FormData();
        Array.from(input.files).forEach((file) => {
          formData.append('documents', file);
        });

        const res = await api.post(
          `/claims/admin/${claim.id}/upload`,
          formData,
        );

        if (res.status != 201) {
          console.error('Upload failed');
          return;
        }

        toast({
          title: 'Success',
          description: 'Upload successful',
        });

        console.log('Upload successful:');
      };

      input.click();
    } catch (error) {
      console.error('Unexpected error:', error);
    }
  };
  const onDownloadDocument = async (id) => {
    const claimDocument = claim.documents.find((d) => d.id == id);
    if (!claimDocument) {
      console.error('Document not found in claim');
      return;
    }
    console.log(claimDocument);

    try {
      const res = await api.get(`/claims/documents/admin?documentId=${id}`, {
        responseType: 'blob',
      });

      const fileName = (claimDocument as any).name;

      const blob = new Blob([res.data]);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Failed to download', err);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {documents.map((doc, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="font-medium">
                        {doc.name.length > 20
                          ? doc.name.slice(0, 20) + '...'
                          : doc.name}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5"></p>
                    </div>
                  </div>

                  {doc.status === 'uploaded' ? (
                    <Button
                      onClick={() => {
                        onDownloadDocument(doc.id);
                      }}
                      size="sm"
                      className="w-32"
                      variant="outline"
                    >
                      <DownloadIcon className="h-3 w-full mr-1" />
                      Download
                    </Button>
                  ) : (
                    <Button
                      onClick={uploadDocument}
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
        onClick={uploadDocument}
        size="sm"
        className="w-full"
        variant="outline"
      >
        <Upload className="h-3 w-full mr-1" />
        Upload
      </Button>

      <div>
        {/*<h3 className="text-sm font-medium text-gray-500 mb-4">*/}
        {/*  Document Guidelines*/}
        {/*</h3>*/}
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
