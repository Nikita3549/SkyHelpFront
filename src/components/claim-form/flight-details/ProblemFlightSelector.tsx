
import React from "react";
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
    <div className="border border-input rounded-md p-4 mb-2">
      <h3 className="text-base font-medium mb-3">Select the flight that didn't go as planned</h3>
      
      <FormField
        control={form.control}
        name="problematicFlightSegment"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="sr-only">Problematic Flight Segment</FormLabel>
            <RadioGroup
              onValueChange={field.onChange}
              value={field.value}
              className="space-y-2"
            >
              {flightSegments.map((segment) => (
                <label
                  key={segment.id}
                  htmlFor={segment.id}
                  className="flex items-center gap-2 border rounded-md p-3 cursor-pointer transition-colors hover:border-primary hover:bg-slate-50"
                >
                  <RadioGroupItem
                    id={segment.id}
                    value={segment.value}
                  />
                  <div className="flex items-center gap-1">
                    <span className="font-medium">{segment.departure}</span>
                    <Plane className="text-primary h-3 w-3 mx-1" />
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
