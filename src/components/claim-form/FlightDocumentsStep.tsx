import React, { useState } from 'react';
import { motion } from 'framer-motion';
import NavigationButtons from '@/components/claim-form/passenger-details/NavigationButtons';
import { AnimationTransitions } from '@/components/claim-form/types';
import FileDropZone from './flight-documents/FileDropZone';
import UploadedFilesList from './flight-documents/UploadedFilesList';
import DocumentInfoSection from './flight-documents/DocumentInfoSection';
import HeaderSection from './flight-documents/HeaderSection';
import { IClaimForm } from '@/components/claim-form/interfaces/claim-form.interface.ts';
import { Button } from '@/components/ui/button.tsx';
import { ArrowRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile.tsx';
import api from '@/api/axios.ts';
import { useClaimJwt } from '@/hooks/useClaimJwt.ts';
import { toast } from '@/components/ui/use-toast.ts';

interface FlightDocumentsStepProps {
  onBack: () => void;
  transitions: AnimationTransitions;
  newForm: IClaimForm;
  setNewForm: (value: IClaimForm) => void;
  setStep: (step: number) => void;
}

const FlightDocumentsStep: React.FC<FlightDocumentsStepProps> = ({
  onBack,
  transitions,
  newForm,
  setNewForm,
  setStep,
}) => {
  const isMobile = useIsMobile();
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { getClaimJwt } = useClaimJwt();
  const jwt = getClaimJwt();

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles((prev) => [...prev, ...droppedFiles]);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...selectedFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    console.log('start');
    if (files.length === 0) {
      setStep(5);
      return;
    }

    const formData = new FormData();

    files.forEach((file) => {
      formData.append('documents', file);
    });

    try {
      setIsSubmitting(true);

      const response = await api.post(
        `/claims/${newForm.id}/documents?jwt=${jwt}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      if (response.status == 201) {
        console.log('success');
        setStep(5);
      } else {
        console.error('Upload failed');
        toast({
          title: 'Upload failed',
          description: 'Try again',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Upload failed',
        description: 'Try again',
        variant: 'destructive',
      });
      console.error('Error uploading files:', error);
    } finally {
      setIsSubmitting(false);
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
      <HeaderSection />

      <FileDropZone
        isDragging={isDragging}
        handleDragOver={handleDragOver}
        handleDragLeave={handleDragLeave}
        handleDrop={handleDrop}
        handleFileInputChange={handleFileInputChange}
      />

      <UploadedFilesList documents={files} removeFile={removeFile} />

      <DocumentInfoSection isOpen={false} setIsOpen={() => {}} />

      <div className="flex justify-end">
        <Button
          type="submit"
          className={isMobile ? 'w-full' : ''}
          disabled={isSubmitting}
          onClick={handleSubmit}
        >
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
};

export default FlightDocumentsStep;
