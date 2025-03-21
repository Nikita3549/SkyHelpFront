
import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Hero from "@/components/home/Hero";
import Stats from "@/components/home/Stats";
import QuickEligibilityCheck from "@/components/home/QuickEligibilityCheck";
import HowItWorks from "@/components/home/HowItWorks";
import Eligibility from "@/components/home/Eligibility";
import Testimonials from "@/components/home/Testimonials";
import Faq from "@/components/home/Faq";
import Cta from "@/components/home/Cta";

const Index = () => {
  // Create refs for scroll targets
  const howItWorksRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Handle hash navigation on load and when location changes
  useEffect(() => {
    const handleScroll = () => {
      const hash = window.location.hash;
      if (hash === "#how-it-works" && howItWorksRef.current) {
        howItWorksRef.current.scrollIntoView({ behavior: "smooth" });
      } else if (hash === "#faq" && faqRef.current) {
        faqRef.current.scrollIntoView({ behavior: "smooth" });
      }
    };

    // Check for hash in URL
    handleScroll();

    // Check for scrollTo in location state (from navigation)
    if (location.state && location.state.scrollTo) {
      const elementId = location.state.scrollTo;
      setTimeout(() => {
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);  // Небольшая задержка для уверенности, что компоненты отрендерились
    }
  }, [location]);

  // FAQs data
  const faqs = [
    {
      question: "What is EU Regulation 261/2004?",
      answer: "EU Regulation 261/2004 is a European law that establishes common rules on compensation and assistance to passengers in the event of denied boarding, flight cancellations, or long delays. It applies to all flights departing from an EU airport and flights arriving in the EU with an EU-based carrier."
    },
    {
      question: "How much compensation can I claim?",
      answer: "Under EU Regulation 261/2004, you may be entitled to: €250 for flights up to 1,500 km, €400 for flights between 1,500 and 3,500 km, and €600 for flights over 3,500 km. The exact amount depends on the distance of your flight and the length of the delay."
    },
    {
      question: "What flight problems are eligible for compensation?",
      answer: "You may be eligible for compensation if your flight was: Cancelled without sufficient notice, Delayed by more than 3 hours at the final destination, or if you were denied boarding due to overbooking. Note that extraordinary circumstances like severe weather or security risks may exempt airlines from paying compensation."
    },
    {
      question: "How far back can I claim compensation?",
      answer: "The time limit for filing claims varies by country. In most EU countries, you can claim for flights within the past 2-3 years. Some countries like the UK allow claims up to 6 years back."
    },
    {
      question: "How does CleverClaim process my claim?",
      answer: "We collect your flight details and verify eligibility. If eligible, we handle all communication with the airline, from submitting the initial claim to negotiating your compensation. We keep you updated throughout the process, and once we receive the compensation, we transfer your share directly to your account."
    },
    {
      question: "What does CleverClaim charge?",
      answer: "We work on a no-win, no-fee basis. If we don't secure your compensation, you pay nothing. If we succeed, we take a 25% commission (plus VAT where applicable) from the compensation amount."
    },
    {
      question: "What information do I need to provide?",
      answer: "To process your claim, we need: Your flight details (number, date, route), Booking reference, Your personal information, A description of what happened, and Any relevant documentation you have (boarding passes, emails from the airline, etc.)."
    }
  ];

  return (
    <>
      <Hero />
      <QuickEligibilityCheck />
      <Stats />
      <HowItWorks howItWorksRef={howItWorksRef} />
      <Eligibility />
      <Testimonials />
      <Faq faqRef={faqRef} faqs={faqs} />
      <Cta />
    </>
  );
};

export default Index;
