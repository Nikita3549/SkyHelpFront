import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import VideoPlayer from './video/VideoPlayer';
import AdminControls from './video/AdminControls';

const VideoSection = () => {
  const [isVideoExpanded, setIsVideoExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true); // Start as playing
  const [isMuted, setIsMuted] = useState(true); // Start as muted
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false); // Simple admin check, could be expanded

  // Check if there's a stored video
  useEffect(() => {
    const checkForVideo = async () => {
      try {
        // List videos in the bucket
        const { data, error } = await supabase.storage
          .from('videos')
          .list('', { limit: 1 });

        if (error) {
          console.error('Error fetching videos:', error);
          return;
        }

        // If we found at least one video, get its URL
        if (data && data.length > 0) {
          const { data: publicUrlData } = supabase.storage
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

  return (
    <div className="bg-gray-100 py-8">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="rounded-xl overflow-hidden shadow-lg bg-white mb-8"
        >
          <VideoPlayer
            videoUrl={videoUrl}
            isVideoExpanded={isVideoExpanded}
            setIsVideoExpanded={setIsVideoExpanded}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            isMuted={isMuted}
            setIsMuted={setIsMuted}
          />

          <AdminControls isAdmin={isAdmin} />
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
