
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Euro, Percent, Clock, Wallet, ArrowRight, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Stats = () => {
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);
  
  const stats = [
    {
      icon: <Euro className="h-8 w-8 text-primary" />,
      value: "€600",
      label: "Maximum compensation per passenger",
      description: "EU regulation 261/2004 entitles you to up to €600 compensation",
    },
    {
      icon: <Percent className="h-8 w-8 text-primary" />,
      value: "94%",
      label: "Success rate on valid claims",
      description: "Our expert team handles airline negotiations effectively",
    },
    {
      icon: <Clock className="h-8 w-8 text-primary" />,
      value: "3 min",
      label: "Average time to check eligibility",
      description: "Quick and easy claim verification process",
    },
    {
      icon: <Wallet className="h-8 w-8 text-primary" />,
      value: "€2.8M",
      label: "Recovered for our customers",
      description: "Helping passengers get the compensation they deserve",
    },
  ];

  return (
    <div className="container-custom relative z-10 py-12 md:py-20">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl md:text-3xl font-bold text-center mb-8"
      >
        Why Choose Our Flight Compensation Service?
      </motion.h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            onMouseEnter={() => setHoveredStat(index)}
            onMouseLeave={() => setHoveredStat(null)}
            className="relative"
          >
            <Card className={`h-full transition-all duration-300 ${
              hoveredStat === index 
                ? "shadow-xl transform -translate-y-2 border-primary/30" 
                : "shadow-md"
            }`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10">
                  {stat.icon}
                </div>
                
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
                      Learn more <ArrowRight className="ml-1 h-3 w-3" />
                    </button>
                  </div>
                </motion.div>
              </CardContent>
              
              {hoveredStat === index && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute -bottom-2 left-0 right-0 flex justify-center"
                >
                  <TrendingUp className="text-primary/70 h-5 w-5" />
                </motion.div>
              )}
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
