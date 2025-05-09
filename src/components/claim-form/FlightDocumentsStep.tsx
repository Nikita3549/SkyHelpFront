
import React, { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { motion } from "framer-motion";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { flightDocumentsSchema } from "@/components/claim-form/schemas";
import NavigationButtons from "@/components/claim-form/passenger-details/NavigationButtons";
import { AnimationTransitions } from "@/components/claim-form/types";
import FileDropZone from "./flight-documents/FileDropZone";
import UploadedFilesList from "./flight-documents/UploadedFilesList";
import DocumentInfoSection from "./flight-documents/DocumentInfoSection";
import HeaderSection from "./flight-documents/HeaderSection";
import { useFileUpload } from "./flight-documents/useFileUpload";

interface FlightDocumentsStepProps {
  form: UseFormReturn<z.infer<typeof flightDocumentsSchema>>;
  onSubmit: (data: z.infer<typeof flightDocumentsSchema>) => void;
  onBack: () => void;
  transitions: AnimationTransitions;
}

const FlightDocumentsStep: React.FC<FlightDocumentsStepProps> = ({
  form,
  onSubmit,
  onBack,
  transitions
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const {
    isDragging,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileInputChange,
    removeFile
  } = useFileUpload({ form });
  
  const documents = form.watch("documents") || [];
  const isValid = documents.length > 0;
  
  const handleSubmit = form.handleSubmit(onSubmit);

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
        
        <Form {...form}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormField
              control={form.control}
              name="documents"
              render={({ field }) => (
                <FormItem>
                  <FileDropZone
                    isDragging={isDragging}
                    handleDragOver={handleDragOver}
                    handleDragLeave={handleDragLeave}
                    handleDrop={handleDrop}
                    handleFileInputChange={handleFileInputChange}
                  />
                  <UploadedFilesList 
                    documents={documents}
                    removeFile={removeFile}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <DocumentInfoSection isOpen={isOpen} setIsOpen={setIsOpen} />

            <NavigationButtons 
              onBack={onBack}
              continueText="Continue"
              isSubmitting={form.formState.isSubmitting}
              isDisabled={!isValid}
            />
          </form>
        </Form>
      </div>
    </motion.div>
  );
};

export default FlightDocumentsStep;
