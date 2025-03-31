
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Check, Plane, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const HeroForm = () => {
  const [departureAirport, setDepartureAirport] = useState("");
  const [arrivalAirport, setArrivalAirport] = useState("");
  const navigate = useNavigate();

  const handleBoardingPassCheck = () => {
    navigate('/claim', {
      state: {
        checkType: 'boardingPass'
      }
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="relative"
    >
      <div className="glass rounded-2xl p-6 md:p-8 shadow-xl">
        <div className="flex flex-col space-y-5">
          <h3 className="text-xl font-medium text-gray-800">Check your eligibility</h3>
          <div className="grid gap-4">
            <div>
              <div className="relative">
                <Input 
                  type="text" 
                  placeholder="Departure Airport" 
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  value={departureAirport}
                  onChange={(e) => setDepartureAirport(e.target.value)}
                />
                <Plane className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>
            
            <div>
              <div className="relative">
                <Input 
                  type="text" 
                  placeholder="Arrival Airport" 
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  value={arrivalAirport}
                  onChange={(e) => setArrivalAirport(e.target.value)}
                />
                <Plane className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 rotate-90 text-gray-400" />
              </div>
            </div>
          </div>
          
          <Link 
            to="/claim" 
            state={{ 
              departureAirport, 
              arrivalAirport
            }}
            className="w-full px-4 py-3 bg-primary text-white rounded-lg font-medium hover:bg-blue-600 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5 text-center"
          >
            Check Now
          </Link>
          
          <div className="flex items-center justify-center gap-2">
            <span className="text-xs text-gray-500">or</span>
            <Button 
              type="button"
              variant="ghost" 
              className="p-0 h-auto text-blue-500 hover:text-blue-700 hover:bg-transparent font-medium text-xs flex items-center gap-1 group"
              onClick={handleBoardingPassCheck}
            >
              <Ticket className="h-4 w-4 text-blue-500 group-hover:text-blue-700" />
              Fast check with boarding pass
            </Button>
          </div>
          
          <div className="text-xs text-gray-500 space-y-2 pt-2">
            <p className="flex items-start">
              <Check className="h-4 w-4 text-primary flex-shrink-0 mr-1.5 mt-0.5" />
              <span>No obligation to continue after checking</span>
            </p>
            <p className="flex items-start">
              <Check className="h-4 w-4 text-primary flex-shrink-0 mr-1.5 mt-0.5" />
              <span>No-win, no-fee — only pay if we win your case</span>
            </p>
            <p className="flex items-start">
              <Check className="h-4 w-4 text-primary flex-shrink-0 mr-1.5 mt-0.5" />
              <span>We handle the entire claim process for you</span>
            </p>
          </div>
        </div>
      </div>
      
      <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-blue-500/10 rounded-full animate-float" />
      <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary/10 rounded-full animate-float" style={{animationDelay: '1s'}} />
    </motion.div>
  );
};

export default HeroForm;
