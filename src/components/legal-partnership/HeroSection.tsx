
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-white to-blue-50">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=2670')] bg-cover bg-center opacity-[0.05]"></div>
      
      <div className="container-custom relative z-10 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Let's Partner to Bring Justice to Air Passengers
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Join CleverClaim's legal partner network. Refer delayed or cancelled flight cases and earn by helping passengers claim what they're legally entitled to.
            </p>
            
            <Button 
              className="px-8 py-6 text-lg rounded-lg bg-primary hover:bg-primary/90 text-white"
              onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Become a Legal Partner
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
