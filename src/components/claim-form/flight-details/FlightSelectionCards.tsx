import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { UseFormSetValue } from "react-hook-form";
import { z } from "zod";
import { flightDetailsSchema } from "@/components/claim-form/schemas";
import { Plane } from "lucide-react";

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
    <div className="my-4">
      <h3 className="text-lg font-medium mb-3 text-blue-900">
        Please select your flight:
      </h3>
      
      <div className="flex justify-between text-xs text-gray-500 px-4 mb-2">
        <span>Flight time</span>
        <span>Flight #</span>
      </div>
      
      <RadioGroup 
        value={selectedFlightId || ""} 
        onValueChange={handleSelectFlight}
        className="space-y-2"
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
              <Card className={`w-full border transition-colors ${selectedFlightId === flight.id ? 'border-blue-600 bg-blue-50' : 'border-gray-200'}`}>
                <CardContent className="p-3 flex justify-between items-center">
                  <div className="flex items-center">
                    <div className={`w-4 h-4 rounded-full border mr-3 flex items-center justify-center ${selectedFlightId === flight.id ? 'border-blue-600 bg-white' : 'border-gray-300'}`}>
                      {selectedFlightId === flight.id && (
                        <div className="w-2 h-2 rounded-full bg-blue-600" />
                      )}
                    </div>
                    <div className="flex items-center space-x-1.5 text-sm">
                      <span className="font-medium">{flight.departureTime}</span>
                      <Plane size={16} className="text-gray-400" />
                      <span className="font-medium">{flight.arrivalTime}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{flight.flightNumber}</div>
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
            <Card className={`w-full border transition-colors ${selectedFlightId === "not-found" ? 'border-blue-600 bg-blue-50' : 'border-gray-200'}`}>
              <CardContent className="p-3">
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded-full border mr-3 flex items-center justify-center ${selectedFlightId === "not-found" ? 'border-blue-600 bg-white' : 'border-gray-300'}`}>
                    {selectedFlightId === "not-found" && (
                      <div className="w-2 h-2 rounded-full bg-blue-600" />
                    )}
                  </div>
                  <span className="text-sm">I can't find my flight</span>
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
