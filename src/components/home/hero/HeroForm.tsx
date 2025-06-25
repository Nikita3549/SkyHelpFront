import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Check, Plane, Ticket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AirportInput, { Airport } from '@/components/AirportInput.tsx';
import { useIsMobile } from '@/hooks/use-mobile.tsx';

const HeroForm = () => {
  const [departureAirport, setDepartureAirport] = useState<Airport | null>(
    null,
  );
  const [arrivalAirport, setArrivalAirport] = useState<Airport | null>(null);
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleBoardingPassCheck = () => {
    navigate('/claim', {
      state: {
        checkType: 'boardingPass',
      },
    });
  };

  return (
    // <motion.div
    //   initial={{ opacity: 0, y: 30 }}
    //   animate={{ opacity: 1, y: 0 }}
    //   transition={{ duration: 0.6, delay: 0.2 }}
    //   className="relative"
    // >
    <div className="relative overflow-hidden rounded-2xl w-full">
      <div
        className={`glass rounded-2xl p-6 h-56 max-md:h-auto max-md:max-w-full w-full md:p-8 shadow-xl max-md:bg-[#e6f0ff] max-md:shadow-[0_4px_10px_0_rgba(0,0,0,0.05)] ${useIsMobile() ? 'gradient-border relative' : ''}`}
      >
        <div className="md:hidden w-[26px] h-[26px] rounded-[13px] bg-[#F6FAFF] shadow-[inset_-1px_0px_0px_#9061F9] absolute left-[-14px] top-40" />
        <div className="md:hidden w-[26px] h-[26px] rounded-[13px] bg-[#F6FAFF] shadow-[inset_-1px_0px_0px_#4DB5F4] absolute right-[-14px] top-40 rotate-180" />
        {/* контент */}

        <div className="flex flex-col space-y-5">
          <div className="flex justify-between max-md:flex-col gap-3">
            <div className="w-full">
              <div className="relative w-full">
                {/*<Input*/}
                {/*  type="text"*/}
                {/*  placeholder="Departure Airport"*/}
                {/*  style={{ borderRadius: '48px' }}*/}
                {/*  className="w-full pl-10 pr-4 py-3 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 rounded"*/}
                {/*  value={departureAirport}*/}
                {/*  onChange={(e) => setDepartureAirport(e.target.value)}*/}
                {/*/>*/}
                <AirportInput
                  setAirport={setDepartureAirport}
                  isDeparture={true}
                  isRounded={true}
                  isColoredBorder={isMobile}
                  placeHolder={'Departure Airport'}
                />
                {/*<Plane className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />*/}
              </div>
            </div>

            <div className="w-full">
              {/*<div className="relative w-full">*/}
              {/*  <Input*/}
              {/*    type="text"*/}
              {/*    placeholder="Arrival Airport"*/}
              {/*    style={{ borderRadius: '48px' }}*/}
              {/*    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50"*/}
              {/*    value={arrivalAirport}*/}
              {/*    onChange={(e) => setArrivalAirport(e.target.value)}*/}
              {/*  />*/}
              {/*  <Plane className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 rotate-90 text-gray-400" />*/}
              {/*</div>*/}
              <AirportInput
                setAirport={setArrivalAirport}
                isDeparture={false}
                isRounded={true}
                isColoredBorder={isMobile}
                placeHolder={'Arrival Airport'}
              />
            </div>
          </div>

          <Link
            to="/claim"
            state={{
              departureAirport,
              arrivalAirport,
            }}
            style={{ borderRadius: '50px' }}
            className="w-full px-4 py-3 bg-primary text-white rounded-lg font-medium hover:bg-blue-600 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5 text-center max-md:px-6 max-md:w-auto max-md:max-w-[80%] max-md:mx-auto whitespace-nowrap"
          >
            Check Compensation
          </Link>

          {isMobile && (
            <img alt="line" src="/landing/mobile/line.svg" className="w-full" />
          )}

          <div className="flex items-center justify-start gap-2 max-md:flex max-md:flex-col max-md:gap-1">
            <span className="text-xs text-gray-500">or</span>
            <Button
              type="button"
              variant="ghost"
              className="p-0 h-auto text-blue-500 hover:text-blue-700 hover:bg-transparent font-medium text-sm flex items-center gap-1 group"
              onClick={handleBoardingPassCheck}
            >
              <Ticket className="h-4 w-4 text-blue-500 group-hover:text-blue-700" />
              <p className="underline">Fast check with boarding pass</p>
            </Button>
          </div>
        </div>
      </div>
    </div>

    /* Replace plane icons in yellow circles with blue circles */
    // <motion.div
    //   className="absolute -bottom-6 -right-6"
    //   animate={{
    //     y: [0, -10, 0],
    //     rotate: [0, 5, 0],
    //   }}
    //   transition={{
    //     duration: 4,
    //     repeat: Infinity,
    //     repeatType: 'reverse',
    //   }}
    // >
    //   <div className="bg-[#D3E4FD] rounded-full p-2 shadow-md">
    //     <Plane size={26} strokeWidth={2} className="text-gray-800" />
    //   </div>
    // </motion.div>
    //
    // <motion.div
    //   className="absolute -top-4 -left-4"
    //   animate={{
    //     y: [0, -8, 0],
    //     rotate: [0, -5, 0],
    //   }}
    //   transition={{
    //     duration: 3.5,
    //     repeat: Infinity,
    //     repeatType: 'reverse',
    //     delay: 1,
    //   }}
    // >
    //   <div className="bg-[#D3E4FD] rounded-full p-2 shadow-sm">
    //     <Plane
    //       size={20}
    //       strokeWidth={2}
    //       className="text-gray-800 rotate-180"
    //     />
    //   </div>
    /*</motion.div>*/
    /*</motion.div>*/
  );
};

export default HeroForm;
