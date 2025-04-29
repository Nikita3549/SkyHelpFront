
import React from "react";
import { motion } from "framer-motion";
import { Plane, Building, Briefcase, Shield, BadgeDollarSign, Link } from "lucide-react";

const partnerTypes = [
  {
    title: "Travel agencies and tour operators",
    icon: <Plane className="h-10 w-10" />,
    delay: 0.1
  },
  {
    title: "Airline ticket sellers and OTAs",
    icon: <Building className="h-10 w-10" />,
    delay: 0.2
  },
  {
    title: "Business travel platforms",
    icon: <Briefcase className="h-10 w-10" />,
    delay: 0.3
  },
  {
    title: "Travel insurance companies",
    icon: <Shield className="h-10 w-10" />,
    delay: 0.4
  },
  {
    title: "Loyalty programs and cashback platforms",
    icon: <BadgeDollarSign className="h-10 w-10" />,
    delay: 0.5
  },
  {
    title: "Large content or service platforms in travel",
    icon: <Link className="h-10 w-10" />,
    delay: 0.6
  }
];

const PartnerTypesSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-blue-50">
      <div className="container-custom">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Who Can Partner With Us?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            CleverClaim works with a variety of businesses in the travel industry and beyond.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {partnerTypes.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: item.delay }}
              className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="bg-blue-100 rounded-full p-4 mb-4 text-primary">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnerTypesSection;
