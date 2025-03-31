
import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Marquee from "@/components/ui-custom/Marquee";
import HeroButtons from "./HeroButtons";
import HeroTrustBadge from "./HeroTrustBadge";
import EuFlag from "@/components/ui-custom/EuFlag";

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
        <EuFlag size={16} className="mr-2" />
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
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="mt-2 mb-4"
      >
        <Marquee 
          className="h-10 bg-blue-50/80 backdrop-blur-sm rounded-lg border border-blue-100 shadow-sm" 
          speed={40}
          pauseDuration={3000}
        >
          <div className="flex items-center space-x-6 py-2 px-4 text-gray-700 font-medium">
            <span className="flex items-center">
              <Check className="h-5 w-5 text-green-500 mr-2" />
              Claim old flights up to 3 years
            </span>
            <span className="flex items-center">
              <Check className="h-5 w-5 text-green-500 mr-2" />
              No fees for checking eligibility
            </span>
            <span className="flex items-center">
              <Check className="h-5 w-5 text-green-500 mr-2" />
              Quick and free eligibility check
            </span>
          </div>
        </Marquee>
      </motion.div>
      
      <HeroButtons />
      
      <HeroTrustBadge />
    </motion.div>
  );
};

export default HeroTitle;
