import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const Cta = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/90 to-blue-600/90 text-white">
      <div className="container-custom">
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
            <ChevronRight className="ml-2 h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Cta;
