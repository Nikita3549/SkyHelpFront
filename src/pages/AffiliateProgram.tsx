
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import HeroSection from "@/components/affiliate/HeroSection";
import HowItWorksSection from "@/components/affiliate/HowItWorksSection";
import BenefitsSection from "@/components/affiliate/BenefitsSection";
import EarningsSection from "@/components/affiliate/EarningsSection";
import FaqSection from "@/components/affiliate/FaqSection";
import CallToActionSection from "@/components/affiliate/CallToActionSection";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const AffiliateProgram = () => {
  const { isAuthenticated } = useAuth();
  
  // Refs for scroll navigation
  const howItWorksRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);

  // Scroll to section function
  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <div className="bg-white">
      {/* Navigation Bar with Login/Dashboard Button - REMOVED */}
      
      <HeroSection 
        scrollToSection={scrollToSection} 
        howItWorksRef={howItWorksRef} 
      />
      <HowItWorksSection reference={howItWorksRef} />
      <BenefitsSection />
      <EarningsSection />
      <FaqSection reference={faqRef} />
      <CallToActionSection 
        scrollToSection={scrollToSection} 
        howItWorksRef={howItWorksRef} 
      />
    </div>
  );
};

export default AffiliateProgram;
