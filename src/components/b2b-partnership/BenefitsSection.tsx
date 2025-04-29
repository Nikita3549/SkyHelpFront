
import React from "react";
import { motion } from "framer-motion";
import { BadgeDollarSign, Link as LinkIcon, Package, BarChart, ChartBar } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

const benefits = [
  {
    title: "Earn From Every Successful Case",
    description: "Monetize delayed and canceled flights — we handle processing and payouts, you earn commission from each claim.",
    icon: <BadgeDollarSign className="h-10 w-10 text-primary" />
  },
  {
    title: "Easy Integration",
    description: "Use direct links, referral dashboards, or API integration — whichever suits your platform best.",
    icon: <LinkIcon className="h-10 w-10 text-primary" />
  },
  {
    title: "Full Back-Office Support",
    description: "We manage customer support, legal follow-ups, documentation, and compensation tracking.",
    icon: <Package className="h-10 w-10 text-primary" />
  },
  {
    title: "Real-Time Partner Dashboard",
    description: "Track performance, earnings, and client activity live. Export reports and monitor success.",
    icon: <BarChart className="h-10 w-10 text-primary" />
  },
  {
    title: "Proven Conversion Rates",
    description: "High claim success rate and average compensation of €250–€600 — users are motivated to claim.",
    icon: <ChartBar className="h-10 w-10 text-primary" />
  }
];

const BenefitsSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            What You Get as a Partner
          </motion.h2>
          <motion.div 
            className="w-24 h-1 bg-primary mx-auto"
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          ></motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="shadow-md h-full border-0 hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-4">
                    {benefit.icon}
                    <h3 className="text-xl font-semibold text-gray-900">{benefit.title}</h3>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          className="mt-16 rounded-xl overflow-hidden shadow-xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <img 
            src="/lovable-uploads/4620b240-fdab-47bc-9fde-6928b0d952ea.png" 
            alt="Partner Dashboard Analytics" 
            className="w-full h-auto rounded-xl"
          />
          <div className="bg-blue-50 p-6 text-center">
            <h4 className="text-xl font-semibold text-gray-900 mb-2">Real-time Analytics Dashboard</h4>
            <p className="text-gray-600">Track commissions, compensations, and claim performance in one place</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BenefitsSection;
