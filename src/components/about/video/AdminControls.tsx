
import React from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useVideoUpload } from "@/hooks/useVideoUpload";

interface AdminControlsProps {
  setVideoUrl: (url: string) => void;
  isAdmin: boolean;
}

const AdminControls: React.FC<AdminControlsProps> = ({ setVideoUrl, isAdmin }) => {
  const { isUploading, uploadProgress, uploadVideo } = useVideoUpload();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    const newVideoUrl = await uploadVideo(file);
    if (newVideoUrl) {
      setVideoUrl(newVideoUrl);
    }
  };

  if (!isAdmin) return null;

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
            onChange={handleFileUpload}
            disabled={isUploading}
          />
        </label>
      </div>
    </div>
  );
};

export default AdminControls;
