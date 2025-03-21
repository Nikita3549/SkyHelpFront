
import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const HeroTrustBadge = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6, duration: 0.8 }}
      className="pt-8"
    >
      <p className="text-sm text-gray-500 mb-3">Trusted by thousands of passengers</p>
      <div className="flex items-center">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="bg-white rounded-lg shadow-sm px-6 py-4 flex items-center"
        >
          <Badge variant="default" className="bg-[#00b67a] hover:bg-[#00b67a]/90 flex items-center gap-1 px-3 py-1">
            <span className="font-bold">Trustpilot</span>
          </Badge>
          
          <div className="flex items-center gap-1 mx-3">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={18} 
                fill="#00b67a" 
                color="#00b67a" 
                className="flex-shrink-0"
              />
            ))}
          </div>
          
          <div className="ml-1">
            <span className="font-bold text-gray-800">4.8/5</span>
            <p className="text-xs text-gray-600">1,200+ reviews</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HeroTrustBadge;
