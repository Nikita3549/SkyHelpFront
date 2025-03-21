
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, Plane } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-gradient-to-br from-white to-blue-50 pt-16">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1595674617530-78147adbb393?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=2670')] bg-cover bg-center opacity-[0.03]"></div>
      
      {/* Airplane Vector Graphics */}
      <div className="absolute left-[5%] top-[15%] text-blue-100/30 transform -rotate-12">
        <Plane size={180} strokeWidth={1} />
      </div>
      <div className="absolute right-[8%] bottom-[10%] text-primary/10 transform rotate-45">
        <Plane size={120} strokeWidth={1} />
      </div>
      <div className="absolute left-[20%] bottom-[25%] text-blue-200/20 transform rotate-12">
        <Plane size={100} strokeWidth={1} />
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
              <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                <div className="bg-white rounded-lg shadow-sm px-3 py-2 text-gray-400">
                  <span className="sr-only">Airline 1</span>
                  <svg className="h-6 sm:h-8" viewBox="0 0 84 24" fill="currentColor">
                    <path d="M12.4 2L2 22h5.6l2.4-5h9.6l2.4 5h5.6L18 2h-5.6zm3.2 11H11l2.4-6 2.4 6H15.6zM33 22l-9-20h-2L13 22h2.8l1.8-4h6.8l1.8 4H33zm-7.6-7h-4.8L23 9l2.4 6z" />
                    <path d="M47 9c0-2.8-2.2-5-5-5h-8v18h2v-8h6c2.8 0 5-2.2 5-5zm-4 0c0 1.1-.9 2-2 2h-5V7h5c1.1 0 2 .9 2 2zM55 22h-8V4h8c2.8 0 5 2.2 5 5v8c0 2.8-2.2 5-5 5zm2-13c0-1.1-.9-2-2-2h-5v12h5c1.1 0 2-.9 2-2V9z" />
                    <path d="M67 22h-8V4h8c2.8 0 5 2.2 5 5v8c0 2.8-2.2 5-5 5zm2-13c0-1.1-.9-2-2-2h-5v12h5c1.1 0 2-.9 2-2V9z" />
                  </svg>
                </div>
                <div className="bg-white rounded-lg shadow-sm px-3 py-2 text-gray-400">
                  <span className="sr-only">Airline 2</span>
                  <svg className="h-6 sm:h-8" viewBox="0 0 100 24" fill="currentColor">
                    <path d="M14 2C7.4 2 2 7.4 2 14s5.4 12 12 12 12-5.4 12-12S20.6 2 14 2zm0 21c-5 0-9-4-9-9s4-9 9-9 9 4 9 9-4 9-9 9z" />
                    <path d="M14 7v7h7v-3h-4V7h-3zM35 2c-6.6 0-12 5.4-12 12s5.4 12 12 12 12-5.4 12-12S41.6 2 35 2zm0 21c-5 0-9-4-9-9s4-9 9-9 9 4 9 9-4 9-9 9z" />
                    <path d="M42 11h-4V7h-3v7h7v-3zM56 2c-6.6 0-12 5.4-12 12s5.4 12 12 12 12-5.4 12-12S62.6 2 56 2zm0 21c-5 0-9-4-9-9s4-9 9-9 9 4 9 9-4 9-9 9z" />
                    <path d="M63 11h-4V7h-3v7h7v-3zM77 2c-6.6 0-12 5.4-12 12s5.4 12 12 12 12-5.4 12-12S83.6 2 77 2zm0 21c-5 0-9-4-9-9s4-9 9-9 9 4 9 9-4 9-9 9z" />
                    <path d="M84 11h-4V7h-3v7h7v-3z" />
                  </svg>
                </div>
                <div className="bg-white rounded-lg shadow-sm px-3 py-2 text-gray-400">
                  <span className="sr-only">Airline 3</span>
                  <svg className="h-6 sm:h-8" viewBox="0 0 84 24" fill="currentColor">
                    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z" />
                    <path d="M12 6v6h6v-2h-4V6h-2zM34 2H24v20h10c5.5 0 10-4.5 10-10S39.5 2 34 2zm0 18h-8V4h8c4.4 0 8 3.6 8 8s-3.6 8-8 8z" />
                    <path d="M58 12l-6-8h-4v16h2V8l6 8 6-8v12h2V4h-4l-6 8z" />
                  </svg>
                </div>
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
            
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-blue-500/10 rounded-full animate-float" />
            <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary/10 rounded-full animate-float" style={{animationDelay: '1s'}} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
