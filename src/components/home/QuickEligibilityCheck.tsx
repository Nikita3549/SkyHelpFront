import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plane, ArrowRight, Ticket } from "lucide-react";
import { motion } from "framer-motion";

const QuickEligibilityCheck = () => {
  const [departureAirport, setDepartureAirport] = useState("");
  const [arrivalAirport, setArrivalAirport] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Navigate to claim form with pre-filled values
    navigate('/claim', {
      state: {
        departureAirport,
        arrivalAirport
      }
    });
  };

  const handleBoardingPassCheck = () => {
    navigate('/claim', {
      state: {
        checkType: 'boardingPass'
      }
    });
  };

  return (
    <section className="bg-blue-50 py-14 relative overflow-hidden">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              Check Your Compensation Eligibility
            </h2>
            <p className="text-gray-600">
              Enter your flight details below to quickly check if you're eligible for compensation
            </p>
          </div>
          
          <form 
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow-md p-6 md:p-8 relative"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="relative">
                  <Input
                    id="departureAirport"
                    placeholder="Departure Airport"
                    value={departureAirport}
                    onChange={(e) => setDepartureAirport(e.target.value)}
                    required
                    className="w-full pl-10"
                  />
                  <Plane className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="relative">
                  <Input
                    id="arrivalAirport"
                    placeholder="Arrival Airport"
                    value={arrivalAirport}
                    onChange={(e) => setArrivalAirport(e.target.value)}
                    required
                    className="w-full pl-10"
                  />
                  <Plane className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 rotate-90 text-gray-400" />
                </div>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <Button 
                type="submit" 
                className="px-6 py-3 h-auto rounded-full font-medium text-white bg-primary hover:bg-blue-600 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 w-full md:w-auto"
              >
                Check Compensation <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="mt-4 flex items-center justify-center gap-2">
              <span className="text-gray-500">or</span>
              <Button 
                type="button"
                variant="ghost" 
                className="p-0 h-auto text-blue-500 hover:text-blue-700 hover:bg-transparent font-medium flex items-center gap-2 group text-base"
                onClick={handleBoardingPassCheck}
              >
                <Ticket className="h-5 w-5 text-blue-500 group-hover:text-blue-700" />
                Fast check with boarding pass
              </Button>
            </div>
            
            <motion.div 
              className="absolute -top-10 -right-10 hidden md:block" 
              animate={{ 
                y: [0, -12, 0],
                rotate: [0, 15, 0]
              }}
              transition={{ 
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <div className="bg-[#D3E4FD] rounded-full p-3 shadow-md">
                <Plane size={30} strokeWidth={2} className="text-gray-800" />
              </div>
            </motion.div>
          </form>
        </div>
      </div>
      
      <motion.div 
        className="absolute bottom-10 left-10 hidden lg:block" 
        animate={{ 
          y: [0, -20, 0],
          x: [0, 20, 0],
          rotate: [0, -10, 0]
        }}
        transition={{ 
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        <div className="bg-[#D3E4FD] rounded-full p-4 shadow-lg">
          <Plane size={50} strokeWidth={1.5} className="text-gray-800 rotate-180" />
        </div>
      </motion.div>
    </section>
  );
};

export default QuickEligibilityCheck;
