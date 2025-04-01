
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="bg-white py-10">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-8"
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
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
