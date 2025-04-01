
import React, { useState, useRef, useEffect } from "react";
import { Play, Pause } from "lucide-react";

interface VideoPlayerProps {
  videoUrl: string | null;
}

const VideoPlayer = ({ videoUrl }: VideoPlayerProps) => {
  const [isVideoExpanded, setIsVideoExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true); // Start as playing
  const [isMuted, setIsMuted] = useState(true); // Start as muted
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Generate thumbnail from the video
  useEffect(() => {
    if (videoUrl && videoRef.current) {
      // Create thumbnail when the video metadata is loaded
      const handleMetadataLoaded = () => {
        if (videoRef.current) {
          // Set the current time to a point in the video (e.g., 1 second in)
          videoRef.current.currentTime = 1;
        }
      };
      
      // Capture the thumbnail once the time update occurs
      const handleTimeUpdate = () => {
        if (videoRef.current && !thumbnailUrl) {
          try {
            // Create a canvas to capture the video frame
            const canvas = document.createElement('canvas');
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
            
            // Draw the current video frame to the canvas
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
              
              // Convert canvas to data URL
              const dataUrl = canvas.toDataURL('image/jpeg');
              setThumbnailUrl(dataUrl);
              
              // Reset video time and pause if not playing
              if (!isPlaying) {
                videoRef.current.currentTime = 0;
                videoRef.current.pause();
              }
            }
          } catch (error) {
            console.error('Error generating thumbnail:', error);
          }
          
          // Remove event listener after thumbnail is created
          videoRef.current.removeEventListener('timeupdate', handleTimeUpdate);
        }
      };
      
      // Add event listeners
      videoRef.current.addEventListener('loadedmetadata', handleMetadataLoaded);
      videoRef.current.addEventListener('timeupdate', handleTimeUpdate);
      
      // Cleanup
      return () => {
        if (videoRef.current) {
          videoRef.current.removeEventListener('loadedmetadata', handleMetadataLoaded);
          videoRef.current.removeEventListener('timeupdate', handleTimeUpdate);
        }
      };
    }
  }, [videoUrl]);

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

  if (!videoUrl) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
        <p className="text-lg text-gray-500">No company video uploaded yet</p>
      </div>
    );
  }

  return (
    <>
      {/* Show the thumbnail when video is not expanded or not playing */}
      {thumbnailUrl && !isVideoExpanded && (
        <div className="absolute inset-0">
          <img 
            src={thumbnailUrl} 
            alt="Video preview" 
            className="w-full h-full object-cover"
            onClick={togglePlayPause}
          />
        </div>
      )}
      
      <video 
        ref={videoRef}
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
        style={{ visibility: (!isVideoExpanded && thumbnailUrl) ? 'hidden' : 'visible' }}
      />
      
      {!isVideoExpanded && (
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
    </>
  );
};

export default VideoPlayer;
