
import React from "react";
import { motion } from "framer-motion";
import { Badge, BadgeCheck, Share, Award } from "lucide-react";

const HowItWorksSection: React.FC<{ reference: React.RefObject<HTMLDivElement> }> = ({ reference }) => {
  // Animation variants for staggered animations
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 24 } },
  };

  return (
    <section 
      ref={reference}
      id="how-it-works" 
      className="py-20 bg-white scroll-mt-20"
    >
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-bold mb-4"
          >
            How It Works
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-600"
          >
            Join our affiliate program in 3 simple steps
          </motion.p>
        </div>
        
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={container}
          className="grid grid-cols-1 md:grid-cols-3 gap-10"
        >
          <motion.div variants={item} className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-[#D3E4FD] flex items-center justify-center mb-5">
              <BadgeCheck className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">1. Sign Up</h3>
            <p className="text-gray-600">Register for our affiliate program in just 2 minutes.</p>
          </motion.div>
          
          <motion.div variants={item} className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-[#D3E4FD] flex items-center justify-center mb-5">
              <Share className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">2. Share Your Link</h3>
            <p className="text-gray-600">Get your personal affiliate link and share it anywhere — social media, blogs, messengers.</p>
          </motion.div>
          
          <motion.div variants={item} className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-[#D3E4FD] flex items-center justify-center mb-5">
              <Award className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">3. Get Paid</h3>
            <p className="text-gray-600">Earn up to 25% commission on every approved claim.</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
