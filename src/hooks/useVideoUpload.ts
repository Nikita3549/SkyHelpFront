
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
            return prev + 5;
          }
          return prev;
        });
      }, 300);
      
      // Upload the file
      const fileName = `company-video-${Date.now()}.${file.name.split('.').pop()}`;
      
      // Check if the 'videos' bucket exists, if not create it
      const { data: buckets } = await supabase.storage.listBuckets();
      const videoBucket = buckets?.find(bucket => bucket.name === 'videos');
      
      if (!videoBucket) {
        console.log("Videos bucket doesn't exist, trying to create it");
        const { error: bucketError } = await supabase.storage.createBucket('videos', {
          public: true
        });
        
        if (bucketError) {
          console.error('Error creating videos bucket:', bucketError);
          throw bucketError;
        }
      }
      
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
