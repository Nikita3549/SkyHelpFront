import React from 'react';
import HeroSection from '@/components/legal-partnership/HeroSection';
import BenefitsSection from '@/components/legal-partnership/BenefitsSection';
import TargetAudienceSection from '@/components/legal-partnership/TargetAudienceSection';
import HowItWorksSection from '@/components/legal-partnership/HowItWorksSection';
import TechnologySection from '@/components/legal-partnership/TechnologySection';
import FaqSection from '@/components/legal-partnership/FaqSection';
import CtaSection from '@/components/legal-partnership/CtaSection';

const LegalPartnership: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <HeroSection />
      <BenefitsSection />
      <TargetAudienceSection />
      <HowItWorksSection />
      <TechnologySection />
      <FaqSection />
      <CtaSection />
    </div>
  );
};

export default LegalPartnership;
