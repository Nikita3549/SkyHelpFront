
import React from "react";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { flightDetailsSchema } from "@/components/claim-form/schemas";

interface ConnectingFlightsFormProps {
  form: UseFormReturn<z.infer<typeof flightDetailsSchema>>;
  connectionFlights: string[];
  setConnectionFlights: React.Dispatch<React.SetStateAction<string[]>>;
}

const ConnectingFlightsForm: React.FC<ConnectingFlightsFormProps> = ({ 
  form, 
  connectionFlights,
  setConnectionFlights 
}) => {
  const connectingFlightsValue = form.watch("connectingFlights");

  const handleAddConnectionFlight = () => {
    setConnectionFlights([...connectionFlights, ""]);
  };

  const handleConnectionAirportChange = (index: number, value: string) => {
    const newConnectionFlights = [...connectionFlights];
    newConnectionFlights[index] = value;
    setConnectionFlights(newConnectionFlights);
    
    // Update the form value
    form.setValue("connectionAirports", 
      newConnectionFlights.filter(airport => airport.trim() !== ""));
  };

  const handleRemoveConnectionFlight = (index: number) => {
    const newConnectionFlights = [...connectionFlights];
    newConnectionFlights.splice(index, 1);
    
    // Ensure there's always at least one empty field if all are removed
    if (newConnectionFlights.length === 0) {
      newConnectionFlights.push("");
    }
    
    setConnectionFlights(newConnectionFlights);
    
    // Update the form value
    form.setValue("connectionAirports", 
      newConnectionFlights.filter(airport => airport.trim() !== ""));
  };

  if (connectingFlightsValue !== "yes") {
    return null;
  }

  return (
    <div className="space-y-6 bg-slate-50 p-6 rounded-lg mt-6">
      <h3 className="text-lg font-medium text-gray-900">Where did you have to change flight(s)?</h3>
      
      {connectionFlights.map((airport, index) => (
        <div key={index} className="space-y-2">
          <FormLabel className="text-base font-medium">
            {index + 1}. City or airport name
          </FormLabel>
          <div className="relative">
            <Input
              placeholder="e.g. London or LHR"
              value={airport}
              onChange={(e) => handleConnectionAirportChange(index, e.target.value)}
              className="w-full pr-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => handleRemoveConnectionFlight(index)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
              aria-label="Remove connecting flight"
            >
              <X className="h-4 w-4 text-gray-500 hover:text-gray-900" />
            </Button>
          </div>
        </div>
      ))}
      
      <Button
        type="button"
        variant="outline"
        className="mt-4 text-primary hover:text-primary hover:bg-blue-50"
        onClick={handleAddConnectionFlight}
      >
        <Plus className="h-4 w-4 mr-2" />
        Add another connecting flight
      </Button>
    </div>
  );
};

export default ConnectingFlightsForm;
