
import React, { useState, useEffect } from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Plane, Calendar, MapPin } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { flightDetailsSchema } from "@/components/claim-form/schemas";
import AirlineSelect from "./AirlineSelect";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { format, parse, isValid } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";

interface FlightInputFieldsProps {
  form: UseFormReturn<z.infer<typeof flightDetailsSchema>>;
}

const FlightInputFields: React.FC<FlightInputFieldsProps> = ({ form }) => {
  const [datePickerOpen, setDatePickerOpen] = React.useState(false);
  const [dateInputValue, setDateInputValue] = useState("");
  
  // Initialize date input value from form if available
  useEffect(() => {
    const currentDate = form.getValues().departureDate;
    if (currentDate) {
      setDateInputValue(format(new Date(currentDate), "dd.MM.yyyy"));
    }
  }, [form]);

  const handleDateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDateInputValue(value);

    // Parse the input date when it looks complete
    if (value.length >= 8) {
      try {
        // Try to parse the date with different common formats
        let parsedDate;
        const formats = ["dd.MM.yyyy", "dd/MM/yyyy", "dd-MM-yyyy"];
        
        for (const formatStr of formats) {
          parsedDate = parse(value, formatStr, new Date());
          if (isValid(parsedDate)) {
            form.setValue("departureDate", format(parsedDate, "yyyy-MM-dd"));
            break;
          }
        }
      } catch (error) {
        // If parsing fails, don't update the date
        console.log("Invalid date format:", error);
      }
    }
  };

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
            <div className="flex">
              <FormControl>
                <Input
                  value={dateInputValue}
                  onChange={handleDateInputChange}
                  placeholder="DD.MM.YYYY"
                  className="rounded-r-none"
                />
              </FormControl>
              <Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="rounded-l-none border-l-0"
                    type="button"
                  >
                    <Calendar className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 z-50" align="start" sideOffset={4}>
                  <CalendarComponent
                    mode="single"
                    selected={field.value ? new Date(field.value) : undefined}
                    onSelect={(date) => {
                      if (date) {
                        field.onChange(format(date, "yyyy-MM-dd"));
                        setDateInputValue(format(date, "dd.MM.yyyy"));
                        setDatePickerOpen(false);
                      }
                    }}
                    initialFocus
                    className="touch-manipulation"
                    captionLayout="dropdown-buttons"
                  />
                </PopoverContent>
              </Popover>
            </div>
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
