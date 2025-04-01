
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Plane } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="bg-white py-10 relative overflow-hidden">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-8 relative"
        >
          <span className="text-primary text-sm font-medium uppercase tracking-wider">ABOUT US</span>
          
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 my-4">
            Our tech turns flight disruptions into something good
          </h1>
          
          {/* Trustpilot Rating */}
          <div className="flex items-center justify-center mt-4">
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <span className="font-medium text-gray-700">Excellent</span>
              <div className="flex">
                <span className="text-[#00b67a]">★★★★★</span>
              </div>
              <span className="text-sm text-gray-500">211,776 reviews on</span>
              <span className="font-medium flex items-center">
                <span className="text-[#00b67a] mr-1">★</span> Trustpilot
              </span>
            </div>
          </div>
          
          {/* Add decorative plane icons in yellow circles */}
          <motion.div 
            className="absolute -bottom-16 -right-16 hidden md:block" 
            animate={{ 
              y: [0, -15, 0],
              rotate: [0, 10, 0]
            }}
            transition={{ 
              duration: 5,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <div className="bg-[#FEF7CD] rounded-full p-3 shadow-md">
              <Plane size={34} strokeWidth={2} className="text-gray-800" />
            </div>
          </motion.div>
          
          <motion.div 
            className="absolute -top-10 -left-16 hidden md:block" 
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, -5, 0]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 0.5
            }}
          >
            <div className="bg-[#FEF7CD] rounded-full p-2 shadow-sm">
              <Plane size={26} strokeWidth={2} className="text-gray-800 rotate-180" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
