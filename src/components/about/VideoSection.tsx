
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Upload, Play, Pause } from "lucide-react";

const VideoSection = () => {
  const [isVideoExpanded, setIsVideoExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true); // Start as playing
  const [isMuted, setIsMuted] = useState(true); // Start as muted
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false); // Simple admin check, could be expanded

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
    
    // For simplicity, let's consider admins based on URL param
    // In a real app, this would be part of auth
    if (window.location.href.includes('admin=true')) {
      setIsAdmin(true);
    }
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
  
  const togglePlayPause = () => {
    if (!isVideoExpanded) {
      // First click: expand and unmute
      setIsVideoExpanded(true);
      setIsMuted(false);
    } else {
      // Subsequent clicks: toggle play/pause
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="bg-gray-100 py-8">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="rounded-xl overflow-hidden shadow-lg bg-white mb-8"
        >
          <div 
            className={`relative w-full transition-all duration-500 ease-in-out ${isVideoExpanded ? 'aspect-video' : 'h-[300px]'}`}
          >
            {videoUrl ? (
              <video 
                src={videoUrl} 
                className="absolute top-0 left-0 w-full h-full object-cover cursor-pointer"
                autoPlay={true}
                muted={isMuted}
                playsInline
                controls={isVideoExpanded}
                loop={true}
                onClick={togglePlayPause}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                <p className="text-lg text-gray-500">No company video uploaded yet</p>
              </div>
            )}
            
            {!isVideoExpanded && videoUrl && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-20 transition-all">
                <div 
                  className="w-12 h-12 rounded-full bg-primary flex items-center justify-center cursor-pointer hover:bg-primary/90 transition-colors"
                  onClick={togglePlayPause}
                >
                  {isPlaying ? (
                    <Pause className="h-6 w-6 text-white" />
                  ) : (
                    <Play className="h-6 w-6 text-white fill-white" />
                  )}
                </div>
              </div>
            )}
          </div>
          
          {isAdmin && (
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
          )}
        </motion.div>
        
        <div className="text-center pb-4">
          <span className="text-primary text-sm font-medium uppercase tracking-wider">
            WE'RE THE GLOBAL LEADER IN FLIGHT COMPENSATION
          </span>
        </div>
      </div>
    </div>
  );
};

export default VideoSection;
