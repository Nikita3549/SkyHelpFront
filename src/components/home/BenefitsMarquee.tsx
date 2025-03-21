
import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Marquee from "@/components/ui-custom/Marquee";

const BenefitsMarquee = () => {
  return (
    <section className="py-4 bg-blue-50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Marquee 
            className="h-12 rounded-lg border border-blue-100 shadow-sm bg-white" 
            speed={40}
            pauseDuration={3000}
          >
            <div className="flex items-center space-x-10 py-2 px-6 text-gray-700 font-medium">
              <span className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                Claim old flights up to 3 years
              </span>
              <span className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                No fees for checking eligibility
              </span>
              <span className="flex items-center">
                <Check className="h-5 w-5 text-green-500 mr-2" />
                Quick and free eligibility check
              </span>
            </div>
          </Marquee>
        </motion.div>
      </div>
    </section>
  );
};

export default BenefitsMarquee;
