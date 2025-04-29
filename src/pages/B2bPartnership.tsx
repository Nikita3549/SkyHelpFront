
import React from "react";
import HeroSection from "@/components/b2b-partnership/HeroSection";
import PartnerTypesSection from "@/components/b2b-partnership/PartnerTypesSection";
import BenefitsSection from "@/components/b2b-partnership/BenefitsSection";
import HowItWorksSection from "@/components/b2b-partnership/HowItWorksSection";
import WhyChooseSection from "@/components/b2b-partnership/WhyChooseSection";
import CtaSection from "@/components/b2b-partnership/CtaSection";

const B2bPartnership: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <HeroSection />
      <PartnerTypesSection />
      <BenefitsSection />
      <HowItWorksSection />
      <WhyChooseSection />
      <CtaSection />
    </div>
  );
};

export default B2bPartnership;
