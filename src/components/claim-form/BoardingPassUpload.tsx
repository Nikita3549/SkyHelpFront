
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimationTransitions } from "./types";
import QRCodeDialog from "./boarding-pass/QRCodeDialog";
import FileDropZone from "./boarding-pass/FileDropZone";
import FilePreview from "./boarding-pass/FilePreview";
import { useBoardingPassUploader } from "@/hooks/useBoardingPassUploader";

interface BoardingPassUploadProps {
  onContinue: (file: File) => void;
  transitions: AnimationTransitions;
}

const BoardingPassUpload = ({ onContinue, transitions }: BoardingPassUploadProps) => {
  const {
    file,
    isDragging,
    showQrCode,
    setShowQrCode,
    qrCodeUrl,
    fileInputRef,
    cameraInputRef,
    isMobile,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    handleFileInputChange,
    handleBrowseClick,
    handleCameraClick
  } = useBoardingPassUploader();

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
        
        <FileDropZone
          isDragging={isDragging}
          handleDragEnter={handleDragEnter}
          handleDragLeave={handleDragLeave}
          handleDragOver={handleDragOver}
          handleDrop={handleDrop}
          handleFileInputChange={handleFileInputChange}
          handleBrowseClick={handleBrowseClick}
          handleCameraClick={handleCameraClick}
          isMobile={isMobile}
          fileInputRef={fileInputRef}
          cameraInputRef={cameraInputRef}
        />
        
        {file && <FilePreview file={file} />}
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
      <QRCodeDialog 
        open={showQrCode} 
        onOpenChange={setShowQrCode} 
        qrCodeUrl={qrCodeUrl} 
      />
    </motion.div>
  );
};

export default BoardingPassUpload;
