
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Upload, ArrowRight, Camera, QrCode, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimationTransitions } from "./types";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";

interface BoardingPassUploadProps {
  onContinue: (file: File) => void;
  transitions: AnimationTransitions;
}

const BoardingPassUpload = ({ onContinue, transitions }: BoardingPassUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showQrCode, setShowQrCode] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const isMobile = useIsMobile();

  // Generate the QR code URL when the component mounts
  useEffect(() => {
    // Create a URL that points to the boarding pass upload step
    const currentUrl = window.location.href;
    const baseUrl = currentUrl.split("?")[0]; // Remove any existing query params
    const qrUrl = `${baseUrl}?checkType=boardingPass`;
    setQrCodeUrl(qrUrl);
  }, []);

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleFileSelect = (selectedFile: File) => {
    // Check file type
    const validTypes = ['image/png', 'image/jpeg', 'application/pdf'];
    if (!validTypes.includes(selectedFile.type)) {
      toast.error('Please upload a PNG, JPG or PDF file');
      return;
    }

    // Check file size (15MB max)
    if (selectedFile.size > 15 * 1024 * 1024) {
      toast.error('File size must be less than 15MB');
      return;
    }

    setFile(selectedFile);
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleCameraClick = () => {
    if (isMobile) {
      // On mobile, open the camera directly
      cameraInputRef.current?.click();
    } else {
      // On desktop, show the QR code dialog
      setShowQrCode(true);
    }
  };

  const handleSubmit = () => {
    if (file) {
      onContinue(file);
    }
  };

  return (
    <motion.div
      initial={transitions.initial}
      animate={transitions.animate}
      exit={transitions.exit}
      transition={transitions.transition}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Hi! Let's start with getting your boarding pass.
        </h2>
        <p className="text-gray-600 mb-6">
          Please upload your boarding pass as a PNG, JPG or PDF. Max size 15MB
        </p>
        
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
                Drag & drop documents or <span className="text-primary cursor-pointer" onClick={handleBrowseClick}>select</span> file to upload
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
                    <Camera className="h-5 w-5 text-primary" style={{ minWidth: '20px' }} />
                  ) : (
                    <QrCode className="h-5 w-5 text-primary" style={{ minWidth: '20px' }} />
                  )}
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-800">
                    {isMobile ? "Use your camera" : "Scan with your phone"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {isMobile 
                      ? "Our AI will read the data automatically" 
                      : "Use your mobile device to take a photo"
                    }
                  </p>
                </div>
              </button>
            </div>
          </div>
        </div>
        
        {file && (
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
        )}
      </div>

      <div className="flex justify-end">
        <Button
          type="button"
          disabled={!file}
          onClick={handleSubmit}
          className="flex items-center gap-2 px-6"
        >
          Send File <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      {/* QR Code Dialog */}
      <Dialog open={showQrCode} onOpenChange={setShowQrCode}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Scan QR Code with your phone</DialogTitle>
            <DialogDescription>
              Use your phone's camera to scan this QR code and continue the boarding pass upload on your mobile device.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center p-6">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrCodeUrl)}`}
                alt="QR Code for mobile upload"
                width="200"
                height="200"
                className="mx-auto"
              />
            </div>
            <p className="mt-4 text-center text-sm text-gray-500">
              This will open the boarding pass upload on your mobile device where you can take a photo directly.
            </p>
          </div>
          <div className="flex justify-end">
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default BoardingPassUpload;
