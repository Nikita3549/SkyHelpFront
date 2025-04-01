
import React, { useState } from "react";
import { motion } from "framer-motion";

const VideoSection = () => {
  const [isVideoExpanded, setIsVideoExpanded] = useState(false);

  return (
    <div className="container-custom">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="rounded-xl overflow-hidden shadow-2xl mb-16"
      >
        <div 
          className={`relative w-full transition-all duration-500 ease-in-out ${isVideoExpanded ? 'aspect-video' : 'h-[300px]'}`}
          onClick={() => setIsVideoExpanded(true)}
        >
          <iframe 
            src="https://www.youtube.com/embed/dQw4w9WgXcQ?enablejsapi=1" 
            title="CleverClaim video" 
            className="absolute top-0 left-0 w-full h-full cursor-pointer"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onLoad={(e) => {
              // This adds an event listener to track when the video starts playing
              const iframe = e.target as HTMLIFrameElement;
              window.addEventListener('message', (event) => {
                if (event.source === iframe.contentWindow) {
                  try {
                    const data = JSON.parse(event.data);
                    // YouTube API event for state change (1 = playing)
                    if (data.event === 'infoDelivery' || data.event === 'onStateChange') {
                      if (data.info && data.info.playerState === 1) {
                        setIsVideoExpanded(true);
                      }
                    }
                  } catch (error) {
                    console.error('Failed to parse YouTube API message', error);
                  }
                }
              });
            }}
          ></iframe>
          {!isVideoExpanded && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-20 transition-all">
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center cursor-pointer hover:bg-primary/90 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5.14v14l11-7-11-7z" />
                </svg>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default VideoSection;
