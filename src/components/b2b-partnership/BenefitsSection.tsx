
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 px-4 md:px-8 lg:px-16 xl:px-24">
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
    </section>
  );
};

export default BenefitsSection;
