import React from "react";
import { motion } from "framer-motion";
import AnimatedButton from "@/components/ui-custom/AnimatedButton";
import { Link } from "react-router-dom";

interface HeroSectionProps {
  scrollToSection: (ref: React.RefObject<HTMLDivElement>) => void;
  howItWorksRef: React.RefObject<HTMLDivElement>;
}

const HeroSection: React.FC<HeroSectionProps> = ({ scrollToSection, howItWorksRef }) => {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden bg-gradient-to-br from-white to-blue-50">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=2670')] bg-cover bg-center opacity-[0.03]"></div>
      
      <div className="container-custom relative z-10 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Earn Money with CleverClaim!
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl">
                Share our platform with friends, followers, and your audience — and earn generous commissions for every successful claim.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <AnimatedButton to="/affiliate/register" variant="primary" size="lg">
                  Become a Partner
                </AnimatedButton>
                <Link
                  to="/affiliate/login" 
                  className="px-6 py-3 rounded-full font-medium border border-gray-200 text-gray-600 hover:text-primary hover:border-primary/20 transition-all shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2"
                >
                  Log in
                </Link>
              </div>
              
              <div className="mt-10">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    <span className="text-[#00b67a]">★★★★★</span>
                  </div>
                  <span className="text-gray-600 text-sm">
                    Trusted by <span className="font-semibold">2,000+</span> affiliate partners worldwide
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
          
          <div className="order-1 lg:order-2 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative w-full max-w-lg">
                <img
                  src="https://images.unsplash.com/photo-1469474968028-56623f02e42e"
                  alt="Travel blogger with mountain landscape"
                  className="rounded-xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg">
                  <div className="text-lg font-semibold text-primary">25%</div>
                  <div className="text-sm text-gray-600">from every successful claim</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
