import React from 'react';
import { Upload } from 'lucide-react';

interface FileDropZoneProps {
  isDragging: boolean;
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  handleFileInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileDropZone: React.FC<FileDropZoneProps> = ({
  isDragging,
  handleDragOver,
  handleDragLeave,
  handleDrop,
  handleFileInputChange,
}) => {
  return (
    <div
      className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer transition-colors 
        ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => document.getElementById('file-upload')?.click()}
      style={{ minHeight: '200px' }}
    >
      <Upload className="h-10 w-10 text-gray-400 mb-4" />
      <p className="text-gray-600 text-center mb-2">Drag and drop to upload</p>
      <p className="text-gray-500 text-sm text-center">
        Or browse to choose a file (pdf, doc, jpeg) up to 5 MB
      </p>
      <input
        id="file-upload"
        type="file"
        multiple
        accept=".pdf,.doc,.docx,.jpeg,.jpg"
        className="hidden"
        onChange={handleFileInputChange}
      />
    </div>
  );
};

export default FileDropZone;
