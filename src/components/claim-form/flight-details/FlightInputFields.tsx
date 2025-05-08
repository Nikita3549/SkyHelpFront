
import React, { useEffect } from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Plane, Calendar, Loader2 } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { flightDetailsSchema } from "@/components/claim-form/schemas";
import AirlineSelect from "./AirlineSelect";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import FlightSelectionCards from "./FlightSelectionCards";
import { useFlightData } from "@/hooks/useFlightData";

interface FlightInputFieldsProps {
  form: UseFormReturn<z.infer<typeof flightDetailsSchema>>;
}

const FlightInputFields: React.FC<FlightInputFieldsProps> = ({ form }) => {
  const [datePickerOpen, setDatePickerOpen] = React.useState(false);
  
  // Watch airline and departure date values to trigger flight search
  const airline = form.watch("airline");
  const departureDate = form.watch("departureDate");
  const departureAirport = form.watch("departureAirport");
  const arrivalAirport = form.watch("arrivalAirport");

  // Use the flight data hook to get available flights
  const { 
    flights, 
    isLoading, 
    selectedFlightId, 
    selectFlight 
  } = useFlightData({
    airline,
    departureDate,
    departureAirport,
    arrivalAirport
  });

  // Whether to show the flight selection step
  const showFlightSelection = !!airline && !!departureDate;
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Airline Select - first position */}
        <AirlineSelect form={form} />

        {/* Departure Date - second position */}
        <FormField
          control={form.control}
          name="departureDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Departure Date</FormLabel>
              <Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                      type="button"
                    >
                      {field.value ? (
                        format(new Date(field.value), "PPP")
                      ) : (
                        <span>Select a date</span>
                      )}
                      <Calendar className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 z-50" align="start" sideOffset={4}>
                  <CalendarComponent
                    mode="single"
                    selected={field.value ? new Date(field.value) : undefined}
                    onSelect={(date) => {
                      field.onChange(date ? format(date, "yyyy-MM-dd") : "");
                      if (date) setDatePickerOpen(false);
                    }}
                    initialFocus
                    className="touch-manipulation"
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Flight Selection Step */}
      {showFlightSelection && (
        <div className="bg-gray-50 p-6 rounded-lg my-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="animate-spin h-6 w-6 text-primary mr-2" />
              <span className="text-gray-600">Loading available flights...</span>
            </div>
          ) : flights.length > 0 ? (
            <FlightSelectionCards 
              flights={flights} 
              onSelectFlight={selectFlight} 
              selectedFlightId={selectedFlightId}
              setValue={form.setValue}
            />
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600">No flights found for the selected date and airline.</p>
            </div>
          )}
        </div>
      )}

      {/* Flight Number - now only shown if "I can't find my flight" is selected or no flights available */}
      {(selectedFlightId === "not-found" || (!isLoading && showFlightSelection && flights.length === 0)) && (
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
        </div>
      )}
    </div>
  );
};

export default FlightInputFields;
