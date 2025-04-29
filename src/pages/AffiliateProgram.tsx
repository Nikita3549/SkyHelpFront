
import React from "react";
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
  
  return (
    <div className="bg-white">
      {/* Navigation Bar with Login/Dashboard Button */}
      <div className="sticky top-16 z-10 bg-white/95 backdrop-blur border-b">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-primary">Affiliate Program</h1>
          <div>
            {isAuthenticated ? (
              <Button asChild>
                <Link to="/affiliate/dashboard">Go to Dashboard</Link>
              </Button>
            ) : (
              <Button asChild>
                <Link to="/affiliate/login">Login</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
      
      <HeroSection />
      <HowItWorksSection />
      <BenefitsSection />
      <EarningsSection />
      <FaqSection />
      <CallToActionSection />
    </div>
  );
};

export default AffiliateProgram;
