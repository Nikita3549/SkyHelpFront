import React from 'react';
import { Upload } from 'lucide-react';

interface FilePreviewProps {
  file: File;
}

const FilePreview = ({ file }: FilePreviewProps) => {
  if (!file) return null;

  return (
    <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-between">
      <div className="flex items-center">
        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
          <Upload className="h-5 w-5 text-primary" />
        </div>
        <div>
          <p className="font-medium text-gray-800 text-sm">{file.name}</p>
          <p className="text-xs text-gray-500">
            {(file.size / (1024 * 1024)).toFixed(2)} MB
          </p>
        </div>
      </div>
    </div>
  );
};

export default FilePreview;
