
import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Share, Award, BadgeCheck, FileText } from "lucide-react";
import AnimatedButton from "@/components/ui-custom/AnimatedButton";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const AffiliateProgram = () => {
  // Refs for scroll navigation
  const howItWorksRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);

  // Scroll to section function
  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

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

  return (
    <div className="bg-white">
      {/* 1. Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden bg-gradient-to-br from-white to-blue-50">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=2670')] bg-cover bg-center opacity-[0.03]"></div>
        
        <div className="container-custom relative z-10 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                  Earn Money with CleverClaim!
                </h1>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl">
                  Share our platform with friends, followers, and your audience — and earn generous commissions for every successful claim.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <AnimatedButton to="/affiliate/register" variant="primary" size="lg">
                    Become a Partner
                  </AnimatedButton>
                  <button
                    onClick={() => scrollToSection(howItWorksRef)} 
                    className="px-6 py-3 rounded-full font-medium border border-gray-200 text-gray-600 hover:text-primary hover:border-primary/20 transition-all shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2"
                  >
                    How it Works
                  </button>
                </div>
                
                <div className="mt-10">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      <span className="text-[#00b67a]">★★★★★</span>
                    </div>
                    <span className="text-gray-600 text-sm">
                      Trusted by <span className="font-semibold">2,000+</span> affiliate partners worldwide
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
            
            <div className="order-1 lg:order-2 flex justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="relative w-full max-w-lg">
                  <img
                    src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=2670"
                    alt="Person earning with affiliate marketing"
                    className="rounded-xl shadow-2xl"
                  />
                  <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg">
                    <div className="text-lg font-semibold text-primary">€250</div>
                    <div className="text-sm text-gray-600">avg. monthly earnings</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. How It Works */}
      <section 
        ref={howItWorksRef}
        id="how-it-works" 
        className="py-20 bg-white scroll-mt-20"
      >
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
              Join our affiliate program in 3 simple steps
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
              <div className="w-16 h-16 rounded-full bg-[#D3E4FD] flex items-center justify-center mb-5">
                <BadgeCheck className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">1. Sign Up</h3>
              <p className="text-gray-600">Register for our affiliate program in just 2 minutes.</p>
            </motion.div>
            
            <motion.div variants={item} className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-[#D3E4FD] flex items-center justify-center mb-5">
                <Share className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">2. Share Your Link</h3>
              <p className="text-gray-600">Get your personal affiliate link and share it anywhere — social media, blogs, messengers.</p>
            </motion.div>
            
            <motion.div variants={item} className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-[#D3E4FD] flex items-center justify-center mb-5">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">3. Get Paid</h3>
              <p className="text-gray-600">Earn up to 25% commission on every approved claim.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* 3. Benefits for Partners */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl sm:text-4xl font-bold mb-4"
            >
              Benefits for Partners
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-gray-600"
            >
              Join the CleverClaim affiliate program and enjoy these benefits
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Easy Registration",
                description: "Easy and fast registration — no bureaucracy",
                icon: <BadgeCheck className="h-6 w-6" />
              },
              {
                title: "Personal Dashboard",
                description: "Personal dashboard to track clicks and payouts",
                icon: <FileText className="h-6 w-6" />
              },
              {
                title: "Regular Payouts",
                description: "Regular payouts (once a month)",
                icon: <Award className="h-6 w-6" />
              },
              {
                title: "High Conversion Rates",
                description: "High conversion rates thanks to CleverClaim's trusted brand",
                icon: <Share className="h-6 w-6" />
              },
              {
                title: "Promotional Materials",
                description: "Access to ready-to-use promotional materials: banners, texts, post templates",
                icon: <FileText className="h-6 w-6" />
              }
            ].map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-[#D3E4FD] p-3 rounded-lg">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-medium">{benefit.title}</h3>
                </div>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* 4. How Much You Can Earn */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">How Much You Can Earn</h2>
              <p className="text-lg text-gray-600 mb-8">
                Our generous commission structure lets you earn significant income by referring customers to CleverClaim.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="bg-[#D3E4FD] h-12 w-12 rounded-full flex items-center justify-center text-primary font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-xl">1 invite → 1 claim → 25% of our commission</h4>
                    <p className="text-gray-600">For every successful claim from your referral</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="bg-[#D3E4FD] h-12 w-12 rounded-full flex items-center justify-center text-primary font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-xl">Average commission at CleverClaim ≈ €100 → Partner earns €25</h4>
                    <p className="text-gray-600">For a typical flight compensation case</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="bg-[#D3E4FD] h-12 w-12 rounded-full flex items-center justify-center text-primary font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-xl">10 claims per month = €250 passive income</h4>
                    <p className="text-gray-600">Scaling your earnings is easy</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-[#D3E4FD]/30 p-8 rounded-2xl border border-blue-100"
            >
              <h3 className="text-2xl font-semibold mb-6 text-center">Potential Monthly Earnings</h3>
              <div className="space-y-4">
                {[
                  { referrals: 5, earnings: "€125" },
                  { referrals: 10, earnings: "€250" },
                  { referrals: 20, earnings: "€500" },
                  { referrals: 50, earnings: "€1,250" }
                ].map((tier, i) => (
                  <div key={i} className="flex justify-between p-4 bg-white rounded-lg shadow-sm">
                    <span className="font-medium">{tier.referrals} successful claims</span>
                    <span className="font-semibold text-primary">{tier.earnings}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500">
                  *Actual earnings may vary based on specific cases and conversion rates
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* 5. FAQ Section */}
      <section ref={faqRef} id="faq" className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl sm:text-4xl font-bold mb-4"
            >
              Frequently Asked Questions
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-gray-600"
            >
              Find answers to common questions about our affiliate program
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-3xl mx-auto"
          >
            <Accordion type="single" collapsible className="space-y-4">
              {[
                {
                  question: "How does the affiliate program work?",
                  answer: "Our affiliate program works on a revenue-sharing model. You get a unique affiliate link to share with your audience. When someone clicks your link and successfully files a claim with CleverClaim, you earn 25% of our commission once the claim is approved and paid."
                },
                {
                  question: "How much can I earn?",
                  answer: "Your earnings depend on how many people you refer who file successful claims. On average, you can earn €25 per successful claim. Some partners earn €250+ monthly by referring just 10 successful claims."
                },
                {
                  question: "When do I get paid?",
                  answer: "Payments are processed once a month, typically on the 15th of each month. We pay you for all successful claims that were completed in the previous month. Payment methods include bank transfer, PayPal, and Wise."
                },
                {
                  question: "Are there any country restrictions?",
                  answer: "Our affiliate program is open to partners from most countries worldwide. However, due to regulatory restrictions, we currently cannot accept affiliates from sanctioned countries. Please contact our support team for specific country information."
                },
                {
                  question: "Do I need a website to join the program?",
                  answer: "No, you don't need a website. You can share your affiliate link on social media, in messaging apps, email newsletters, or any other channel where you communicate with your audience."
                },
              ].map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-white rounded-lg shadow-sm px-4"
                >
                  <AccordionTrigger className="text-left font-medium py-4 hover:text-primary focus:text-primary focus:outline-none">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>
      
      {/* 6. Final CTA */}
      <section className="py-20 bg-gradient-to-br from-primary/90 to-blue-600/90 text-white">
        <div className="container-custom">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Join the CleverClaim network today!</h2>
            <p className="text-lg text-white/90 mb-8">
              Start earning by helping others get their flight compensations. Our program is designed to reward you generously for every successful referral.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <AnimatedButton 
                to="/affiliate/register" 
                variant="secondary" 
                size="lg" 
                className="bg-white text-primary hover:bg-blue-50"
              >
                Become a CleverClaim Partner
              </AnimatedButton>
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
    </div>
  );
};

export default AffiliateProgram;
