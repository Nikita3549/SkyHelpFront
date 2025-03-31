
import React from "react";
import { motion } from "framer-motion";
import EuFlag from "@/components/ui-custom/EuFlag";
import { Globe } from "lucide-react";

const PassengerRights = () => {
  return (
    <section className="py-10 bg-white border-t border-b border-gray-100">
      <div className="container-custom">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-2xl font-bold text-gray-800 mb-8"
        >
          AIRHELP PROTECTS AIR PASSENGER RIGHTS
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* EU Regulation */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col items-center text-center"
          >
            <div className="flex items-center justify-center mb-3">
              <EuFlag size={24} className="mr-2" />
              <span className="text-lg font-medium text-gray-700">EU REGULATION EC 261</span>
            </div>
          </motion.div>
          
          {/* Brazilian Regulations */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center text-center"
          >
            <div className="flex items-center justify-center mb-3">
              <div className="w-6 h-6 bg-green-500 rounded mr-2 flex items-center justify-center">
                <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                </div>
              </div>
              <span className="text-lg font-medium text-gray-700">BRAZILIAN REGULATIONS</span>
            </div>
          </motion.div>
          
          {/* Montreal Convention */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col items-center text-center"
          >
            <div className="flex items-center justify-center mb-3">
              <Globe className="w-6 h-6 text-blue-500 mr-2" />
              <span className="text-lg font-medium text-gray-700">MONTREAL CONVENTION</span>
            </div>
          </motion.div>
          
          {/* Turkish Regulations */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col items-center text-center"
          >
            <div className="flex items-center justify-center mb-3">
              <div className="w-6 h-6 bg-red-600 rounded-full mr-2 flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                </div>
              </div>
              <span className="text-lg font-medium text-gray-700">TURKISH REGULATIONS</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PassengerRights;
