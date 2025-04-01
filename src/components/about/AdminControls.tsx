
import React from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

interface AdminControlsProps {
  isUploading: boolean;
  uploadProgress: number;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const AdminControls = ({ isUploading, uploadProgress, onFileChange }: AdminControlsProps) => {
  return (
    <div className="p-4 border-t border-gray-200">
      <h4 className="text-sm font-medium mb-2">Admin Controls</h4>
      <div className="flex items-center gap-4">
        <label 
          className="flex items-center gap-2 cursor-pointer"
          htmlFor="video-upload"
        >
          <Button 
            variant="outline" 
            size="sm" 
            type="button" 
            disabled={isUploading}
            className="flex items-center gap-2"
          >
            <Upload className="h-4 w-4" />
            {isUploading ? `Uploading ${uploadProgress}%` : 'Upload Company Video'}
          </Button>
          <input 
            id="video-upload" 
            type="file" 
            accept="video/*" 
            className="hidden" 
            onChange={onFileChange}
            disabled={isUploading}
          />
        </label>
      </div>
    </div>
  );
};

export default AdminControls;
