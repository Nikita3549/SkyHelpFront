
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-b from-blue-50 to-white py-20">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            <span className="text-primary">About Us</span>
          </h1>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            CleverClaim - Your Trusted Flight Disruption Companion
          </h2>
          
          {/* Trustpilot Rating */}
          <div className="flex items-center justify-center mt-8 bg-white p-4 rounded-lg shadow-sm">
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <span className="font-medium text-gray-700">Excellent</span>
              <div className="flex">
                <img src="/lovable-uploads/5f38c0aa-45f7-4d7f-94c8-a9b7889ec866.png" alt="Trustpilot rating" className="h-8" />
              </div>
              <span className="text-sm text-gray-500">211,850 reviews on</span>
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
