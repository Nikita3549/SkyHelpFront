
import React from "react";
import { motion } from "framer-motion";
const EarningsSection: React.FC = () => {
  const earningTiers = [{
    referrals: 5,
    earnings: "€125"
  }, {
    referrals: 10,
    earnings: "€250"
  }, {
    referrals: 20,
    earnings: "€500"
  }, {
    referrals: 50,
    earnings: "€1,250"
  }];
  return <section className="py-20 bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{
          opacity: 0,
          x: -20
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }}>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">How Much You Can Earn</h2>
            <p className="text-lg text-gray-600 mb-8">Our generous commission structure lets you earn significant income by referring customers to SkyHelp.</p>
            
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
                  <h4 className="font-semibold text-xl">Average commission at SkyHelp ≈ €100 → Partner earns €25</h4>
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
          
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.5,
          delay: 0.3
        }} className="bg-[#D3E4FD]/30 p-8 rounded-2xl border border-blue-100">
            <h3 className="text-2xl font-semibold mb-6 text-center">Potential Monthly Earnings</h3>
            <div className="space-y-4">
              {earningTiers.map((tier, i) => <div key={i} className="flex justify-between p-4 bg-white rounded-lg shadow-sm">
                  <span className="font-medium">{tier.referrals} successful claims</span>
                  <span className="font-semibold text-primary">{tier.earnings}</span>
                </div>)}
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                *Actual earnings may vary based on specific cases and conversion rates
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>;
};
export default EarningsSection;
