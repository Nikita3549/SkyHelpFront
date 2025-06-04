import React, { useState } from 'react';
import { Play } from 'lucide-react';

interface VideoPlayerProps {
  videoUrl: string | null;
  isVideoExpanded: boolean;
  setIsVideoExpanded: (value: boolean) => void;
  isPlaying: boolean;
  setIsPlaying: (value: boolean) => void;
  isMuted: boolean;
  setIsMuted: (value: boolean) => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl,
  isVideoExpanded,
  setIsVideoExpanded,
  isPlaying,
  setIsPlaying,
  isMuted,
  setIsMuted,
}) => {
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
            <Play className="h-6 w-6 text-white fill-white" />
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
