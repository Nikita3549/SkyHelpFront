import React from 'react';
import { motion } from 'framer-motion';
import { Check, AlertCircle } from 'lucide-react';

const Eligibility = () => {
  return (
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
            <h2 className="text-3xl sm:text-4xl font-bold">
              When Are You Eligible For Compensation?
            </h2>
            <p className="text-lg text-gray-600">
              Under EU Regulation 261/2004, you may be entitled to compensation
              if your flight has been:
            </p>

            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                  <Check className="h-4 w-4 text-primary" />
                </div>
                <div className="ml-3">
                  <h3 className="font-medium text-gray-900">
                    Delayed by more than 3 hours
                  </h3>
                  <p className="text-gray-600 mt-1">
                    If you reached your final destination with a delay of more
                    than 3 hours.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                  <Check className="h-4 w-4 text-primary" />
                </div>
                <div className="ml-3">
                  <h3 className="font-medium text-gray-900">
                    Cancelled without notice
                  </h3>
                  <p className="text-gray-600 mt-1">
                    If your flight was cancelled less than 14 days before
                    departure.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                  <Check className="h-4 w-4 text-primary" />
                </div>
                <div className="ml-3">
                  <h3 className="font-medium text-gray-900">Denied boarding</h3>
                  <p className="text-gray-600 mt-1">
                    If you were involuntarily denied boarding due to
                    overbooking.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                  <Check className="h-4 w-4 text-primary" />
                </div>
                <div className="ml-3">
                  <h3 className="font-medium text-gray-900">
                    Missed connection
                  </h3>
                  <p className="text-gray-600 mt-1">
                    If you missed a connecting flight due to a delay in your
                    first flight.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-500 italic">
              Note: 'Extraordinary circumstances' such as severe weather
              conditions or security risks may exempt airlines from paying
              compensation.
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
                  <p className="text-sm text-gray-600">
                    Flights up to 1,500 km
                  </p>
                </div>
                <div className="text-2xl font-bold text-primary">€250</div>
              </div>

              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div className="space-y-1">
                  <p className="font-medium">Medium Distance</p>
                  <p className="text-sm text-gray-600">
                    Flights between 1,500 km and 3,500 km
                  </p>
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
                  The compensation amount is fixed regardless of your ticket
                  price and may be reduced by 50% if the airline offered you an
                  alternative flight that arrived close to your original arrival
                  time.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Eligibility;
