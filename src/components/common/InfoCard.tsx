import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface InfoCardProps {
  icon?: ReactNode;
  title: string;
  description: string;
  className?: string;
}

const InfoCard = ({
  icon,
  title,
  description,
  className = '',
}: InfoCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={`bg-blue-50 p-6 rounded-xl border border-blue-100 ${className}`}
    >
      {icon && (
        <div className="flex items-start gap-4 mb-4">
          <div className="bg-primary p-3 rounded-lg text-white">{icon}</div>
        </div>
      )}
      <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-700">{description}</p>
    </motion.div>
  );
};

export default InfoCard;
