import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Plane } from 'lucide-react';

const SubmitButtonSection: React.FC = () => {
  return (
    <div className="relative">
      <Button
        type="submit"
        className="w-full md:w-auto md:ml-auto md:block bg-primary hover:bg-primary/90 text-white py-3 px-8 rounded-md font-medium"
      >
        Send your message
      </Button>

      <motion.div
        className="absolute -right-8 -top-6 hidden md:block"
        animate={{
          y: [0, -5, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      >
        <div className="bg-[#D3E4FD] rounded-full p-2 shadow-sm">
          <Plane size={20} strokeWidth={2} className="text-gray-800" />
        </div>
      </motion.div>
    </div>
  );
};

export default SubmitButtonSection;
