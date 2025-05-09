
import { useState, useCallback } from 'react';
import { toast } from "sonner";

export interface UseFileUploadProps {
  form: any;
  allowedFileTypes?: string[];
  maxFileSize?: number;
}

export const useFileUpload = ({
  form,
  allowedFileTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "image/jpeg", "image/jpg"],
  maxFileSize = 5 * 1024 * 1024 // 5MB
}: UseFileUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  
  const validateFile = (file: File): boolean => {
    if (!allowedFileTypes.includes(file.type)) {
      toast.error(`Invalid file type: ${file.name}. Only PDF, DOC, and JPEG files are allowed.`);
      return false;
    }
    
    if (file.size > maxFileSize) {
      toast.error(`File too large: ${file.name}. Maximum size is 5MB.`);
      return false;
    }
    
    return true;
  };

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length === 0) return;
    
    const validFiles = files.filter(validateFile);
    if (validFiles.length === 0) return;
    
    const currentFiles = form.getValues("documents") || [];
    form.setValue("documents", [...currentFiles, ...validFiles], { shouldValidate: true });
  }, [form]);

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const files = Array.from(e.target.files);
    const validFiles = files.filter(validateFile);
    if (validFiles.length === 0) return;
    
    const currentFiles = form.getValues("documents") || [];
    form.setValue("documents", [...currentFiles, ...validFiles], { shouldValidate: true });
    
    // Reset the input so the same file can be selected again if needed
    e.target.value = '';
  }, [form]);

  const removeFile = useCallback((index: number) => {
    const currentFiles = [...form.getValues("documents")];
    currentFiles.splice(index, 1);
    form.setValue("documents", currentFiles, { shouldValidate: true });
  }, [form]);

  return {
    isDragging,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileInputChange,
    removeFile,
    validateFile
  };
};
