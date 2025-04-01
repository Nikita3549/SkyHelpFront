
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "@/components/ui/use-toast";

export const useVideoUpload = () => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Check if there's a stored video
  useEffect(() => {
    const checkForVideo = async () => {
      try {
        // List videos in the bucket
        const { data, error } = await supabase
          .storage
          .from('videos')
          .list('', { limit: 1 });
          
        if (error) {
          console.error('Error fetching videos:', error);
          return;
        }
        
        // If we found at least one video, get its URL
        if (data && data.length > 0) {
          const { data: publicUrlData } = supabase
            .storage
            .from('videos')
            .getPublicUrl(data[0].name);
            
          setVideoUrl(publicUrlData.publicUrl);
        }
      } catch (error) {
        console.error('Error checking for videos:', error);
      }
    };
    
    checkForVideo();
  }, []);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    // Basic validation - only allow video files
    if (!file.type.startsWith('video/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload a video file.",
        variant: "destructive"
      });
      return;
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
        
      setVideoUrl(publicUrlData.publicUrl);
      
      toast({
        title: "Video uploaded successfully",
        description: "Your video has been uploaded and is now displayed on the page.",
      });
    } catch (error) {
      console.error('Error uploading video:', error);
      toast({
        title: "Upload failed",
        description: "There was an error uploading your video. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  return {
    videoUrl,
    isUploading,
    uploadProgress,
    handleFileUpload
  };
};
