
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plane, ArrowRight } from "lucide-react";

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

  return (
    <section className="bg-blue-50 py-14">
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
            className="bg-white rounded-xl shadow-md p-6 md:p-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="departureAirport" className="flex items-center gap-2">
                  <Plane className="h-4 w-4 text-primary" /> Departure Airport
                </Label>
                <div className="relative">
                  <Input
                    id="departureAirport"
                    placeholder="e.g. LHR, Heathrow"
                    value={departureAirport}
                    onChange={(e) => setDepartureAirport(e.target.value)}
                    required
                    className="w-full pl-10"
                  />
                  <Plane className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="arrivalAirport" className="flex items-center gap-2">
                  <Plane className="h-4 w-4 rotate-90 text-primary" /> Arrival Airport
                </Label>
                <div className="relative">
                  <Input
                    id="arrivalAirport"
                    placeholder="e.g. CDG, Charles de Gaulle"
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
          </form>
        </div>
      </div>
    </section>
  );
};

export default QuickEligibilityCheck;
