
import React, { useState } from "react";
import { format, parse, isValid } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type DateAndAmountSectionProps = {
  date: Date;
  amount: string;
  errors: Record<string, string>;
  handleChange: (field: string, value: any) => void;
  datePickerOpen: boolean;
  setDatePickerOpen: (open: boolean) => void;
};

const DateAndAmountSection = ({
  date,
  amount,
  errors,
  handleChange,
  datePickerOpen,
  setDatePickerOpen,
}: DateAndAmountSectionProps) => {
  const [dateInputValue, setDateInputValue] = useState(
    date ? format(date, "dd.MM.yyyy") : ""
  );

  const handleDateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDateInputValue(value);

    // Parse the input date when it looks complete (is 10 characters)
    if (value.length >= 8) {
      try {
        // Try to parse the date with different common formats
        let parsedDate;
        const formats = ["dd.MM.yyyy", "dd/MM/yyyy", "dd-MM-yyyy"];
        
        for (const formatStr of formats) {
          parsedDate = parse(value, formatStr, new Date());
          if (isValid(parsedDate)) {
            handleChange("date", parsedDate);
            break;
          }
        }
      } catch (error) {
        // If parsing fails, don't update the date
        console.log("Invalid date format:", error);
      }
    }
  };

  const handleCalendarSelect = (newDate: Date | undefined) => {
    if (newDate) {
      handleChange("date", newDate);
      setDateInputValue(format(newDate, "dd.MM.yyyy"));
      setDatePickerOpen(false);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label>Flight Date</Label>
        <div className="flex">
          <Input
            value={dateInputValue}
            onChange={handleDateInputChange}
            placeholder="DD.MM.YYYY"
            className="rounded-r-none"
          />
          <Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="rounded-l-none border-l-0"
                type="button"
              >
                <CalendarIcon className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 z-50" align="start" sideOffset={4}>
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleCalendarSelect}
                initialFocus
                className="touch-manipulation pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>
        {errors.date && <p className="text-sm text-red-500">{errors.date}</p>}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="amount">Compensation Amount</Label>
        <Input
          id="amount"
          value={amount}
          onChange={(e) => handleChange("amount", e.target.value)}
          placeholder="e.g. 400"
        />
        {errors.amount && <p className="text-sm text-red-500">{errors.amount}</p>}
      </div>
    </div>
  );
};

export default DateAndAmountSection;
