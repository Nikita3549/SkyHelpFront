
import React from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Plane, Calendar, MapPin } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { flightDetailsSchema } from "@/components/claim-form/schemas";
import AirlineSelect from "./AirlineSelect";

interface FlightInputFieldsProps {
  form: UseFormReturn<z.infer<typeof flightDetailsSchema>>;
}

const FlightInputFields: React.FC<FlightInputFieldsProps> = ({ form }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormField
        control={form.control}
        name="flightNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Flight Number</FormLabel>
            <FormControl>
              <div className="relative">
                <Input placeholder="e.g. BA1234" {...field} />
                <Plane className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <AirlineSelect form={form} />

      <FormField
        control={form.control}
        name="departureDate"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Departure Date</FormLabel>
            <FormControl>
              <div className="relative">
                <Input type="date" {...field} />
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="departureAirport"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Departure Airport</FormLabel>
            <FormControl>
              <div className="relative">
                <Input placeholder="e.g. LHR" {...field} />
                <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="arrivalAirport"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Arrival Airport</FormLabel>
            <FormControl>
              <div className="relative">
                <Input placeholder="e.g. CDG" {...field} />
                <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default FlightInputFields;
