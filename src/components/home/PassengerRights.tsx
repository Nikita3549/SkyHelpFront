
import React from "react";
import { motion } from "framer-motion";
import { Shield } from "lucide-react";

const PassengerRights = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Regulations data
  const regulations = [
    {
      title: "EU Regulation EC 261",
      flagImage: "/lovable-uploads/5b13fe1b-e415-4ceb-8e01-454b5a7b81c8.png",
      color: "bg-blue-100",
      borderColor: "border-blue-200",
      iconColor: "text-blue-600",
    },
    {
      title: "Turkish Regulations",
      flagImage: "/lovable-uploads/7aca5341-11a6-4da2-bf15-f80c88d80cae.png",
      color: "bg-red-100",
      borderColor: "border-red-200",
      iconColor: "text-red-600",
    },
    {
      title: "Montreal Convention",
      flagImage: "/lovable-uploads/414f54f0-1c7c-4a66-847c-9ef17765d4b7.png",
      color: "bg-indigo-100",
      borderColor: "border-indigo-200",
      iconColor: "text-indigo-600",
    },
    {
      title: "Brazilian Regulations",
      flagImage: "/lovable-uploads/320f827c-287a-42c7-9eab-85dfc5fe8039.png",
      color: "bg-green-100",
      borderColor: "border-green-200",
      iconColor: "text-green-600",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <Shield className="text-green-500 w-8 h-8 mr-2" />
            <h2 className="text-3xl font-bold">We protect your rights</h2>
          </div>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Our expertise covers various international regulations to ensure you receive the compensation you're entitled to, no matter where you fly.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {regulations.map((reg, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className={`relative rounded-xl p-6 border ${reg.borderColor} ${reg.color} overflow-hidden`}
            >
              <div className="relative z-10 flex flex-col items-center">
                <div className={`p-3 mb-4 ${reg.color} ${reg.iconColor} w-16 h-16 flex items-center justify-center`}>
                  <img 
                    src={reg.flagImage} 
                    alt={`${reg.title} flag`} 
                    className="w-10 h-10 object-cover" 
                  />
                </div>
                <h3 className="font-semibold text-gray-800 text-lg mb-1">{reg.title}</h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PassengerRights;
