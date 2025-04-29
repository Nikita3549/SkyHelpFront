
import React from "react";
import { motion } from "framer-motion";
import InfoCard from "@/components/common/InfoCard";
import { Bot, Shield, UserCheck, HeadphonesIcon } from "lucide-react";

const features = [
  {
    title: "Fully automated and AI-powered eligibility engine",
    description: "Our advanced technology accurately determines passenger eligibility for compensation.",
    icon: <Bot size={24} />
  },
  {
    title: "GDPR-compliant, secure data handling",
    description: "All passenger data is handled with strict adherence to privacy regulations.",
    icon: <Shield size={24} />
  },
  {
    title: "Trusted by thousands of passengers",
    description: "Our proven track record and high success rate speaks for itself.",
    icon: <UserCheck size={24} />
  },
  {
    title: "Transparent communication and dedicated account manager",
    description: "Get personalized support and clear communication throughout our partnership.",
    icon: <HeadphonesIcon size={24} />
  }
];

const WhyChooseSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container-custom">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose CleverClaim?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Partner with a platform that delivers results for both you and your customers.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {features.map((feature, index) => (
            <InfoCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              className="bg-white border border-gray-100"
            />
          ))}
        </div>
        
        <motion.div
          className="mt-16 rounded-xl overflow-hidden shadow-xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <img 
            src="/lovable-uploads/03593731-0f02-44d7-8eec-15d47af60109.png" 
            alt="Claims Analytics Dashboard" 
            className="w-full h-auto rounded-xl"
          />
          <div className="bg-blue-50 p-6 text-center">
            <h4 className="text-xl font-semibold text-gray-900 mb-2">Detailed Claims Analytics</h4>
            <p className="text-gray-600">Monitor claim status distribution and compensation by airline</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
