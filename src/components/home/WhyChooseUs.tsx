
import React from "react";
import { motion } from "framer-motion";
import { X, Check } from "lucide-react";
import { Link } from "react-router-dom";

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container-custom max-w-6xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <span className="text-sm text-gray-500 uppercase tracking-wider">Advantages</span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-2">
            Why People Choose <span className="text-primary">CleverClaim</span>?
          </h2>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {/* Left column - Claim by Yourself */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 rounded-xl shadow-sm"
          >
            <h3 className="text-xl font-medium text-gray-700 mb-6">Claim by Yourself</h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-red-100 flex items-center justify-center mt-0.5">
                  <X className="h-4 w-4 text-red-500" />
                </div>
                <div className="ml-3">
                  <h4 className="font-medium text-gray-800">Complexity</h4>
                  <p className="text-gray-600 mt-1">
                    Understanding the complex rules and regulations of flight compensation can be overwhelming and confusing.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-red-100 flex items-center justify-center mt-0.5">
                  <X className="h-4 w-4 text-red-500" />
                </div>
                <div className="ml-3">
                  <h4 className="font-medium text-gray-800">Lots of paperwork</h4>
                  <p className="text-gray-600 mt-1">
                    Filling out forms and collecting evidence to support your claim might be exhausting and time-consuming.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-red-100 flex items-center justify-center mt-0.5">
                  <X className="h-4 w-4 text-red-500" />
                </div>
                <div className="ml-3">
                  <h4 className="font-medium text-gray-800">Risks</h4>
                  <p className="text-gray-600 mt-1">
                    You'll have to cover the legal fees yourself if your claim goes to court.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-red-100 flex items-center justify-center mt-0.5">
                  <X className="h-4 w-4 text-red-500" />
                </div>
                <div className="ml-3">
                  <h4 className="font-medium text-gray-800">Airline limitations</h4>
                  <p className="text-gray-600 mt-1">
                    Some airlines take advantage of loopholes or use ambiguous language to avoid compensating passengers.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-red-100 flex items-center justify-center mt-0.5">
                  <X className="h-4 w-4 text-red-500" />
                </div>
                <div className="ml-3">
                  <h4 className="font-medium text-gray-800">Lack of transparency</h4>
                  <p className="text-gray-600 mt-1">
                    Airlines frequently lack transparency regarding the compensation process, leaving passengers unaware about the status of their claims.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Right column - Claim with CleverClaim */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-primary/10"
          >
            <h3 className="text-xl font-medium text-primary mb-6">Claim with CleverClaim</h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                  <Check className="h-4 w-4 text-green-500" />
                </div>
                <div className="ml-3">
                  <h4 className="font-medium text-gray-800">Quick and easy</h4>
                  <p className="text-gray-600 mt-1">
                    No lengthy forms or tedious paperwork - submit your compensation claim in just a couple of minutes!
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                  <Check className="h-4 w-4 text-green-500" />
                </div>
                <div className="ml-3">
                  <h4 className="font-medium text-gray-800">No financial risk</h4>
                  <p className="text-gray-600 mt-1">
                    CleverClaim covers all compensation recovery costs. You won't have to pay if we don't win your case.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                  <Check className="h-4 w-4 text-green-500" />
                </div>
                <div className="ml-3">
                  <h4 className="font-medium text-gray-800">Old flights claim</h4>
                  <p className="text-gray-600 mt-1">
                    Depending on the regulations, you can claim compensation for flights disrupted up to 3 years ago.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                  <Check className="h-4 w-4 text-green-500" />
                </div>
                <div className="ml-3">
                  <h4 className="font-medium text-gray-800">Regular Updates</h4>
                  <p className="text-gray-600 mt-1">
                    We'll update you on your claim's progress and address any questions you may have along the way.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                  <Check className="h-4 w-4 text-green-500" />
                </div>
                <div className="ml-3">
                  <h4 className="font-medium text-gray-800">Trusted Experts</h4>
                  <p className="text-gray-600 mt-1">
                    Our legal experts will make sure each passenger gets the compensation they deserve.
                  </p>
                </div>
              </div>
              
              <div className="mt-8">
                <Link
                  to="/claim"
                  className="w-full bg-primary text-white py-3 px-6 rounded-lg font-medium text-center inline-block hover:bg-primary/90 transition-colors"
                >
                  Claim Now
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
