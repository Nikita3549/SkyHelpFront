import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const Cta = () => {
  return (
    <section className="px-20 max-md:px-4 text-white relative">
      <img
        src="/landing/cta/background-earth.svg"
        className="absolute left-0 min-h-full max-w-full object-cover z-[10]"
        alt="Earth background"
      />
      <div className="container-custom py-20 bg-[#3282f7] rounded-[36px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to claim your compensation?
          </h2>
          <p className="text-lg text-white/80 mb-8">
            Check if you're eligible for up to €600 in compensation for your
            delayed or cancelled flight. No win, no fee.
          </p>
          <Link
            to="/claim"
            className="inline-flex items-center px-8 py-4 rounded-full bg-white text-primary font-medium hover:bg-opacity-95 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-primary"
          >
            Start Your Claim Now
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Cta;
