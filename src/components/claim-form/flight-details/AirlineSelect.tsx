
import React from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { flightDetailsSchema } from "@/components/claim-form/schemas";

// List of airlines moved from FlightDetailsStep
export const airlines = [
  { value: "ryanair", label: "Ryanair" },
  { value: "easyjet", label: "EasyJet" },
  { value: "ba", label: "British Airways" },
  { value: "lufthansa", label: "Lufthansa" },
  { value: "airfrance", label: "Air France" },
  { value: "klm", label: "KLM" },
  { value: "iberia", label: "Iberia" },
  { value: "vueling", label: "Vueling" },
  { value: "wizz", label: "Wizz Air" },
  { value: "norwegian", label: "Norwegian" },
  { value: "other", label: "Other" },
];

interface AirlineSelectProps {
  form: UseFormReturn<z.infer<typeof flightDetailsSchema>>;
}

const AirlineSelect: React.FC<AirlineSelectProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="airline"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Airline</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select airline" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {airlines.map((airline) => (
                <SelectItem key={airline.value} value={airline.value}>
                  {airline.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default AirlineSelect;
