
import React from "react";
import { motion } from "framer-motion";
import { Database, Zap, TrendingUp } from "lucide-react";
import InfoCard from "../common/InfoCard";

const TechSection = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-500 to-blue-700 text-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="space-y-3">
              <h3 className="uppercase font-semibold tracking-wider text-blue-100">
                REVOLUTIONIZING OUR INDUSTRY
              </h3>
              <h2 className="text-3xl font-bold">
                Innovating tech and data
              </h2>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="space-y-6">
              <p className="text-lg font-medium text-blue-50">
                Extensive data and the latest tech allow us to check thousands of flights every day.
              </p>
              <p className="text-base text-blue-100">
                So you'll know what compensation you're owed within minutes, for free. 
                And we work with travel agents, airlines, and governments to improve care for passengers.
              </p>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard 
            icon={<Database size={24} />}
            title="Advanced Data Processing"
            description="Our systems process flight data in real-time, allowing for instant claim eligibility assessment."
            className="bg-white/10 border-blue-400/20 text-white"
          />
          
          <InfoCard 
            icon={<Zap size={24} />}
            title="Instant Decisions"
            description="Get immediate answers about your compensation eligibility without waiting for manual reviews."
            className="bg-white/10 border-blue-400/20 text-white"
          />
          
          <InfoCard 
            icon={<TrendingUp size={24} />}
            title="Continuous Improvement"
            description="We're constantly refining our technology to make the claims process even faster and more accurate."
            className="bg-white/10 border-blue-400/20 text-white"
          />
        </div>
      </div>
    </section>
  );
};

export default TechSection;
