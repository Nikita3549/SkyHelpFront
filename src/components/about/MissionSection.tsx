
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Users } from "lucide-react";
import { Link } from "react-router-dom";
import InfoCard from "../common/InfoCard";

const MissionSection = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Company</h2>
            <p className="text-base text-gray-700 mb-4">
              Founded in 2018, CleverClaim has grown from a small startup to a leading advocate for passenger rights. Our team of legal experts and tech professionals work together to make claiming compensation as simple as possible.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-8">Our Mission</h2>
            <p className="text-base text-gray-700 mb-4">
              At CleverClaim, we believe that air passengers deserve fair compensation when their flight plans are disrupted. Our mission is to simplify the complex process of claiming compensation, making it accessible to everyone.
            </p>
            <p className="text-base text-gray-700 mb-4">
              We're on a journey to transform how passengers navigate their rights, using technology to automate and streamline what was once a frustrating, time-consuming process.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <p className="font-semibold text-primary">Learn about passenger rights</p>
              <Link to="/#passenger-rights" className="bg-primary text-white p-2 rounded-full">
                <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="space-y-5"
          >
            <InfoCard 
              customIcon={
                <div className="flex items-center justify-center w-12 h-12">
                  <img 
                    src="/lovable-uploads/5453978d-0746-4fd7-8dcd-8380620e1601.png" 
                    alt="APRA Logo" 
                    className="h-8 w-auto" 
                  />
                </div>
              }
              title="Part of APRA"
              description="CleverClaim is a member of the Association of Passenger Rights Advocates (APRA), whose mission is to promote and protect passengers' rights worldwide."
            />
            
            <InfoCard 
              icon={<Users size={24} />}
              title="Passenger-First Approach"
              description="We put passengers first, ensuring they receive the compensation they're entitled to with minimal effort on their part."
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
