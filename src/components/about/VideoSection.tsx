
import React, { useState } from "react";
import { motion } from "framer-motion";
import Logo from "../ui-custom/Logo";

const VideoSection = () => {
  const [isVideoExpanded, setIsVideoExpanded] = useState(false);
  // Placeholder video URL - replace with your actual video URL when available
  const videoUrl = "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4";

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
            onClick={() => setIsVideoExpanded(true)}
          >
            <video
              className="absolute top-0 left-0 w-full h-full cursor-pointer object-cover"
              controls
              preload="metadata"
              poster="https://via.placeholder.com/1920x1080/e0f2fe/0369a1?text=CleverClaim+Video"
              onClick={() => {
                setIsVideoExpanded(true);
                // Play the video when clicked
                const videoElement = document.querySelector('video');
                if (videoElement) {
                  videoElement.play().catch(err => {
                    console.error("Error playing video:", err);
                  });
                }
              }}
            >
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
            {!isVideoExpanded && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-20 transition-all">
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
