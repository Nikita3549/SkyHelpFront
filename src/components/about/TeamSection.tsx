import React from 'react';
import { motion } from 'framer-motion';

const TeamSection = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-xl font-semibold text-gray-900">
              Collaborative Environment
            </h3>
            <p className="text-gray-700">
              Our team thrives in a collaborative environment where innovative
              ideas are encouraged and developed. Regular brainstorming sessions
              and knowledge sharing help us stay at the cutting edge of both
              legal developments and technological advancements in the aviation
              industry.
            </p>

            <h3 className="text-xl font-semibold text-gray-900">
              Expertise & Dedication
            </h3>
            <p className="text-gray-700">
              With specialists in EU air passenger rights regulations, data
              science, and customer advocacy, we bring together the perfect
              combination of skills to handle even the most complex compensation
              claims. Our team's dedication ensures we fight for every penny
              you're entitled to.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="rounded-lg overflow-hidden shadow-md">
              <img
                src="/lovable-uploads/75d03988-d5f8-4e4c-9f5b-fbc875e45630.png"
                alt="CleverClaim team working together"
                className="w-full h-auto"
              />
            </div>
            <p className="text-sm text-gray-500 mt-2 text-center italic">
              Our team collaborating during a weekly strategy session
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
