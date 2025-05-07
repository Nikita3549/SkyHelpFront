
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { UseFormSetValue } from "react-hook-form";
import { z } from "zod";
import { flightDetailsSchema } from "@/components/claim-form/schemas";
import { PlaneTakeoff, PlaneLanding, Search } from "lucide-react";

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
      <h3 className="text-lg font-medium mb-4">Select your flight</h3>
      <RadioGroup 
        value={selectedFlightId || ""} 
        onValueChange={handleSelectFlight}
        className="space-y-3"
      >
        {flights.map((flight) => (
          <FormItem key={flight.id} className="flex items-start space-x-3 space-y-0">
            <FormControl>
              <RadioGroupItem value={flight.id} id={`flight-${flight.id}`} />
            </FormControl>
            <FormLabel 
              htmlFor={`flight-${flight.id}`} 
              className="w-full font-normal cursor-pointer"
            >
              <Card className={`w-full border transition-colors ${selectedFlightId === flight.id ? 'border-primary bg-primary/5' : ''}`}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                      <div className="flex items-center mb-2">
                        <PlaneTakeoff className="h-4 w-4 mr-2 text-gray-500" />
                        <span className="font-medium">{flight.departureTime}</span>
                        <span className="text-sm text-gray-500 ml-2">{flight.departureAirport}</span>
                      </div>
                      <div className="flex items-center">
                        <PlaneLanding className="h-4 w-4 mr-2 text-gray-500" />
                        <span className="font-medium">{flight.arrivalTime}</span>
                        <span className="text-sm text-gray-500 ml-2">{flight.arrivalAirport}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{flight.flightNumber}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </FormLabel>
          </FormItem>
        ))}

        {/* "I can't find my flight" option */}
        <FormItem className="flex items-start space-x-3 space-y-0">
          <FormControl>
            <RadioGroupItem value="not-found" id="flight-not-found" />
          </FormControl>
          <FormLabel 
            htmlFor="flight-not-found" 
            className="w-full font-normal cursor-pointer"
          >
            <Card className={`w-full border transition-colors ${selectedFlightId === "not-found" ? 'border-primary bg-primary/5' : ''}`}>
              <CardContent className="p-4">
                <div className="flex items-center justify-center">
                  <Search className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="font-medium">I can't find my flight</span>
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
