import React from 'react';
import { motion } from 'framer-motion';
import { Plane, FileText, CreditCard } from 'lucide-react';
import AnimatedButton from '@/components/ui-custom/AnimatedButton';

const HowItWorks = ({
  howItWorksRef,
}: {
  howItWorksRef: React.RefObject<HTMLDivElement>;
}) => {
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
    show: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 24 },
    },
  };

  return (
    <section
      ref={howItWorksRef}
      id="how-it-works"
      className="py-20 bg-white relative scroll-mt-20"
      tabIndex={-1}
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
            We've simplified the compensation process to just three easy steps.
          </motion.p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={container}
          className="grid grid-cols-1 md:grid-cols-3 gap-10"
        >
          <motion.div
            variants={item}
            className="flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-5">
              <Plane className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">
              1. Submit Your Flight Details
            </h3>
            <p className="text-gray-600">
              Enter your flight information in our simple form. We'll check if
              you're eligible for compensation under EU Regulation 261/2004.
            </p>
          </motion.div>

          <motion.div
            variants={item}
            className="flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-5">
              <FileText className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">
              2. We Handle The Paperwork
            </h3>
            <p className="text-gray-600">
              Our team prepares all necessary legal documents, submits your
              claim to the airline, and handles all communication.
            </p>
          </motion.div>

          <motion.div
            variants={item}
            className="flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-5">
              <CreditCard className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">
              3. Receive Your Compensation
            </h3>
            <p className="text-gray-600">
              Once the airline approves your claim, we transfer the compensation
              directly to your preferred payment method.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <AnimatedButton to="/claim" variant="primary" size="lg">
            Start Your Claim Now
          </AnimatedButton>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
