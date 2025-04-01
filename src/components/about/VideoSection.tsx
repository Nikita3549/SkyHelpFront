
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Logo from "../ui-custom/Logo";

const VideoSection = () => {
  const [isVideoExpanded, setIsVideoExpanded] = useState(false); // Changed back to false by default
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Using a more direct format for Google Drive video
  // The format below should work better for direct streaming
  const fileId = "1Bj8Q7KnmBw65yAL3XFDeKej93np1lTsF";
  const videoUrl = `https://drive.google.com/file/d/${fileId}/preview`;
  
  // Add poster image for video
  const posterImage = "https://via.placeholder.com/1920x1080/e0f2fe/0369a1?text=CleverClaim+Video";
  
  const handlePlayClick = () => {
    setIsVideoExpanded(true);
    setIsMuted(false);
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
            className={`relative w-full transition-all duration-500 ease-in-out ${isVideoExpanded ? 'aspect-video' : 'h-[200px]'}`}
          >
            {isVideoExpanded ? (
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`${videoUrl}?autoplay=1`}
                allow="autoplay"
                allowFullScreen
              ></iframe>
            ) : (
              <div className="relative w-full h-full">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={`${videoUrl}?autoplay=1&mute=1`}
                  allow="autoplay"
                  allowFullScreen
                ></iframe>
                <div 
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-20 transition-all cursor-pointer"
                  onClick={handlePlayClick}
                >
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center cursor-pointer hover:bg-primary/90 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5.14v14l11-7-11-7z" />
                    </svg>
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
