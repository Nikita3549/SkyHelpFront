
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import AnimatedButton from "@/components/ui-custom/AnimatedButton";

interface CallToActionSectionProps {
  scrollToSection: (ref: React.RefObject<HTMLDivElement>) => void;
  howItWorksRef: React.RefObject<HTMLDivElement>;
}

const CallToActionSection: React.FC<CallToActionSectionProps> = ({ scrollToSection, howItWorksRef }) => {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    window.scrollTo(0, 0);
    navigate("/affiliate/register");
  };

  return (
    <section className="py-20 bg-gradient-to-br from-primary/90 to-blue-600/90 text-white">
      <div className="container-custom">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Join the SkyHelp network today!</h2>
          <p className="text-lg text-white/90 mb-8">
            Start earning by helping others get their flight compensations. Our program is designed to reward you generously for every successful referral.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={handleRegisterClick}
              className="px-6 py-3 rounded-full font-medium bg-white text-primary hover:bg-blue-50 transition-all focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-primary"
            >
              Become a SkyHelp Partner
            </button>
            <button
              onClick={() => scrollToSection(howItWorksRef)}
              className="px-6 py-3 rounded-full font-medium border border-white/30 text-white hover:bg-white/10 transition-all focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-primary"
            >
              Learn More
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToActionSection;
