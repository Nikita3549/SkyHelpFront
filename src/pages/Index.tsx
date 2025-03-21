import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, ChevronRight, Plane, Clock, FileText, CreditCard, AlertCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import AnimatedButton from "@/components/ui-custom/AnimatedButton";

const Index = () => {
  // Animation variants for staggered animations
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 24 } },
  };

  // Create refs for scroll targets
  const howItWorksRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);

  // Handle hash navigation on load
  useEffect(() => {
    if (window.location.hash === "#how-it-works" && howItWorksRef.current) {
      howItWorksRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (window.location.hash === "#faq" && faqRef.current) {
      faqRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

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
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-gradient-to-br from-white to-blue-50 pt-16">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1595674617530-78147adbb393?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=2670')] bg-cover bg-center opacity-[0.03]"></div>
        
        <div className="container-custom relative z-10 py-20 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-primary text-sm font-medium mb-2"
              >
                <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
                EU Regulation 261/2004
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance"
              >
                Get up to <span className="text-primary">€600</span> for your delayed flight
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-lg text-gray-600 max-w-xl"
              >
                No paperwork. No hassle. We handle your flight compensation claim from start to finish on a no-win, no-fee basis.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="flex flex-wrap gap-4 pt-4"
              >
                <Link
                  to="/claim"
                  className="px-6 py-3 rounded-full font-medium bg-primary text-white hover:bg-blue-600 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
                >
                  Check Your Eligibility
                </Link>
                
                <Link
                  to="/#how-it-works"
                  className="px-6 py-3 rounded-full font-medium border border-gray-200 text-gray-600 hover:text-primary hover:border-primary/20 transition-all shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2"
                >
                  How It Works
                </Link>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="pt-8"
              >
                <p className="text-sm text-gray-500 mb-3">Trusted by thousands of passengers</p>
                <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                  <div className="bg-white rounded-lg shadow-sm px-3 py-2 text-gray-400">
                    <span className="sr-only">Airline 1</span>
                    <svg className="h-6 sm:h-8" viewBox="0 0 84 24" fill="currentColor">
                      <path d="M12.4 2L2 22h5.6l2.4-5h9.6l2.4 5h5.6L18 2h-5.6zm3.2 11H11l2.4-6 2.4 6H15.6zM33 22l-9-20h-2L13 22h2.8l1.8-4h6.8l1.8 4H33zm-7.6-7h-4.8L23 9l2.4 6z" />
                      <path d="M47 9c0-2.8-2.2-5-5-5h-8v18h2v-8h6c2.8 0 5-2.2 5-5zm-4 0c0 1.1-.9 2-2 2h-5V7h5c1.1 0 2 .9 2 2zM55 22h-8V4h8c2.8 0 5 2.2 5 5v8c0 2.8-2.2 5-5 5zm2-13c0-1.1-.9-2-2-2h-5v12h5c1.1 0 2-.9 2-2V9z" />
                      <path d="M67 22h-8V4h8c2.8 0 5 2.2 5 5v8c0 2.8-2.2 5-5 5zm2-13c0-1.1-.9-2-2-2h-5v12h5c1.1 0 2-.9 2-2V9z" />
                    </svg>
                  </div>
                  <div className="bg-white rounded-lg shadow-sm px-3 py-2 text-gray-400">
                    <span className="sr-only">Airline 2</span>
                    <svg className="h-6 sm:h-8" viewBox="0 0 100 24" fill="currentColor">
                      <path d="M14 2C7.4 2 2 7.4 2 14s5.4 12 12 12 12-5.4 12-12S20.6 2 14 2zm0 21c-5 0-9-4-9-9s4-9 9-9 9 4 9 9-4 9-9 9z" />
                      <path d="M14 7v7h7v-3h-4V7h-3zM35 2c-6.6 0-12 5.4-12 12s5.4 12 12 12 12-5.4 12-12S41.6 2 35 2zm0 21c-5 0-9-4-9-9s4-9 9-9 9 4 9 9-4 9-9 9z" />
                      <path d="M42 11h-4V7h-3v7h7v-3zM56 2c-6.6 0-12 5.4-12 12s5.4 12 12 12 12-5.4 12-12S62.6 2 56 2zm0 21c-5 0-9-4-9-9s4-9 9-9 9 4 9 9-4 9-9 9z" />
                      <path d="M63 11h-4V7h-3v7h7v-3zM77 2c-6.6 0-12 5.4-12 12s5.4 12 12 12 12-5.4 12-12S83.6 2 77 2zm0 21c-5 0-9-4-9-9s4-9 9-9 9 4 9 9-4 9-9 9z" />
                      <path d="M84 11h-4V7h-3v7h7v-3z" />
                    </svg>
                  </div>
                  <div className="bg-white rounded-lg shadow-sm px-3 py-2 text-gray-400">
                    <span className="sr-only">Airline 3</span>
                    <svg className="h-6 sm:h-8" viewBox="0 0 84 24" fill="currentColor">
                      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z" />
                      <path d="M12 6v6h6v-2h-4V6h-2zM34 2H24v20h10c5.5 0 10-4.5 10-10S39.5 2 34 2zm0 18h-8V4h8c4.4 0 8 3.6 8 8s-3.6 8-8 8z" />
                      <path d="M58 12l-6-8h-4v16h2V8l6 8 6-8v12h2V4h-4l-6 8z" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="glass rounded-2xl p-6 md:p-8 shadow-xl">
                <div className="flex flex-col space-y-5">
                  <h3 className="text-xl font-medium text-gray-800">Check your eligibility</h3>
                  <div className="grid gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Flight Number</label>
                      <input 
                        type="text" 
                        placeholder="e.g., BA1234" 
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Flight Date</label>
                      <input 
                        type="date"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                  </div>
                  
                  <Link 
                    to="/claim" 
                    className="w-full px-4 py-3 bg-primary text-white rounded-lg font-medium hover:bg-blue-600 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5 text-center"
                  >
                    Check Now
                  </Link>
                  
                  <div className="text-xs text-gray-500 space-y-2 pt-2">
                    <p className="flex items-start">
                      <Check className="h-4 w-4 text-primary flex-shrink-0 mr-1.5 mt-0.5" />
                      <span>No obligation to continue after checking</span>
                    </p>
                    <p className="flex items-start">
                      <Check className="h-4 w-4 text-primary flex-shrink-0 mr-1.5 mt-0.5" />
                      <span>No-win, no-fee — only pay if we win your case</span>
                    </p>
                    <p className="flex items-start">
                      <Check className="h-4 w-4 text-primary flex-shrink-0 mr-1.5 mt-0.5" />
                      <span>We handle the entire claim process for you</span>
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-blue-500/10 rounded-full animate-float" />
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary/10 rounded-full animate-float" style={{animationDelay: '1s'}} />
            </motion.div>
          </div>
        </div>
        
        {/* Stats Section */}
        <div className="container-custom relative z-10 py-8 md:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="glass rounded-xl p-6 shadow-lg"
            >
              <h4 className="text-4xl font-bold text-primary">€600</h4>
              <p className="text-gray-600 mt-2">Maximum compensation per passenger</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="glass rounded-xl p-6 shadow-lg"
            >
              <h4 className="text-4xl font-bold text-primary">94%</h4>
              <p className="text-gray-600 mt-2">Success rate on valid claims</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="glass rounded-xl p-6 shadow-lg"
            >
              <h4 className="text-4xl font-bold text-primary">3 min</h4>
              <p className="text-gray-600 mt-2">Average time to check eligibility</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="glass rounded-xl p-6 shadow-lg"
            >
              <h4 className="text-4xl font-bold text-primary">€2.8M</h4>
              <p className="text-gray-600 mt-2">Recovered for our customers</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section ref={howItWorksRef} id="how-it-works" className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl sm:text-4xl font-bold mb-4"
            >
              How It Works
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-gray-600"
            >
              We've simplified the compensation process to just three easy steps.
            </motion.p>
          </div>
          
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={container}
            className="grid grid-cols-1 md:grid-cols-3 gap-10"
          >
            <motion.div variants={item} className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-5">
                <Plane className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">1. Submit Your Flight Details</h3>
              <p className="text-gray-600">Enter your flight information in our simple form. We'll check if you're eligible for compensation under EU Regulation 261/2004.</p>
            </motion.div>
            
            <motion.div variants={item} className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-5">
                <FileText className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">2. We Handle The Paperwork</h3>
              <p className="text-gray-600">Our team prepares all necessary legal documents, submits your claim to the airline, and handles all communication.</p>
            </motion.div>
            
            <motion.div variants={item} className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-5">
                <CreditCard className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">3. Receive Your Compensation</h3>
              <p className="text-gray-600">Once the airline approves your claim, we transfer the compensation directly to your preferred payment method.</p>
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-16 text-center"
          >
            <AnimatedButton to="/claim" variant="primary" size="lg">
              Start Your Claim Now
            </AnimatedButton>
          </motion.div>
        </div>
      </section>

      {/* Eligibility Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <h2 className="text-3xl sm:text-4xl font-bold">When Are You Eligible For Compensation?</h2>
              <p className="text-lg text-gray-600">
                Under EU Regulation 261/2004, you may be entitled to compensation if your flight has been:
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <div className="ml-3">
                    <h3 className="font-medium text-gray-900">Delayed by more than 3 hours</h3>
                    <p className="text-gray-600 mt-1">If you reached your final destination with a delay of more than 3 hours.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <div className="ml-3">
                    <h3 className="font-medium text-gray-900">Cancelled without notice</h3>
                    <p className="text-gray-600 mt-1">If your flight was cancelled less than 14 days before departure.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <div className="ml-3">
                    <h3 className="font-medium text-gray-900">Denied boarding</h3>
                    <p className="text-gray-600 mt-1">If you were involuntarily denied boarding due to overbooking.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <div className="ml-3">
                    <h3 className="font-medium text-gray-900">Missed connection</h3>
                    <p className="text-gray-600 mt-1">If you missed a connecting flight due to a delay in your first flight.</p>
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-gray-500 italic">
                Note: 'Extraordinary circumstances' such as severe weather conditions or security risks may exempt airlines from paying compensation.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass rounded-2xl p-8 shadow-xl"
            >
              <h3 className="text-xl font-medium mb-6">Compensation Amounts</h3>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                  <div className="space-y-1">
                    <p className="font-medium">Short Distance</p>
                    <p className="text-sm text-gray-600">Flights up to 1,500 km</p>
                  </div>
                  <div className="text-2xl font-bold text-primary">€250</div>
                </div>
                
                <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                  <div className="space-y-1">
                    <p className="font-medium">Medium Distance</p>
                    <p className="text-sm text-gray-600">Flights between 1,500 km and 3,500 km</p>
                  </div>
                  <div className="text-2xl font-bold text-primary">€400</div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-medium">Long Distance</p>
                    <p className="text-sm text-gray-600">Flights over 3,500 km</p>
                  </div>
                  <div className="text-2xl font-bold text-primary">€600</div>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5 mr-3" />
                  <p className="text-sm text-gray-600">
                    The compensation amount is fixed regardless of your ticket price and may be reduced by 50% if the airline offered you an alternative flight that arrived close to your original arrival time.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl sm:text-4xl font-bold mb-4"
            >
              Success Stories
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-gray-600"
            >
              Thousands of passengers have successfully claimed compensation with our help. Here are some of their stories.
            </motion.p>
          </div>
          
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={container}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <motion.div variants={item} className="glass rounded-xl p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-primary font-medium">JD</span>
                </div>
                <div className="ml-3">
                  <h4 className="font-medium">James Davis</h4>
                  <p className="text-sm text-gray-500">London to Rome</p>
                </div>
              </div>
              <p className="text-gray-600">
                "My flight was delayed by 4 hours due to a technical issue. FlightEaseClaim handled everything and I received €400 compensation within 6 weeks. Excellent service!"
              </p>
              <div className="mt-4 flex text-primary">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
              </div>
            </motion.div>
            
            <motion.div variants={item} className="glass rounded-xl p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-primary font-medium">SM</span>
                </div>
                <div className="ml-3">
                  <h4 className="font-medium">Sophie Martinez</h4>
                  <p className="text-sm text-gray-500">Berlin to Madrid</p>
                </div>
              </div>
              <p className="text-gray-600">
                "The airline cancelled my flight just a day before departure. I submitted my claim with FlightEaseClaim and received €600 compensation without any hassle. I'm very impressed!"
              </p>
              <div className="mt-4 flex text-primary">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
              </div>
            </motion.div>
            
            <motion.div variants={item} className="glass rounded-xl p-6 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-primary font-medium">AK</span>
                </div>
                <div className="ml-3">
                  <h4 className="font-medium">Alexander Kruger</h4>
                  <p className="text-sm text-gray-500">Paris to Stockholm</p>
                </div>
              </div>
              <p className="text-gray-600">
                "I was denied boarding due to overbooking. The airline initially refused my claim, but FlightEaseClaim managed to get me €400 in compensation after appealing. Great persistence!"
              </p>
              <div className="mt-4 flex text-primary">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section ref={faqRef} id="faq" className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-gray-600">
                Everything you need to know about flight compensation and our services.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-2 md:p-6"
            >
              <Accordion type="single" collapsible className="space-y-2">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border border-gray-100 rounded-lg px-4 py-2 mb-2">
                    <AccordionTrigger className="text-left font-medium hover:text-primary hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 pt-2 pb-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-12 text-center"
            >
              <p className="text-gray-600 mb-4">Still have questions?</p>
              <a 
                href="mailto:support@cleverclaim.com" 
                className="text-primary hover:text-blue-600 font-medium flex items-center justify-center transition-colors"
              >
                Contact our support team
                <ChevronRight className="h-4 w-4 ml-1" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/90 to-blue-600/90 text-white">
        <div className="container-custom">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to claim your compensation?</h2>
            <p className="text-lg text-white/80 mb-8">
              Check if you're eligible for up to €600 in compensation for your delayed or cancelled flight. No win, no fee.
            </p>
            <Link
              to="/claim"
              className="inline-flex items-center px-8 py-4 rounded-full bg-white text-primary font-medium hover:bg-opacity-95 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-primary"
            >
              Start Your Claim Now
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Index;
