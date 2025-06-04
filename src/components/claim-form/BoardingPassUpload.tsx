import React from 'react';
import { motion } from 'framer-motion';
import { AnimationTransitions } from './types';
import QRCodeDialog from './boarding-pass/QRCodeDialog';
import FileDropZone from './boarding-pass/FileDropZone';
import FilePreview from './boarding-pass/FilePreview';
import HeaderSection from './boarding-pass/HeaderSection';
import SubmitButton from './boarding-pass/SubmitButton';
import { useBoardingPassUploader } from '@/hooks/useBoardingPassUploader';

interface BoardingPassUploadProps {
  onContinue: (file: File) => void;
  transitions: AnimationTransitions;
}

const BoardingPassUpload = ({
  onContinue,
  transitions,
}: BoardingPassUploadProps) => {
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
    handleCameraClick,
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
        <HeaderSection />

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

      <SubmitButton isDisabled={!file} onSubmit={handleSubmit} />

      <QRCodeDialog
        open={showQrCode}
        onOpenChange={setShowQrCode}
        qrCodeUrl={qrCodeUrl}
      />
    </motion.div>
  );
};

export default BoardingPassUpload;
