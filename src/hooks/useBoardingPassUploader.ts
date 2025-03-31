
import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";

export const useBoardingPassUploader = () => {
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
    // Include the origin for absolute URL and add checkType parameter
    const origin = window.location.origin;
    
    // Create a URL that ensures we're directed to the claim page with boardingPass parameter
    const qrUrl = `${origin}/claim?checkType=boardingPass`;
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

  return {
    file,
    setFile,
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
  };
};
