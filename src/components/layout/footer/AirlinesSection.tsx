import React from 'react';
import { motion } from 'framer-motion';

type Airline = {
  name: string;
  imgSrc: string;
};

interface AirlinesSectionProps {
  airlines: Airline[];
}

const AirlinesSection: React.FC<AirlinesSectionProps> = ({ airlines }) => {
  return (
    <div className="py-10 border-b border-gray-100">
      {/* Wrapper */}
      <div className="w-full px-4 md:px-0">
        {/* Scrollable container on mobile */}
        <div className="overflow-hidden">
          <div className="flex gap-6 md:gap-8 flex-wrap md:justify-center items-center max-md:flex-nowrap max-md:overflow-x-auto max-md:scroll-smooth max-md:snap-x max-md:snap-mandatory max-md:-mx-4 max-md:px-4">
            {/* Optional leading spacer for better snap alignment */}
            <div className="shrink-0 w-2 max-md:snap-start" />

            {airlines.map((airline, index) => (
              <motion.div
                key={index}
                className="flex-shrink-0 max-md:snap-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="h-12 w-28 relative flex items-center justify-center">
                  <img
                    src={airline.imgSrc}
                    alt={`${airline.name} logo`}
                    className="h-full w-full object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder.svg';
                      target.onerror = null;
                    }}
                  />
                </div>
              </motion.div>
            ))}

            {/* Optional trailing spacer */}
            <div className="shrink-0 w-2" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AirlinesSection;
