
import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Users, Gavel, Badge, ShieldCheck } from "lucide-react";

const audiences = [
  {
    title: "Independent attorneys",
    icon: <Gavel className="h-10 w-10" />,
    delay: 0.1
  },
  {
    title: "Law firms",
    icon: <Briefcase className="h-10 w-10" />,
    delay: 0.2
  },
  {
    title: "Legal consultants",
    icon: <Users className="h-10 w-10" />,
    delay: 0.3
  },
  {
    title: "Bar association affiliates",
    icon: <Badge className="h-10 w-10" />,
    delay: 0.4
  },
  {
    title: "Claim agents dealing with EU261 cases",
    icon: <ShieldCheck className="h-10 w-10" />,
    delay: 0.5
  }
];

const TargetAudienceSection: React.FC = () => {
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
            Who is this for?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our partnership program is designed for legal professionals who want to expand their practice while helping air passengers get the compensation they deserve.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {audiences.map((item, index) => (
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

export default TargetAudienceSection;
