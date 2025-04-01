
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const HeroButtons = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.8 }}
      className="flex flex-wrap gap-4 pt-4"
    >
      <Link
        to="/claim"
        className="px-6 py-3 rounded-full font-medium bg-primary text-white hover:bg-blue-600 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
      >
        Check Your Eligibility
      </Link>
      
      <Link
        to="/#how-it-works"
        className="px-6 py-3 rounded-full font-medium border border-gray-200 text-gray-600 hover:text-primary hover:border-primary/20 transition-all shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2"
      >
        How It Works
      </Link>
    </motion.div>
  );
};

export default HeroButtons;
