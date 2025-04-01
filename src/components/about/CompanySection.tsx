
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import InfoCard from "../common/InfoCard";

const CompanySection = () => {
  const companyValues = [
    {
      title: "Expertise",
      description: "Our team includes legal experts specialized in air passenger rights who understand the intricacies of regulations like EU 261/2004."
    },
    {
      title: "Technology",
      description: "We've developed proprietary technology that automates claim eligibility checks and streamlines the compensation process."
    },
    {
      title: "Transparency",
      description: "We believe in being transparent about our process and fees, ensuring our customers always know what to expect."
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Company</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Founded in 2018, CleverClaim has grown from a small startup to a leading advocate for passenger rights. Our team of legal experts and tech professionals work together to make claiming compensation as simple as possible.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {companyValues.map((item, index) => (
            <InfoCard
              key={index}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full hover:bg-blue-600 transition-colors shadow-md"
          >
            Contact Us
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CompanySection;
