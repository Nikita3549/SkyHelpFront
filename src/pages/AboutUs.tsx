
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Award, BarChart3, Clock, PlaneTakeoff, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const AboutUs = () => {
  const [isVideoExpanded, setIsVideoExpanded] = useState(false);

  return (
    <div className="pt-16">
      {/* Hero section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              <span className="text-primary">About Us</span>
            </h1>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              CleverClaim - Your Trusted Flight Disruption Companion
            </h2>
            
            {/* Trustpilot Rating */}
            <div className="flex items-center justify-center mt-8 bg-white p-4 rounded-lg shadow-sm">
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <span className="font-medium text-gray-700">Excellent</span>
                <div className="flex">
                  <img src="/lovable-uploads/5f38c0aa-45f7-4d7f-94c8-a9b7889ec866.png" alt="Trustpilot rating" className="h-8" />
                </div>
                <span className="text-sm text-gray-500">211,850 reviews on</span>
                <span className="font-medium flex items-center">
                  <span className="text-[#00b67a] mr-1">★</span> Trustpilot
                </span>
              </div>
            </div>
          </motion.div>

          {/* Video section with expand functionality */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="rounded-xl overflow-hidden shadow-2xl mb-16"
          >
            <div 
              className={`relative w-full transition-all duration-500 ease-in-out ${isVideoExpanded ? 'aspect-video' : 'h-[300px]'}`}
              onClick={() => setIsVideoExpanded(true)}
            >
              <iframe 
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?enablejsapi=1" 
                title="CleverClaim video" 
                className="absolute top-0 left-0 w-full h-full cursor-pointer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                onLoad={(e) => {
                  // This adds an event listener to track when the video starts playing
                  const iframe = e.target as HTMLIFrameElement;
                  window.addEventListener('message', (event) => {
                    if (event.source === iframe.contentWindow) {
                      try {
                        const data = JSON.parse(event.data);
                        // YouTube API event for state change (1 = playing)
                        if (data.event === 'infoDelivery' || data.event === 'onStateChange') {
                          if (data.info && data.info.playerState === 1) {
                            setIsVideoExpanded(true);
                          }
                        }
                      } catch (error) {
                        console.error('Failed to parse YouTube API message', error);
                      }
                    }
                  });
                }}
              ></iframe>
              {!isVideoExpanded && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-20 transition-all">
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center cursor-pointer hover:bg-primary/90 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5.14v14l11-7-11-7z" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-700 mb-6">
                At CleverClaim, we believe that air passengers deserve fair compensation when their flight plans are disrupted. Our mission is to simplify the complex process of claiming compensation, making it accessible to everyone.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                We're on a journey to transform how passengers navigate their rights, using technology to automate and streamline what was once a frustrating, time-consuming process.
              </p>
              <div className="flex items-center gap-4 mt-8">
                <p className="font-semibold text-primary">Learn about passenger rights</p>
                <Link to="/#passenger-rights" className="bg-primary text-white p-2 rounded-full">
                  <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="bg-blue-50 p-8 rounded-xl border border-blue-100">
                <div className="flex items-start gap-4">
                  <div className="bg-primary p-3 rounded-lg text-white">
                    <Award size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Part of APRA</h3>
                    <p className="text-gray-700">
                      CleverClaim is a member of the Association of Passenger Rights Advocates (APRA), whose mission is to promote and protect passengers' rights worldwide.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 p-8 rounded-xl border border-blue-100">
                <div className="flex items-start gap-4">
                  <div className="bg-primary p-3 rounded-lg text-white">
                    <Users size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Passenger-First Approach</h3>
                    <p className="text-gray-700">
                      We put passengers first, ensuring they receive the compensation they're entitled to with minimal effort on their part.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats section */}
      <section className="py-16 bg-gradient-to-b from-white to-blue-50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Impact</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Since our founding, we've helped thousands of passengers receive the compensation they deserve. Our technology-driven approach allows us to process claims efficiently and with a high success rate.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Users size={36} />, stat: "250,000+", label: "Passengers Helped" },
              { icon: <BarChart3 size={36} />, stat: "€60M+", label: "Compensation Secured" },
              { icon: <PlaneTakeoff size={36} />, stat: "92%", label: "Success Rate" },
              { icon: <Clock size={36} />, stat: "7 Days", label: "Average Claim Time" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center h-full border-none shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="pt-8">
                    <div className="bg-primary/10 p-4 rounded-full w-fit mx-auto mb-4 text-primary">
                      {item.icon}
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">{item.stat}</h3>
                    <p className="text-gray-600">{item.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team/Company section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Company</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Founded in 2018, CleverClaim has grown from a small startup to a leading advocate for passenger rights. Our team of legal experts and tech professionals work together to make claiming compensation as simple as possible.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                title: "Expertise",
                description: "Our team includes legal experts specialized in air passenger rights who understand the intricacies of regulations like EU 261/2004."
              },
              {
                title: "Technology",
                description: "We've developed proprietary technology that automates claim eligibility checks and streamlines the compensation process."
              },
              {
                title: "Transparency",
                description: "We believe in being transparent about our process and fees, ensuring our customers always know what to expect."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-blue-50 p-8 rounded-xl border border-blue-100"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-700">{item.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full hover:bg-blue-600 transition-colors shadow-md"
            >
              Contact Us
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
