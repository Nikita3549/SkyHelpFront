
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CtaSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center" id="contact-form">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Ready to grow your legal practice while helping passengers get what they deserve?
            </h2>
            <p className="text-xl text-gray-600 mb-10">
              Join SkyHelp's growing network of legal professionals.
            </p>
            
            <form className="max-w-lg mx-auto space-y-6 text-left">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">First Name</label>
                  <input 
                    type="text" 
                    id="first-name" 
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" 
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">Last Name</label>
                  <input 
                    type="text" 
                    id="last-name" 
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" 
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" 
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="organization" className="block text-sm font-medium text-gray-700">Organization</label>
                <input 
                  type="text" 
                  id="organization" 
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" 
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message (Optional)</label>
                <textarea 
                  id="message" 
                  rows={4} 
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                ></textarea>
              </div>
              
              <div className="pt-4">
                <Button type="submit" className="w-full py-6 text-lg rounded-lg bg-primary hover:bg-primary/90 text-white">
                  Become a Legal Partner
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
