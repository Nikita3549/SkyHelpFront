import React from 'react';
import { motion } from 'framer-motion';
import InfoCard from '@/components/common/InfoCard';
import { FileCheck, FileLock, Euro, Shield } from 'lucide-react';

const techFeatures = [
  {
    title: 'Automation, legal logic & AI',
    description:
      'Our platform uses advanced technology to automate claim processing while ensuring legal accuracy.',
    icon: <FileCheck size={24} />,
  },
  {
    title: 'GDPR-compliant data processing',
    description:
      'All passenger data is handled securely in compliance with GDPR requirements.',
    icon: <FileLock size={24} />,
  },
  {
    title: 'eSignature integration',
    description:
      'Seamless document signing process for your clients with legally binding digital signatures.',
    icon: <Euro size={24} />,
  },
  {
    title: 'Custom legal document generation',
    description:
      "Automatically generate necessary legal documents tailored to each case's specific requirements.",
    icon: <Shield size={24} />,
  },
];

const TechnologySection: React.FC = () => {
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
            Trusted Technology
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our platform is built with robust technology that lawyers can trust.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {techFeatures.map((feature, index) => (
            <InfoCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              className="bg-white border border-gray-100"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnologySection;
