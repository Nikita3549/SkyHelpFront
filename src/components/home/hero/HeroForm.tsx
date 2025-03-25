
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Check, Calendar as CalendarIcon, Plane } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";

const HeroForm = () => {
  const [departureAirport, setDepartureAirport] = useState("");
  const [arrivalAirport, setArrivalAirport] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [datePickerOpen, setDatePickerOpen] = useState(false);

  // Format the date as required by the flight details form
  const formattedDate = date ? format(date, "yyyy-MM-dd") : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="relative"
    >
      <div className="glass rounded-2xl p-6 md:p-8 shadow-xl bg-white">
        <div className="flex flex-col space-y-5">
          <h3 className="text-xl font-medium text-gray-800">Check your eligibility for compensation</h3>
          <div className="grid gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Departing from</label>
              <div className="relative">
                <Plane className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input 
                  className="pl-10"
                  placeholder="e.g. New York or JFK"
                  value={departureAirport}
                  onChange={(e) => setDepartureAirport(e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Final destination</label>
              <div className="relative">
                <Plane className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 rotate-90" />
                <Input 
                  className="pl-10"
                  placeholder="e.g. London or LHR"
                  value={arrivalAirport}
                  onChange={(e) => setArrivalAirport(e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Flight Date</label>
              <Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full px-4 py-2 h-10 rounded-md border border-gray-200 justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Select a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 z-50" align="start" sideOffset={4}>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(newDate) => {
                      setDate(newDate);
                      if (newDate) setDatePickerOpen(false);
                    }}
                    initialFocus
                    className="touch-manipulation"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          <Link 
            to="/claim" 
            state={{ 
              departureAirport, 
              arrivalAirport,
              departureDate: formattedDate
            }}
            className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5 text-center flex justify-center items-center"
          >
            Check Now
          </Link>
          
          <div className="text-xs text-gray-500 space-y-2 pt-2">
            <p className="flex items-start">
              <Check className="h-4 w-4 text-blue-600 flex-shrink-0 mr-1.5 mt-0.5" />
              <span>No obligation to continue after checking</span>
            </p>
            <p className="flex items-start">
              <Check className="h-4 w-4 text-blue-600 flex-shrink-0 mr-1.5 mt-0.5" />
              <span>No-win, no-fee — only pay if we win your case</span>
            </p>
            <p className="flex items-start">
              <Check className="h-4 w-4 text-blue-600 flex-shrink-0 mr-1.5 mt-0.5" />
              <span>We handle the entire claim process for you</span>
            </p>
          </div>
        </div>
      </div>
      
      <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-blue-500/10 rounded-full animate-float" />
      <div className="absolute -top-4 -left-4 w-12 h-12 bg-blue-600/10 rounded-full animate-float" style={{animationDelay: '1s'}} />
    </motion.div>
  );
};

export default HeroForm;
