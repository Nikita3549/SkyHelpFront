import React from 'react';
import { motion } from 'framer-motion';
import { Check, AlertCircle } from 'lucide-react';

const Eligibility = () => {
  return (
    <section className="h-auto bg-[#fff] px-20 py-16 relative max-md:px-4">
      <div className="absolute z-[11] max-md:relative">
        <h1 className="mb-3 font-bold text-[32px] leading-[150%] tracking-[-0.01em] text-black max-md:text-center">
          How Much is Your Legal <br />
          Compensation For Your Problem Flight?
        </h1>
        <p className="w-full flex max-md:text-center max-md:justify-center">
          Under{'  '}
          <span>
            <div className="mx-1 rounded-[24px] px-2 py-[2px] w-[193px] h-[28px] flex align-middle bg-[rgba(50,130,247,0.25)] max-md:hidden">
              <img
                src="/landing/eu.svg"
                alt="eu"
                className="w-[18px] h-[18px] mt-[3px]"
              />
              <p className="ml-1 font-normal text-[14px] leading-[171%] tracking-[-0.02em] text-[#3282f7]">
                EU Regulation 261/2004
              </p>
            </div>
          </span>
          you may be entitled to
        </p>
        <p className="max-md:text-center">
          compensation if your flight has been:
        </p>
      </div>
      <img
        src="/landing/background-earth.svg"
        className="absolute bottom-12 left-0 min-h-full max-w-full object-cover z-[10]"
        alt="Earth background"
      />
      <div className="w-full h-[364px] max-md:h-auto max-md:py-8 flex justify-between relative z-[11] max-md:flex-col max-md:gap-4">
        <div className="flex flex-col mt-auto max-md:mt-0 max-md:items-center">
          <img src="/landing/plane.svg" alt="plane" className="w-14 h-14" />
          <p className="mt-6 font-extrabold text-[24px] leading-[100%] tracking-[-0.01em] text-[#3282f7]">
            €250
          </p>
          <h6 className="mt-7 font-bold text-[16px] leading-[150%] tracking-[-0.02em] text-[#393939]">
            Short Distance
          </h6>
          <p className="mt-4 font-normal text-[16px] leading-[150%] tracking-[-0.02em] text-[#393939]">
            Flights up to 1,500 km
          </p>
        </div>
        <div className="flex flex-col mt-auto mb-auto relative top-[68px] left-8 max-md:top-0 max-md:left-0 max-md:items-center">
          <img src="/landing/plane-2.svg" alt="plane" className="w-14 h-14" />
          <p className="mt-6 font-extrabold text-[24px] leading-[100%] tracking-[-0.01em] text-[#3282f7]">
            €400
          </p>
          <h6 className="mt-7 font-bold text-[16px] leading-[150%] tracking-[-0.02em] text-[#393939]">
            Medium Distance
          </h6>
          <p className="mt-4 font-normal text-[16px] leading-[150%] tracking-[-0.02em] text-[#393939] max-md:text-center">
            Flights between 1,500 km and 3,500 km
          </p>
        </div>
        <div className="flex flex-col relative top-24 max-md:top-0 max-md:items-center">
          <img src="/landing/plane-3.svg" alt="plane" className="w-14 h-14" />
          <p className="mt-6 font-extrabold text-[24px] leading-[100%] tracking-[-0.01em] text-[#3282f7]">
            €600
          </p>
          <h6 className="mt-7 font-bold text-[16px] leading-[150%] tracking-[-0.02em] text-[#393939]">
            Long Distance
          </h6>
          <p className="mt-4 font-normal text-[16px] leading-[150%] tracking-[-0.02em] text-[#393939]">
            Flights over 3,500 km
          </p>
        </div>
      </div>
      <div className="flex flex-col mt-20 z-[11] relative">
        <h1 className="font-bold text-[32px] leading-[150%] tracking-[-0.01em] text-center text-black">
          When Are You Eligible For Compensation?
        </h1>
        <div className="flex mt-12 justify-between px-4 gap-10">
          <div className="flex flex-col">
            <div className="flex align-top">
              <img
                src="/landing/tick.svg"
                alt="tick"
                className="w-[20px] h-[20px] mt-[2px]"
              />
              <div className="ml-2">
                <p className="font-bold text-[16px] leading-[150%] tracking-[-0.02em] text-[#393939]">
                  Delayed by more than 3 hours
                </p>
                <p className="font-normal text-[16px] leading-[150%] tracking-[-0.02em] mt-2">
                  If you reached your final destination with a delay of more
                  than 3 hours.
                </p>
              </div>
            </div>
            <div className="flex align-top mt-8">
              <img
                src="/landing/tick.svg"
                alt="tick"
                className="w-[20px] h-[20px] mt-[2px]"
              />
              <div className="ml-2">
                <p className="font-bold text-[16px] leading-[150%] tracking-[-0.02em] text-[#393939]">
                  Cancelled without notice
                </p>
                <p className="font-normal text-[16px] leading-[150%] tracking-[-0.02em] mt-2">
                  If your flight was cancelled less than 14 days before
                  departure
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex align-top">
              <img
                src="/landing/tick.svg"
                alt="tick"
                className="w-[20px] h-[20px] mt-[2px]"
              />
              <div className="ml-2">
                <p className="font-bold text-[16px] leading-[150%] tracking-[-0.02em] text-[#393939]">
                  Denied boarding
                </p>
                <p className="font-normal text-[16px] leading-[150%] tracking-[-0.02em] mt-2">
                  If you were involuntarily denied boarding due to overbooking.
                </p>
              </div>
            </div>
            <div className="flex align-top mt-8">
              <img
                src="/landing/tick.svg"
                alt="tick"
                className="w-[20px] h-[20px] mt-[2px]"
              />
              <div className="ml-2">
                <p className="font-bold text-[16px] leading-[150%] tracking-[-0.02em] text-[#393939]">
                  Missed connection
                </p>
                <p className="font-normal text-[16px] leading-[150%] tracking-[-0.02em] mt-2">
                  If you missed a connecting flight due to a delay in your first
                  flight.
                </p>
              </div>
            </div>
          </div>
        </div>
        <p className="font-normal text-[14px] leading-[171%] tracking-[-0.02em] text-center text-[#393939] mt-12">
          Note: 'Extraordinary circumstances' such as severe weather conditions
          or security risks may exempt airlines from paying compensation.
        </p>
      </div>
    </section>
    // <section className="py-20 bg-gray-50">
    //   <div className="container-custom">
    //     <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
    //       <motion.div
    //         initial={{ opacity: 0, x: -20 }}
    //         whileInView={{ opacity: 1, x: 0 }}
    //         viewport={{ once: true }}
    //         transition={{ duration: 0.5 }}
    //         className="space-y-6"
    //       >
    //         <h2 className="text-3xl sm:text-4xl font-bold">
    //           When Are You Eligible For Compensation?
    //         </h2>
    //         <p className="text-lg text-gray-600">
    //           Under EU Regulation 261/2004, you may be entitled to compensation
    //           if your flight has been:
    //         </p>
    //
    //         <div className="space-y-4">
    //           <div className="flex items-start">
    //             <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
    //               <Check className="h-4 w-4 text-primary" />
    //             </div>
    //             <div className="ml-3">
    //               <h3 className="font-medium text-gray-900">
    //                 Delayed by more than 3 hours
    //               </h3>
    //               <p className="text-gray-600 mt-1">
    //                 If you reached your final destination with a delay of more
    //                 than 3 hours.
    //               </p>
    //             </div>
    //           </div>
    //
    //           <div className="flex items-start">
    //             <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
    //               <Check className="h-4 w-4 text-primary" />
    //             </div>
    //             <div className="ml-3">
    //               <h3 className="font-medium text-gray-900">
    //                 Cancelled without notice
    //               </h3>
    //               <p className="text-gray-600 mt-1">
    //                 If your flight was cancelled less than 14 days before
    //                 departure.
    //               </p>
    //             </div>
    //           </div>
    //
    //           <div className="flex items-start">
    //             <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
    //               <Check className="h-4 w-4 text-primary" />
    //             </div>
    //             <div className="ml-3">
    //               <h3 className="font-medium text-gray-900">Denied boarding</h3>
    //               <p className="text-gray-600 mt-1">
    //                 If you were involuntarily denied boarding due to
    //                 overbooking.
    //               </p>
    //             </div>
    //           </div>
    //
    //           <div className="flex items-start">
    //             <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
    //               <Check className="h-4 w-4 text-primary" />
    //             </div>
    //             <div className="ml-3">
    //               <h3 className="font-medium text-gray-900">
    //                 Missed connection
    //               </h3>
    //               <p className="text-gray-600 mt-1">
    //                 If you missed a connecting flight due to a delay in your
    //                 first flight.
    //               </p>
    //             </div>
    //           </div>
    //         </div>
    //
    //         <p className="text-sm text-gray-500 italic">
    //           Note: 'Extraordinary circumstances' such as severe weather
    //           conditions or security risks may exempt airlines from paying
    //           compensation.
    //         </p>
    //       </motion.div>
    //
    //       <motion.div
    //         initial={{ opacity: 0, x: 20 }}
    //         whileInView={{ opacity: 1, x: 0 }}
    //         viewport={{ once: true }}
    //         transition={{ duration: 0.5, delay: 0.2 }}
    //         className="glass rounded-2xl p-8 shadow-xl"
    //       >
    //         <h3 className="text-xl font-medium mb-6">Compensation Amounts</h3>
    //
    //         <div className="space-y-6">
    //           <div className="flex items-center justify-between border-b border-gray-100 pb-4">
    //             <div className="space-y-1">
    //               <p className="font-medium">Short Distance</p>
    //               <p className="text-sm text-gray-600">
    //                 Flights up to 1,500 km
    //               </p>
    //             </div>
    //             <div className="text-2xl font-bold text-primary">€250</div>
    //           </div>
    //
    //           <div className="flex items-center justify-between border-b border-gray-100 pb-4">
    //             <div className="space-y-1">
    //               <p className="font-medium">Medium Distance</p>
    //               <p className="text-sm text-gray-600">
    //                 Flights between 1,500 km and 3,500 km
    //               </p>
    //             </div>
    //             <div className="text-2xl font-bold text-primary">€400</div>
    //           </div>
    //
    //           <div className="flex items-center justify-between">
    //             <div className="space-y-1">
    //               <p className="font-medium">Long Distance</p>
    //               <p className="text-sm text-gray-600">Flights over 3,500 km</p>
    //             </div>
    //             <div className="text-2xl font-bold text-primary">€600</div>
    //           </div>
    //         </div>
    //
    //         <div className="mt-8 p-4 bg-blue-50 rounded-lg">
    //           <div className="flex items-start">
    //             <AlertCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5 mr-3" />
    //             <p className="text-sm text-gray-600">
    //               The compensation amount is fixed regardless of your ticket
    //               price and may be reduced by 50% if the airline offered you an
    //               alternative flight that arrived close to your original arrival
    //               time.
    //             </p>
    //           </div>
    //         </div>
    //       </motion.div>
    //     </div>
    //   </div>
    // </section>
  );
};

export default Eligibility;
