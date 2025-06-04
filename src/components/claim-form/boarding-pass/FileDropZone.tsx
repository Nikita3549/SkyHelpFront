import React, { useRef } from 'react';
import { Upload, Camera, QrCode } from 'lucide-react';

interface FileDropZoneProps {
  isDragging: boolean;
  handleDragEnter: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  handleFileInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBrowseClick: () => void;
  handleCameraClick: () => void;
  isMobile: boolean;
  fileInputRef: React.RefObject<HTMLInputElement>;
  cameraInputRef: React.RefObject<HTMLInputElement>;
}

const FileDropZone = ({
  isDragging,
  handleDragEnter,
  handleDragLeave,
  handleDragOver,
  handleDrop,
  handleFileInputChange,
  handleBrowseClick,
  handleCameraClick,
  isMobile,
  fileInputRef,
  cameraInputRef,
}: FileDropZoneProps) => {
  return (
    <div
      className={`border-2 border-dashed rounded-lg p-8 text-center ${
        isDragging ? 'border-primary bg-primary/5' : 'border-gray-300'
      } transition-colors duration-200`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept=".png,.jpg,.jpeg,.pdf"
        onChange={handleFileInputChange}
      />

      <input
        type="file"
        ref={cameraInputRef}
        className="hidden"
        accept="image/*"
        capture="environment"
        onChange={handleFileInputChange}
      />

      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
          <Upload className="h-8 w-8 text-primary" />
        </div>

        <div className="space-y-2">
          <p className="text-lg font-medium">
            Drag & drop documents or{' '}
            <span
              className="text-primary cursor-pointer"
              onClick={handleBrowseClick}
            >
              select
            </span>{' '}
            file to upload
          </p>
          <p className="text-sm text-gray-500">
            We support PNG, JPG and PDF. Max size 15MB.
          </p>
        </div>
      </div>

      {/* Camera function highlighted section - fixed for mobile */}
      <div className="mt-8 flex justify-center">
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 to-primary rounded-xl blur opacity-60 group-hover:opacity-100 transition duration-300"></div>
          <button
            onClick={handleCameraClick}
            className="relative flex items-center gap-3 bg-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 w-full sm:w-auto"
          >
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              {isMobile ? (
                <Camera
                  className="h-5 w-5 text-primary"
                  style={{ minWidth: '20px' }}
                />
              ) : (
                <QrCode
                  className="h-5 w-5 text-primary"
                  style={{ minWidth: '20px' }}
                />
              )}
            </div>
            <div className="text-left">
              <p className="font-semibold text-gray-800">
                {isMobile ? 'Use your camera' : 'Scan with your phone'}
              </p>
              <p className="text-xs text-gray-500">
                {isMobile
                  ? 'Our AI will read the data automatically'
                  : 'Use your mobile device to take a photo'}
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileDropZone;
