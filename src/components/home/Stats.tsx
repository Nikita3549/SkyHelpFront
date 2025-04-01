
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Award, BanknoteIcon, Cpu, PiggyBank } from "lucide-react";

const Stats = () => {
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);
  
  const stats = [
    {
      value: "€600",
      label: "Maximum compensation per passenger",
      description: "EU regulation 261/2004 entitles you to up to €600 compensation",
      icon: BanknoteIcon,
    },
    {
      value: "94%",
      label: "Success rate on valid claims",
      description: "Our expert team handles airline negotiations effectively",
      icon: Award,
    },
    {
      value: "AI",
      label: "Powered claim processing",
      description: "Advanced algorithms analyze your claim in seconds, not days",
      icon: Cpu,
    },
    {
      value: "€2.8M",
      label: "Recovered for our customers",
      description: "Helping passengers get the compensation they deserve",
      icon: PiggyBank,
    },
  ];

  return (
    <div className="container-custom relative z-10 py-12 md:py-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {stats.map((stat, index) => (
          <motion.div 
            key={index} 
            className="relative h-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            onHoverStart={() => setHoveredStat(index)}
            onHoverEnd={() => setHoveredStat(null)}
            style={{ 
              zIndex: hoveredStat === index ? 20 : 1,
            }}
          >
            <Card 
              className={`h-full transition-all duration-300 ${
                hoveredStat === index 
                  ? "shadow-xl border-primary/30" 
                  : "shadow-md"
              }`}
              style={{
                transform: hoveredStat === index ? 'translateY(-8px)' : 'none',
                position: 'relative',
              }}
            >
              <CardContent className="p-6">
                <div className="flex flex-col items-center">
                  <motion.div 
                    className="text-primary mb-2"
                    initial={{ scale: 1 }}
                    animate={{ 
                      scale: hoveredStat === index ? [1, 1.2, 1] : 1,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <stat.icon size={28} />
                  </motion.div>
                  
                  <motion.h3 
                    className="text-3xl md:text-4xl font-bold text-primary text-center"
                    initial={{ scale: 1 }}
                    animate={{ 
                      scale: hoveredStat === index ? [1, 1.1, 1] : 1,
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    {stat.value}
                  </motion.h3>
                  
                  <p className="text-gray-600 text-center mt-2">{stat.label}</p>
                  
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ 
                      height: hoveredStat === index ? "auto" : 0,
                      opacity: hoveredStat === index ? 1 : 0 
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden mt-3"
                  >
                    <p className="text-sm text-gray-500 text-center">{stat.description}</p>
                    
                    <div className="flex justify-center mt-3">
                      <button className="text-primary text-sm font-medium flex items-center">
                        Learn more
                      </button>
                    </div>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="text-center mt-10"
      >
        <p className="text-sm text-gray-500 italic">
          Based on our claims data from the past 3 years
        </p>
      </motion.div>
    </div>
  );
};

export default Stats;
