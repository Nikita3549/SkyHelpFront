
import React from "react";
import { motion } from "framer-motion";
import { Globe, Flag, GlobeLock } from "lucide-react";
import EuFlag from "@/components/ui-custom/EuFlag";

const PassengerRightsSection = () => {
  return (
    <section className="bg-white py-14 border-t border-gray-100">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
              WE PROTECT YOUR AIR PASSENGER RIGHTS
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              We assist passengers with claims under various international regulations when your flight is delayed, canceled, or you've been denied boarding.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow flex flex-col items-center text-center">
              <div className="w-12 h-12 flex items-center justify-center mb-4">
                <EuFlag size={40} className="w-10" />
              </div>
              <h3 className="font-semibold text-primary text-lg mb-2">EU REGULATION EC 261</h3>
              <p className="text-gray-600 text-sm">
                Covers flights departing from any EU airport or arriving in the EU with an EU-registered airline.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow flex flex-col items-center text-center">
              <div className="w-12 h-12 flex items-center justify-center mb-4">
                <Flag className="h-10 w-10 text-yellow-500" />
              </div>
              <h3 className="font-semibold text-primary text-lg mb-2">BRAZILIAN REGULATIONS</h3>
              <p className="text-gray-600 text-sm">
                Protects passengers on domestic and international flights to and from Brazil under ANAC Resolution 400.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow flex flex-col items-center text-center">
              <div className="w-12 h-12 flex items-center justify-center mb-4">
                <Globe className="h-10 w-10 text-blue-500" />
              </div>
              <h3 className="font-semibold text-primary text-lg mb-2">MONTREAL CONVENTION</h3>
              <p className="text-gray-600 text-sm">
                International treaty covering compensation for delays, baggage issues, and injuries on international flights.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow flex flex-col items-center text-center">
              <div className="w-12 h-12 flex items-center justify-center mb-4">
                <GlobeLock className="h-10 w-10 text-red-500" />
              </div>
              <h3 className="font-semibold text-primary text-lg mb-2">TURKISH REGULATIONS</h3>
              <p className="text-gray-600 text-sm">
                SHY-PASSENGER regulation provides rights for passengers on flights to and from Turkish airports.
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm">
              Our expert team handles claims under all these regulations, ensuring you receive the maximum compensation you're entitled to.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PassengerRightsSection;
