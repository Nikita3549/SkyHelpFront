
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { UseFormSetValue } from "react-hook-form";
import { z } from "zod";
import { flightDetailsSchema } from "@/components/claim-form/schemas";

// Flight data interface
export interface FlightData {
  id: string;
  flightNumber: string;
  departureTime: string;
  arrivalTime: string;
  departureAirport: string;
  arrivalAirport: string;
}

interface FlightSelectionCardsProps {
  flights: FlightData[];
  onSelectFlight: (flight: FlightData) => void;
  selectedFlightId: string | null;
  setValue: UseFormSetValue<z.infer<typeof flightDetailsSchema>>;
}

const FlightSelectionCards: React.FC<FlightSelectionCardsProps> = ({
  flights,
  onSelectFlight,
  selectedFlightId,
  setValue
}) => {
  const handleSelectFlight = (flightId: string) => {
    const selectedFlight = flights.find(flight => flight.id === flightId);
    if (selectedFlight) {
      onSelectFlight(selectedFlight);
      setValue("flightNumber", selectedFlight.flightNumber);
    } else if (flightId === "not-found") {
      // Handle "I can't find my flight" option
      onSelectFlight({
        id: "not-found",
        flightNumber: "",
        departureTime: "",
        arrivalTime: "",
        departureAirport: "",
        arrivalAirport: ""
      });
    }
  };

  return (
    <div className="my-6">
      <h3 className="text-2xl font-bold mb-6 text-blue-900">
        Next up, please select your flight from the list below:
      </h3>
      
      <div className="flex justify-between text-gray-400 px-4 mb-2">
        <span>Scheduled time</span>
        <span>Flight number</span>
      </div>
      
      <RadioGroup 
        value={selectedFlightId || ""} 
        onValueChange={handleSelectFlight}
        className="space-y-3"
      >
        {flights.map((flight) => (
          <FormItem key={flight.id} className="flex items-start space-x-0 space-y-0">
            <FormControl>
              <RadioGroupItem value={flight.id} id={`flight-${flight.id}`} className="sr-only" />
            </FormControl>
            <FormLabel 
              htmlFor={`flight-${flight.id}`} 
              className="w-full font-normal cursor-pointer"
            >
              <Card className={`w-full border rounded-lg transition-colors ${selectedFlightId === flight.id ? 'border-blue-600 bg-blue-50' : 'border-gray-200'}`}>
                <CardContent className="p-4 flex justify-between items-center">
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-full border mr-4 flex items-center justify-center ${selectedFlightId === flight.id ? 'border-blue-600 bg-white' : 'border-gray-300'}`}>
                      {selectedFlightId === flight.id && (
                        <div className="w-3 h-3 rounded-full bg-blue-600" />
                      )}
                    </div>
                    <div className="flex items-center space-x-2 text-lg">
                      <span className="font-medium">{flight.departureTime}</span>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-400">
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="font-medium">{flight.arrivalTime}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-medium">{flight.flightNumber}</div>
                  </div>
                </CardContent>
              </Card>
            </FormLabel>
          </FormItem>
        ))}

        {/* "I can't find my flight" option */}
        <FormItem className="flex items-start space-x-0 space-y-0">
          <FormControl>
            <RadioGroupItem value="not-found" id="flight-not-found" className="sr-only" />
          </FormControl>
          <FormLabel 
            htmlFor="flight-not-found" 
            className="w-full font-normal cursor-pointer"
          >
            <Card className={`w-full border rounded-lg transition-colors ${selectedFlightId === "not-found" ? 'border-blue-600 bg-blue-50' : 'border-gray-200'}`}>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <div className={`w-5 h-5 rounded-full border mr-4 flex items-center justify-center ${selectedFlightId === "not-found" ? 'border-blue-600 bg-white' : 'border-gray-300'}`}>
                    {selectedFlightId === "not-found" && (
                      <div className="w-3 h-3 rounded-full bg-blue-600" />
                    )}
                  </div>
                  <span className="text-lg">I can't find my flight</span>
                </div>
              </CardContent>
            </Card>
          </FormLabel>
        </FormItem>
      </RadioGroup>
    </div>
  );
};

export default FlightSelectionCards;
