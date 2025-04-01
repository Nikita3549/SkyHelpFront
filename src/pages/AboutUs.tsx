
import React from "react";
import HeroSection from "@/components/about/HeroSection";
import VideoSection from "@/components/about/VideoSection";
import StatsSection from "@/components/about/StatsSection";
import MissionSection from "@/components/about/MissionSection";
import CompanySection from "@/components/about/CompanySection";
import TechSection from "@/components/about/TechSection";
import TeamSection from "@/components/about/TeamSection";

const AboutUs = () => {
  return (
    <div className="pt-16">
      {/* Hero section */}
      <HeroSection />
      
      {/* Video section */}
      <VideoSection />
      
      {/* Stats section - moved here as requested */}
      <StatsSection />
      
      {/* Mission section */}
      <MissionSection />
      
      {/* Team section */}
      <TeamSection />
      
      {/* Tech section */}
      <TechSection />
      
      {/* Team/Company section */}
      <CompanySection />
    </div>
  );
};

export default AboutUs;
