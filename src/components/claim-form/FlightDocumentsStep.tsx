
import React, { useCallback, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { motion } from "framer-motion";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { flightDocumentsSchema } from "@/components/claim-form/schemas";
import NavigationButtons from "@/components/claim-form/passenger-details/NavigationButtons";
import { FileText, Upload } from "lucide-react";
import { toast } from "sonner";
import { AnimationTransitions } from "@/components/claim-form/types";

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
  const [isDragging, setIsDragging] = useState(false);
  const allowedFileTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "image/jpeg", "image/jpg"];
  const maxFileSize = 5 * 1024 * 1024; // 5MB
  
  const documents = form.watch("documents") || [];
  const isValid = documents.length > 0;
  
  const handleSubmit = form.handleSubmit(onSubmit);

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

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const files = Array.from(e.target.files);
    const validFiles = files.filter(validateFile);
    if (validFiles.length === 0) return;
    
    const currentFiles = form.getValues("documents") || [];
    form.setValue("documents", [...currentFiles, ...validFiles], { shouldValidate: true });
    
    // Reset the input so the same file can be selected again if needed
    e.target.value = '';
  };

  const removeFile = (index: number) => {
    const currentFiles = [...form.getValues("documents")];
    currentFiles.splice(index, 1);
    form.setValue("documents", currentFiles, { shouldValidate: true });
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
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
          Add flight documents
        </h2>
        <p className="text-lg text-gray-700 mb-6">
          To submit a claim, we need just a few documents:
        </p>
        
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-green-50 p-4 rounded-full">
            <FileText className="w-8 h-8 text-green-600" />
          </div>
          <p className="text-gray-700">
            Booking confirmation email, boarding pass, or any other document confirming your ticket reservation.
          </p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormField
            control={form.control}
            name="documents"
            render={({ field }) => (
              <FormItem>
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
                  <p className="text-gray-500 text-sm text-center">Or browse to choose a file (pdf, doc, jpeg) up to 5 MB</p>
                  <input
                    id="file-upload"
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.jpeg,.jpg"
                    className="hidden"
                    onChange={handleFileInputChange}
                  />
                </div>
                {documents.length > 0 && (
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
                )}
                <FormMessage />
              </FormItem>
            )}
          />

          <NavigationButtons 
            onBack={onBack}
            continueText="Continue"
            isSubmitting={form.formState.isSubmitting}
            isDisabled={!isValid}
          />
        </form>
      </Form>
    </motion.div>
  );
};

export default FlightDocumentsStep;
