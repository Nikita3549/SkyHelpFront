
import React from "react";
import { format } from "date-fns";
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
  // Format date for display
  const formattedDate = date ? format(date, "PPP") : "Pick a date";

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label>Flight Date</Label>
        <Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {formattedDate}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 z-50" align="start" sideOffset={4}>
            <Calendar
              mode="single"
              selected={date}
              onSelect={(newDate) => {
                if (newDate) {
                  handleChange("date", newDate);
                  setDatePickerOpen(false);
                }
              }}
              initialFocus
              className="touch-manipulation pointer-events-auto"
              // The updated Calendar component will handle year navigation internally
            />
          </PopoverContent>
        </Popover>
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
