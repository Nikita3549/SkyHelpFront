
import React from "react";
import { motion } from "framer-motion";
import { BadgeCheck, FileText, Award, Share } from "lucide-react";

const BenefitsSection: React.FC = () => {
  const benefits = [
    {
      title: "Easy Registration",
      description: "Easy and fast registration — no bureaucracy",
      icon: <BadgeCheck className="h-6 w-6" />
    },
    {
      title: "Personal Dashboard",
      description: "Personal dashboard to track clicks and payouts",
      icon: <FileText className="h-6 w-6" />
    },
    {
      title: "Regular Payouts",
      description: "Regular payouts (once a month)",
      icon: <Award className="h-6 w-6" />
    },
    {
      title: "High Conversion Rates",
      description: "High conversion rates thanks to CleverClaim's trusted brand",
      icon: <Share className="h-6 w-6" />
    },
    {
      title: "Promotional Materials",
      description: "Access to ready-to-use promotional materials: banners, texts, post templates",
      icon: <FileText className="h-6 w-6" />
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-bold mb-4"
          >
            Benefits for Partners
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-600"
          >
            Join the CleverClaim affiliate program and enjoy these benefits
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-[#D3E4FD] p-3 rounded-lg">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-medium">{benefit.title}</h3>
              </div>
              <p className="text-gray-600">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
