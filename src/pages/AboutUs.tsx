
import React from "react";
import HeroSection from "@/components/about/HeroSection";
import VideoSection from "@/components/about/VideoSection";
import MissionSection from "@/components/about/MissionSection";
import StatsSection from "@/components/about/StatsSection";
import CompanySection from "@/components/about/CompanySection";

const AboutUs = () => {
  return (
    <div className="pt-16">
      {/* Hero section */}
      <HeroSection />
      
      {/* Video section */}
      <VideoSection />
      
      {/* Mission section */}
      <MissionSection />
      
      {/* Stats section */}
      <StatsSection />
      
      {/* Team/Company section */}
      <CompanySection />
    </div>
  );
};

export default AboutUs;
