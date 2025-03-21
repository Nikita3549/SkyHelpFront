
import React from "react";
import { motion } from "framer-motion";

const Stats = () => {
  return (
    <div className="container-custom relative z-10 py-8 md:py-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="glass rounded-xl p-6 shadow-lg"
        >
          <h4 className="text-4xl font-bold text-primary">€600</h4>
          <p className="text-gray-600 mt-2">Maximum compensation per passenger</p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="glass rounded-xl p-6 shadow-lg"
        >
          <h4 className="text-4xl font-bold text-primary">94%</h4>
          <p className="text-gray-600 mt-2">Success rate on valid claims</p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="glass rounded-xl p-6 shadow-lg"
        >
          <h4 className="text-4xl font-bold text-primary">3 min</h4>
          <p className="text-gray-600 mt-2">Average time to check eligibility</p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="glass rounded-xl p-6 shadow-lg"
        >
          <h4 className="text-4xl font-bold text-primary">€2.8M</h4>
          <p className="text-gray-600 mt-2">Recovered for our customers</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Stats;
