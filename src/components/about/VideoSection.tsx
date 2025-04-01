
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import VideoPlayer from "./VideoPlayer";
import AdminControls from "./AdminControls";
import { useVideoUpload } from "@/hooks/useVideoUpload";

const VideoSection = () => {
  const [isAdmin, setIsAdmin] = useState(false); // Simple admin check, could be expanded
  const { videoUrl, isUploading, uploadProgress, handleFileUpload } = useVideoUpload();

  // Check for admin status
  useEffect(() => {
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
          <div className="relative w-full transition-all duration-500 ease-in-out aspect-video">
            <VideoPlayer videoUrl={videoUrl} />
          </div>
          
          {isAdmin && (
            <AdminControls
              isUploading={isUploading}
              uploadProgress={uploadProgress}
              onFileChange={handleFileUpload}
            />
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
