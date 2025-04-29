
import React from "react";
import { motion } from "framer-motion";

type Airline = {
  name: string;
  imgSrc: string;
};

interface AirlinesSectionProps {
  airlines: Airline[];
}

const AirlinesSection: React.FC<AirlinesSectionProps> = ({ airlines }) => {
  return (
    <div className="container-custom py-10 border-b border-gray-100">
      <div className="relative overflow-hidden">
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
          {airlines.map((airline, index) => (
            <motion.div
              key={index}
              className="flex-shrink-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.1 }}
            >
              <div className="h-12 w-28 relative flex items-center justify-center">
                <img 
                  src={airline.imgSrc} 
                  alt={`${airline.name} logo`} 
                  className="h-full w-full object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/placeholder.svg";
                    target.onerror = null;
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AirlinesSection;
