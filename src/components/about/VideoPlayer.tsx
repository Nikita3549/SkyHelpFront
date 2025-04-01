
import React, { useState } from "react";
import { Play, Pause } from "lucide-react";

interface VideoPlayerProps {
  videoUrl: string | null;
}

const VideoPlayer = ({ videoUrl }: VideoPlayerProps) => {
  const [isVideoExpanded, setIsVideoExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true); // Start as playing
  const [isMuted, setIsMuted] = useState(true); // Start as muted

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
