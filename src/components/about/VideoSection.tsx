
import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import Logo from "../ui-custom/Logo";

const VideoSection = () => {
  const [isVideoExpanded, setIsVideoExpanded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Using the Google Drive video link provided
  // Need to reformat Google Drive link for direct embedding
  const fileId = "1Bj8Q7KnmBw65yAL3XFDeKej93np1lTsF";
  const videoUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
  
  const handlePlayClick = () => {
    setIsVideoExpanded(true);
    setIsMuted(false);
    
    // Play the video when clicked
    if (videoRef.current) {
      videoRef.current.play().catch(err => {
        console.error("Error playing video:", err);
      });
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
            <video
              ref={videoRef}
              className="absolute top-0 left-0 w-full h-full object-cover"
              controls={isVideoExpanded}
              preload="metadata"
              muted={isMuted}
              poster="https://via.placeholder.com/1920x1080/e0f2fe/0369a1?text=CleverClaim+Video"
            >
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
            {!isVideoExpanded && (
              <div 
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-20 transition-all cursor-pointer"
                onClick={handlePlayClick}
              >
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center cursor-pointer hover:bg-primary/90 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5.14v14l11-7-11-7z" />
                  </svg>
                </div>
                <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                  <div className="bg-white/90 px-4 py-2 rounded-full shadow-md flex items-center gap-2">
                    <Logo size="sm" />
                    <span className="text-sm font-medium">Watch our story</span>
                  </div>
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
