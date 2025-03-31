
import React from "react";
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { flightDetailsSchema } from "@/components/claim-form/schemas";
import { Plane } from "lucide-react";

interface ProblemFlightSelectorProps {
  form: UseFormReturn<z.infer<typeof flightDetailsSchema>>;
  connectionFlights: string[];
}

const ProblemFlightSelector: React.FC<ProblemFlightSelectorProps> = ({ 
  form, 
  connectionFlights 
}) => {
  const connectingFlightsValue = form.watch("connectingFlights");
  const departureAirport = form.watch("departureAirport");
  const arrivalAirport = form.watch("arrivalAirport");
  
  if (connectingFlightsValue !== "yes" || !connectionFlights.length) {
    return null;
  }

  // Filter out empty entries
  const validConnectionAirports = connectionFlights.filter(airport => airport.trim() !== "");
  
  if (validConnectionAirports.length === 0) {
    return null;
  }

  // Create flight segments based on departure, connections, and arrival
  const createFlightSegments = () => {
    const segments = [];
    let currentDeparture = departureAirport;
    
    // Add segments between departure and each connection
    for (let i = 0; i < validConnectionAirports.length; i++) {
      segments.push({
        id: `segment-${i}`,
        departure: currentDeparture,
        arrival: validConnectionAirports[i],
        value: `${currentDeparture} to ${validConnectionAirports[i]}`
      });
      currentDeparture = validConnectionAirports[i];
    }
    
    // Add final segment from last connection to arrival
    segments.push({
      id: `segment-${validConnectionAirports.length}`,
      departure: currentDeparture,
      arrival: arrivalAirport,
      value: `${currentDeparture} to ${arrivalAirport}`
    });
    
    return segments;
  };

  const flightSegments = createFlightSegments();
  
  const handleSegmentSelect = (value: string) => {
    form.setValue("problematicFlightSegment", value);
  };

  return (
    <div className="border border-input rounded-md p-4 mb-2">
      <h3 className="text-base font-medium mb-3">Select the flight that didn't go as planned</h3>
      
      <FormField
        control={form.control}
        name="problematicFlightSegment"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="sr-only">Problematic Flight Segment</FormLabel>
            <div className="space-y-2">
              {flightSegments.map((segment) => (
                <div
                  key={segment.id}
                  onClick={() => handleSegmentSelect(segment.value)}
                  className={`flex items-center gap-2 border rounded-md p-3 cursor-pointer transition-colors hover:border-primary hover:bg-slate-50 ${
                    field.value === segment.value ? "bg-blue-50 border-primary" : ""
                  }`}
                >
                  <input
                    type="radio"
                    id={segment.id}
                    checked={field.value === segment.value}
                    onChange={() => {}} // Handled by onClick on the parent div
                    className="h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                  <div className="flex items-center gap-1">
                    <span className="text-sm">{segment.departure}</span>
                    <Plane className="text-primary h-3.5 w-3.5 mx-1" />
                    <span className="text-sm">{segment.arrival}</span>
                  </div>
                </div>
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default ProblemFlightSelector;
