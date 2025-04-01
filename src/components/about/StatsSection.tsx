
import React from "react";
import { motion } from "framer-motion";
import { BarChart3, Clock, PlaneTakeoff, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const StatsSection = () => {
  const stats = [
    { icon: <Users size={36} />, stat: "250,000+", label: "Passengers Helped" },
    { icon: <BarChart3 size={36} />, stat: "€60M+", label: "Compensation Secured" },
    { icon: <PlaneTakeoff size={36} />, stat: "92%", label: "Success Rate" },
    { icon: <Clock size={36} />, stat: "7 Days", label: "Average Claim Time" }
  ];

  return (
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
          {stats.map((item, index) => (
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
  );
};

export default StatsSection;
