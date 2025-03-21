
import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import HeroButtons from "./HeroButtons";
import HeroTrustBadge from "./HeroTrustBadge";

const HeroTitle = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-primary text-sm font-medium mb-2"
      >
        <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
        EU Regulation 261/2004
      </motion.div>
      
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance"
      >
        Get up to <span className="text-primary">€600</span> for your delayed flight
      </motion.h1>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="text-lg text-gray-600 max-w-xl"
      >
        No paperwork. No hassle. We handle your flight compensation claim from start to finish on a no-win, no-fee basis.
      </motion.p>
      
      <HeroButtons />
      
      <HeroTrustBadge />
    </motion.div>
  );
};

export default HeroTitle;
