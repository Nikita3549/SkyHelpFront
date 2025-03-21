import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Plane } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-gradient-to-br from-white to-blue-50 pt-16">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1595674617530-78147adbb393?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=2670')] bg-cover bg-center opacity-[0.03]"></div>
      
      <div className="absolute right-0 top-[10%] text-blue-100/20 transform -rotate-12">
        <Plane size={280} strokeWidth={1} />
      </div>
      
      <div className="container-custom relative z-10 py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
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
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="pt-8"
            >
              <p className="text-sm text-gray-500 mb-3">Trusted by thousands of passengers</p>
              <div className="flex flex-wrap items-center gap-4">
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                  className="bg-white rounded-lg shadow-sm px-4 py-3 text-gray-600 hover:text-primary transition-colors"
                >
                  <span className="font-medium">British Airways</span>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="bg-white rounded-lg shadow-sm px-4 py-3 text-gray-600 hover:text-primary transition-colors"
                >
                  <span className="font-medium">Lufthansa</span>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.5 }}
                  className="bg-white rounded-lg shadow-sm px-4 py-3 text-gray-600 hover:text-primary transition-colors"
                >
                  <span className="font-medium">Air France</span>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="glass rounded-2xl p-6 md:p-8 shadow-xl">
              <div className="flex flex-col space-y-5">
                <h3 className="text-xl font-medium text-gray-800">Check your eligibility</h3>
                <div className="grid gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Flight Number</label>
                    <input 
                      type="text" 
                      placeholder="e.g., BA1234" 
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Flight Date</label>
                    <input 
                      type="date"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                </div>
                
                <Link 
                  to="/claim" 
                  className="w-full px-4 py-3 bg-primary text-white rounded-lg font-medium hover:bg-blue-600 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5 text-center"
                >
                  Check Now
                </Link>
                
                <div className="text-xs text-gray-500 space-y-2 pt-2">
                  <p className="flex items-start">
                    <Check className="h-4 w-4 text-primary flex-shrink-0 mr-1.5 mt-0.5" />
                    <span>No obligation to continue after checking</span>
                  </p>
                  <p className="flex items-start">
                    <Check className="h-4 w-4 text-primary flex-shrink-0 mr-1.5 mt-0.5" />
                    <span>No-win, no-fee — only pay if we win your case</span>
                  </p>
                  <p className="flex items-start">
                    <Check className="h-4 w-4 text-primary flex-shrink-0 mr-1.5 mt-0.5" />
                    <span>We handle the entire claim process for you</span>
                  </p>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-blue-500/10 rounded-full animate-float" />
            <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary/10 rounded-full animate-float" style={{animationDelay: '1s'}} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
