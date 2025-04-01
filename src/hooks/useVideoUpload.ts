
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "@/components/ui/use-toast";

export const useVideoUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const uploadVideo = async (file: File) => {
    if (!file) return null;
    
    // Basic validation - only allow video files
    if (!file.type.startsWith('video/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload a video file.",
        variant: "destructive"
      });
      return null;
    }
    
    setIsUploading(true);
    setUploadProgress(0);
    
    try {
      // Set up a timer to simulate progress since onUploadProgress isn't available
      const progressTimer = setInterval(() => {
        setUploadProgress(prev => {
          // Only increment if not at 90% yet (we'll set to 100% after success)
          if (prev < 90) {
            return prev + 10;
          }
          return prev;
        });
      }, 500);
      
      // Upload the file
      const fileName = `company-video-${Date.now()}.${file.name.split('.').pop()}`;
      
      const { error } = await supabase
        .storage
        .from('videos')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: true
        });
        
      // Clear the timer now that upload is complete
      clearInterval(progressTimer);
      
      if (error) {
        throw error;
      }
      
      // Set progress to 100% on success
      setUploadProgress(100);
      
      // Get the public URL
      const { data: publicUrlData } = supabase
        .storage
        .from('videos')
        .getPublicUrl(fileName);
        
      toast({
        title: "Video uploaded successfully",
        description: "Your video has been uploaded and is now displayed on the page.",
      });
      
      return publicUrlData.publicUrl;
    } catch (error) {
      console.error('Error uploading video:', error);
      toast({
        title: "Upload failed",
        description: "There was an error uploading your video. Please try again.",
        variant: "destructive"
      });
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  return {
    isUploading,
    uploadProgress,
    uploadVideo
  };
};
