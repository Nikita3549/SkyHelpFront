
import React from "react";
import { FormField, FormItem, FormLabel } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { flightDetailsSchema } from "@/components/claim-form/schemas";
import ConnectingFlightsForm from "./ConnectingFlightsForm";

interface ConnectingFlightsSectionProps {
  form: UseFormReturn<z.infer<typeof flightDetailsSchema>>;
  connectionFlights: string[];
  setConnectionFlights: React.Dispatch<React.SetStateAction<string[]>>;
}

const ConnectingFlightsSection: React.FC<ConnectingFlightsSectionProps> = ({ 
  form,
  connectionFlights,
  setConnectionFlights
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Did you have any connecting flights?</h3>
      
      <FormField
        control={form.control}
        name="connectingFlights"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel className="sr-only">Connecting Flights</FormLabel>
            <RadioGroup
              onValueChange={(value) => {
                field.onChange(value);
                // Reset connection airports if "no" is selected
                if (value === "no") {
                  form.setValue("connectionAirports", []);
                  setConnectionFlights([""]);
                }
              }}
              defaultValue={field.value}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div className="border rounded-md p-4 cursor-pointer transition-colors hover:border-primary hover:bg-slate-50">
                <RadioGroupItem
                  value="no"
                  id="connectingFlights-no"
                  className="sr-only"
                />
                <label
                  htmlFor="connectingFlights-no"
                  className="flex items-center cursor-pointer space-x-2"
                >
                  <div className="w-4 h-4 border border-gray-300 rounded-full flex items-center justify-center">
                    {field.value === "no" && (
                      <div className="w-2 h-2 bg-primary rounded-full" />
                    )}
                  </div>
                  <span className="text-base">No, I didn't</span>
                </label>
              </div>
              
              <div className="border rounded-md p-4 cursor-pointer transition-colors hover:border-primary hover:bg-slate-50">
                <RadioGroupItem
                  value="yes"
                  id="connectingFlights-yes"
                  className="sr-only"
                />
                <label
                  htmlFor="connectingFlights-yes"
                  className="flex items-center cursor-pointer space-x-2"
                >
                  <div className="w-4 h-4 border border-gray-300 rounded-full flex items-center justify-center">
                    {field.value === "yes" && (
                      <div className="w-2 h-2 bg-primary rounded-full" />
                    )}
                  </div>
                  <span className="text-base">Yes, I had to change flights</span>
                </label>
              </div>
            </RadioGroup>
          </FormItem>
        )}
      />

      <ConnectingFlightsForm 
        form={form} 
        connectionFlights={connectionFlights}
        setConnectionFlights={setConnectionFlights}
      />
    </div>
  );
};

export default ConnectingFlightsSection;
