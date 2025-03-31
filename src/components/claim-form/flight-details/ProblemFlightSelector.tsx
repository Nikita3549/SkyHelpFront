
import React from "react";
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup } from "@/components/ui/radio-group";
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

  return (
    <div className="space-y-4 bg-slate-50 p-6 rounded-lg mt-6">
      <h3 className="text-lg font-medium text-slate-900">Select the flight that didn't go as planned</h3>
      
      <FormField
        control={form.control}
        name="problematicFlightSegment"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="sr-only">Problematic Flight Segment</FormLabel>
            <RadioGroup
              onValueChange={field.onChange}
              value={field.value}
              className="space-y-3"
            >
              {flightSegments.map((segment) => (
                <label
                  key={segment.id}
                  htmlFor={segment.id}
                  className="flex items-center gap-3 border rounded-lg p-4 cursor-pointer transition-colors hover:border-primary hover:bg-white"
                >
                  <input 
                    type="radio"
                    id={segment.id}
                    value={segment.value}
                    checked={field.value === segment.value}
                    onChange={() => field.onChange(segment.value)}
                    className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                  />
                  <div className="flex items-center justify-between w-full">
                    <span className="font-medium">{segment.departure}</span>
                    <Plane className="text-blue-400 mx-2 h-5 w-5" />
                    <span className="font-medium">{segment.arrival}</span>
                  </div>
                </label>
              ))}
            </RadioGroup>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default ProblemFlightSelector;
