
import React from "react";
import { FormField, FormItem, FormLabel } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { flightDetailsSchema } from "@/components/claim-form/schemas";
import { Plane } from "lucide-react";

interface ProblemFlightSelectorProps {
  form: UseFormReturn<z.infer<typeof flightDetailsSchema>>;
  departureAirport: string;
  arrivalAirport: string;
  connectionAirports: string[];
}

const ProblemFlightSelector: React.FC<ProblemFlightSelectorProps> = ({
  form,
  departureAirport,
  arrivalAirport,
  connectionAirports,
}) => {
  // Filter out empty connection airports
  const validConnectionAirports = connectionAirports.filter(
    (airport) => airport.trim() !== ""
  );

  // If there are no connection airports, don't render this component
  if (validConnectionAirports.length === 0) {
    return null;
  }

  // Create flight segments for selection
  const flights = [];
  let fromAirport = departureAirport;

  // Add segment from departure to first connection
  if (validConnectionAirports.length > 0) {
    flights.push({
      from: fromAirport,
      to: validConnectionAirports[0],
      value: `${fromAirport}-${validConnectionAirports[0]}`,
    });
  }

  // Add segments between connections
  for (let i = 0; i < validConnectionAirports.length - 1; i++) {
    flights.push({
      from: validConnectionAirports[i],
      to: validConnectionAirports[i + 1],
      value: `${validConnectionAirports[i]}-${validConnectionAirports[i + 1]}`,
    });
  }

  // Add final segment from last connection to arrival
  if (validConnectionAirports.length > 0) {
    flights.push({
      from: validConnectionAirports[validConnectionAirports.length - 1],
      to: arrivalAirport,
      value: `${
        validConnectionAirports[validConnectionAirports.length - 1]
      }-${arrivalAirport}`,
    });
  }

  return (
    <div className="mt-6 space-y-4">
      <h3 className="text-lg font-medium">Select the flight that didn't go as planned</h3>

      <FormField
        control={form.control}
        name="problemFlight"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel className="sr-only">Problem Flight</FormLabel>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="space-y-3"
              value={field.value}
            >
              {flights.map((flight, index) => (
                <label
                  key={index}
                  htmlFor={`flight-${index}`}
                  className="border rounded-md p-4 cursor-pointer transition-colors hover:border-primary hover:bg-slate-50 flex items-center space-x-2"
                >
                  <RadioGroupItem value={flight.value} id={`flight-${index}`} />
                  <div className="flex items-center space-x-2 ml-2">
                    <span className="text-base font-medium">{flight.from}</span>
                    <Plane className="h-4 w-4 text-gray-500 mx-2 transform rotate-90" />
                    <span className="text-base font-medium">{flight.to}</span>
                  </div>
                </label>
              ))}
            </RadioGroup>
          </FormItem>
        )}
      />
    </div>
  );
};

export default ProblemFlightSelector;
