
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Logo from "../ui-custom/Logo";

const VideoSection = () => {
  const [isVideoExpanded, setIsVideoExpanded] = useState(true); // Changed to true by default
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Using a more direct format for Google Drive video
  // The format below should work better for direct streaming
  const fileId = "1Bj8Q7KnmBw65yAL3XFDeKej93np1lTsF";
  const videoUrl = `https://drive.google.com/file/d/${fileId}/preview`;
  
  // Auto-play the video when component mounts
  useEffect(() => {
    // Component is mounted, auto-play the video
    setIsVideoExpanded(true);
    
    // No need for user interaction to start playing since it's muted
    // Browsers allow autoplay for muted videos
  }, []);
  
  const handlePlayClick = () => {
    // This now just unmutes the already playing video
    setIsMuted(false);
  };
  
  // Add poster image for video
  const posterImage = "https://via.placeholder.com/1920x1080/e0f2fe/0369a1?text=CleverClaim+Video";
  
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
            className={`relative w-full transition-all duration-500 ease-in-out aspect-video`}
          >
            {isVideoExpanded ? (
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`${videoUrl}?autoplay=1&mute=1`}
                allow="autoplay"
                allowFullScreen
              ></iframe>
            ) : (
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${posterImage})` }}
              >
                <div 
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-20 transition-all cursor-pointer"
                  onClick={handlePlayClick}
                >
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center cursor-pointer hover:bg-primary/90 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5.14v14l11-7-11-7z" />
                    </svg>
                  </div>
                  {/* Removed the "Watch our story" label */}
                </div>
              </div>
            )}
          </div>
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
