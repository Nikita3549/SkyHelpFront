import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Clock } from 'lucide-react';
const ContactInfo = () => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
      }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-4xl font-bold mb-2">
          <span className="text-primary">Contact</span> form
        </h1>
        <h2 className="text-2xl font-medium text-gray-700 mb-6">
          HIT US WITH A MESSAGE
        </h2>
        <p className="text-gray-600">
          Alternatively, you can use the following contact form to send us a
          message. One of our operators will get in touch with you regarding the
          information you need.
        </p>
      </div>

      <div className="space-y-4 mt-8">
        <div className="flex items-center space-x-3 text-gray-700">
          <Mail className="w-5 h-5 text-primary" />
          <span>support@skyhelp.md</span>
        </div>
        <div className="flex items-center space-x-3 text-gray-700">
          <Phone className="w-5 h-5 text-primary" />
          <span>+373 797 787 00</span>
        </div>
        <div className="flex items-center space-x-3 text-gray-700">
          <Clock className="w-5 h-5 text-primary" />
          <span>Monday - Friday, 9:00 - 17:00</span>
        </div>
      </div>
    </motion.div>
  );
};
export default ContactInfo;
