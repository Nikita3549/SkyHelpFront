
import React from "react";
import { motion } from "framer-motion";
import { Shield, Globe, Euro, TurkishLira, BrazilianReal, MontrealConvention } from "lucide-react";

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
      icon: Euro,
      color: "bg-blue-100",
      borderColor: "border-blue-200",
      iconColor: "text-blue-600",
      flagClass: "before:content-[''] before:absolute before:inset-0 before:bg-[url('/public/lovable-uploads/844228aa-d90a-40f3-8239-3ec6115ee0f6.png')] before:bg-[length:64px_64px] before:bg-no-repeat before:bg-[0px_0px] before:opacity-20",
    },
    {
      title: "Turkish Regulations",
      icon: TurkishLira,
      color: "bg-red-100",
      borderColor: "border-red-200",
      iconColor: "text-red-600",
      flagClass: "before:content-[''] before:absolute before:inset-0 before:bg-[url('/public/lovable-uploads/844228aa-d90a-40f3-8239-3ec6115ee0f6.png')] before:bg-no-repeat before:bg-[length:64px_64px] before:bg-[-64px_0px] before:opacity-20",
    },
    {
      title: "Brazilian Regulations",
      icon: BrazilianReal,
      color: "bg-green-100",
      borderColor: "border-green-200",
      iconColor: "text-green-600",
      flagClass: "before:content-[''] before:absolute before:inset-0 before:bg-[url('/public/lovable-uploads/844228aa-d90a-40f3-8239-3ec6115ee0f6.png')] before:bg-no-repeat before:bg-[length:64px_64px] before:bg-[0px_-64px] before:opacity-20",
    },
    {
      title: "Montreal Convention",
      icon: Globe,
      color: "bg-indigo-100",
      borderColor: "border-indigo-200",
      iconColor: "text-indigo-600",
      flagClass: "before:content-[''] before:absolute before:inset-0 before:bg-[url('/public/lovable-uploads/844228aa-d90a-40f3-8239-3ec6115ee0f6.png')] before:bg-no-repeat before:bg-[length:64px_64px] before:bg-[-64px_-64px] before:opacity-20",
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
              className={`relative rounded-xl p-6 border ${reg.borderColor} ${reg.color} ${reg.flagClass} overflow-hidden`}
            >
              <div className="relative z-10 flex flex-col items-center">
                <div className={`p-3 rounded-full mb-4 ${reg.color} ${reg.iconColor}`}>
                  <reg.icon size={24} />
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
