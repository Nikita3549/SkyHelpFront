
import React from "react";
import { motion } from "framer-motion";
import { Scales, FileText, HandShake, BarChart } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

const benefits = [
  {
    title: "Focus on law – let us handle the rest",
    description: "We take care of claim processing, documentation, and customer support. You focus on legal expertise.",
    icon: <Scales className="h-10 w-10 text-primary" />
  },
  {
    title: "Fast results, high success rate",
    description: "We combine automation and legal follow-up for faster, reliable outcomes.",
    icon: <BarChart className="h-10 w-10 text-primary" />
  },
  {
    title: "Revenue share model",
    description: "Earn a commission for each successful claim you refer.",
    icon: <HandShake className="h-10 w-10 text-primary" />
  },
  {
    title: "Dedicated partner dashboard",
    description: "Track referred clients, cases, earnings, and statuses in real time.",
    icon: <FileText className="h-10 w-10 text-primary" />
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
            Why Partner with CleverClaim?
          </motion.h2>
          <motion.div 
            className="w-24 h-1 bg-primary mx-auto"
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          ></motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
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
      </div>
    </section>
  );
};

export default BenefitsSection;
