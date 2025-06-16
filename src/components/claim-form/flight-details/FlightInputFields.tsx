import React, { useState } from 'react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import AirlineSelect from '@/components/claim-form/flight-details/AirlineSelect.tsx';
import { Airline } from '@/components/claim-form/flight-details/interfaces/Airline.interface.ts';

interface DepartureDatePickerProps {
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
  airline: Airline | null;
  setAirline: (value: Airline) => void;
}

const toUtcMidnight = (d: Date) =>
  new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));

const DepartureDatePicker: React.FC<DepartureDatePickerProps> = ({
  selectedDate,
  setSelectedDate,
  airline,
  setAirline,
}) => {
  const [datePickerOpen, setDatePickerOpen] = useState(false);

  return (
    <div className="space-y-2 flex flex-row-reverse align-middle gap-6">
      <div className="w-full">
        <label className="text-sm font-medium leading-none">
          Departure Date
        </label>

        <Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                'w-full pl-3 text-left font-normal mt-2',
                !selectedDate && 'text-muted-foreground',
              )}
              type="button"
            >
              {selectedDate ? (
                format(selectedDate, 'PPP')
              ) : (
                <span>Select a date</span>
              )}
              <Calendar className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>

          <PopoverContent
            className="w-auto p-0 z-50"
            align="start"
            sideOffset={4}
          >
            <CalendarComponent
              mode="single"
              selected={selectedDate ?? undefined}
              onSelect={(date) => {
                setSelectedDate(date ? toUtcMidnight(date) : null);
                if (date) setDatePickerOpen(false);
              }}
              initialFocus
              className="touch-manipulation"
            />
          </PopoverContent>
        </Popover>
      </div>

      <AirlineSelect setAirline={setAirline} airline={airline} />
    </div>
  );
};

export default DepartureDatePicker;
