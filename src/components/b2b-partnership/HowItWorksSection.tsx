
import React from "react";
import { motion } from "framer-motion";
import { FileText, Link, BadgeDollarSign } from "lucide-react";

const steps = [
  {
    title: "Register as a Partner",
    description: "Fill out the application and get access to your dashboard.",
    icon: <FileText className="h-10 w-10" />
  },
  {
    title: "Connect Your Channel",
    description: "Share your referral link, integrate via API, or embed a widget in your platform.",
    icon: <Link className="h-10 w-10" />
  },
  {
    title: "Track & Earn",
    description: "Watch your referred users convert into claims — and get paid for each successful one.",
    icon: <BadgeDollarSign className="h-10 w-10" />
  }
];

const HowItWorksSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-custom">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Getting started as a CleverClaim business partner is quick and straightforward.
          </p>
        </motion.div>
        
        <div className="relative mt-20">
          {/* Timeline connector */}
          <div className="hidden md:block absolute top-16 left-0 right-0 h-1 bg-blue-100 z-0"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative flex flex-col items-center text-center"
              >
                <div className="bg-primary text-white rounded-full p-4 mb-6 z-10">
                  {step.icon}
                </div>
                <div className="absolute top-14 bg-white text-primary font-bold rounded-full w-8 h-8 flex items-center justify-center border-2 border-primary z-20">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
        
        <motion.div
          className="mt-16 rounded-xl overflow-hidden shadow-xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <img 
            src="/lovable-uploads/ad264c4c-e6f4-4084-b38a-ae8a7a9df2c8.png" 
            alt="Flight Import System" 
            className="w-full h-auto rounded-xl"
          />
          <div className="bg-blue-50 p-6 text-center">
            <h4 className="text-xl font-semibold text-gray-900 mb-2">Easy Flight Data Import</h4>
            <p className="text-gray-600">Upload your customer flight data to quickly identify compensable disruptions</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
