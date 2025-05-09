
import React from "react";
import { FileText } from "lucide-react";

interface UploadedFilesListProps {
  documents: File[];
  removeFile: (index: number) => void;
}

const UploadedFilesList: React.FC<UploadedFilesListProps> = ({ documents, removeFile }) => {
  if (documents.length === 0) return null;
  
  return (
    <div className="mt-4">
      <p className="text-sm font-medium text-gray-700 mb-2">Uploaded files:</p>
      <div className="space-y-2">
        {documents.map((file: File, index: number) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 border border-gray-200 rounded-md">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-700 truncate max-w-xs">{file.name}</span>
              <span className="text-xs text-gray-500">
                ({(file.size / 1024 / 1024).toFixed(2)} MB)
              </span>
            </div>
            <button 
              type="button" 
              className="text-red-500 hover:text-red-700"
              onClick={() => removeFile(index)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadedFilesList;
