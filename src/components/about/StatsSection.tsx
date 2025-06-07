import React from 'react';
import { motion } from 'framer-motion';

const StatsSection = () => {
  const stats = [
    {
      number: '180+',
      label: 'million',
      description: 'flights checked last year',
    },
    {
      number: '9+',
      label: 'million',
      description: 'have protected their flights with AirHelp+',
    },
    {
      number: '2.7+',
      label: 'million',
      description: 'passengers successfully paid compensation.svg',
    },
    {
      number: '60+',
      label: '',
      description: 'partnerships with the best-known travel brands',
    },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="flex items-end justify-center">
                <span className="text-3xl md:text-4xl font-bold text-primary">
                  {stat.number}
                </span>
                <span className="text-xl md:text-2xl font-semibold text-gray-800 ml-1">
                  {stat.label}
                </span>
              </div>
              <p className="text-sm mt-2 text-gray-600">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
