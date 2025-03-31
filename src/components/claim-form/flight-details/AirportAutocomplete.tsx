
import React, { useState, useRef, useEffect } from "react";
import { Command, CommandInput, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

// Common IATA airports and cities
const airports = [
  { code: "LHR", name: "London Heathrow", city: "London", country: "United Kingdom" },
  { code: "CDG", name: "Charles de Gaulle", city: "Paris", country: "France" },
  { code: "FRA", name: "Frankfurt Airport", city: "Frankfurt", country: "Germany" },
  { code: "AMS", name: "Amsterdam Schiphol", city: "Amsterdam", country: "Netherlands" },
  { code: "MAD", name: "Madrid Barajas", city: "Madrid", country: "Spain" },
  { code: "FCO", name: "Leonardo da Vinci", city: "Rome", country: "Italy" },
  { code: "BCN", name: "Barcelona El Prat", city: "Barcelona", country: "Spain" },
  { code: "MUC", name: "Munich Airport", city: "Munich", country: "Germany" },
  { code: "ZRH", name: "Zurich Airport", city: "Zurich", country: "Switzerland" },
  { code: "DUB", name: "Dublin Airport", city: "Dublin", country: "Ireland" },
  { code: "CPH", name: "Copenhagen Airport", city: "Copenhagen", country: "Denmark" },
  { code: "ARN", name: "Stockholm Arlanda", city: "Stockholm", country: "Sweden" },
  { code: "VIE", name: "Vienna International", city: "Vienna", country: "Austria" },
  { code: "LIS", name: "Lisbon Airport", city: "Lisbon", country: "Portugal" },
  { code: "WAW", name: "Warsaw Chopin", city: "Warsaw", country: "Poland" },
  { code: "HEL", name: "Helsinki Airport", city: "Helsinki", country: "Finland" },
  { code: "BRU", name: "Brussels Airport", city: "Brussels", country: "Belgium" },
  { code: "ATH", name: "Athens International", city: "Athens", country: "Greece" },
  { code: "OSL", name: "Oslo Airport", city: "Oslo", country: "Norway" },
  { code: "BUD", name: "Budapest Ferenc Liszt", city: "Budapest", country: "Hungary" },
  { code: "JFK", name: "John F. Kennedy", city: "New York", country: "United States" },
  { code: "LAX", name: "Los Angeles International", city: "Los Angeles", country: "United States" },
  { code: "ORD", name: "O'Hare International", city: "Chicago", country: "United States" },
  { code: "DFW", name: "Dallas/Fort Worth", city: "Dallas", country: "United States" },
  { code: "DXB", name: "Dubai International", city: "Dubai", country: "United Arab Emirates" },
  { code: "HND", name: "Tokyo Haneda", city: "Tokyo", country: "Japan" },
  { code: "SIN", name: "Singapore Changi", city: "Singapore", country: "Singapore" },
  { code: "ICN", name: "Incheon International", city: "Seoul", country: "South Korea" },
  { code: "PEK", name: "Beijing Capital", city: "Beijing", country: "China" },
  { code: "SYD", name: "Sydney Airport", city: "Sydney", country: "Australia" },
];

interface AirportAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  onRemove?: () => void;
}

const AirportAutocomplete: React.FC<AirportAutocompleteProps> = ({
  value,
  onChange,
  placeholder = "Search airport...",
  className,
  onRemove
}) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    // Update display value if the input value changes externally
    setDisplayValue(value);
  }, [value]);

  // Filter airports based on search query
  const filteredAirports = airports.filter(airport => {
    const lowercaseQuery = searchQuery.toLowerCase();
    return (
      airport.code.toLowerCase().includes(lowercaseQuery) ||
      airport.name.toLowerCase().includes(lowercaseQuery) ||
      airport.city.toLowerCase().includes(lowercaseQuery) ||
      airport.country.toLowerCase().includes(lowercaseQuery)
    );
  });

  // Select an airport from the dropdown
  const handleSelect = (airportValue: string) => {
    const selectedAirport = airports.find(
      a => a.code === airportValue
    );
    
    if (selectedAirport) {
      const formattedValue = `${selectedAirport.city} (${selectedAirport.code})`;
      onChange(formattedValue);
      setDisplayValue(formattedValue);
    } else {
      onChange(airportValue);
      setDisplayValue(airportValue);
    }
    
    setOpen(false);
  };

  return (
    <div className={cn("relative", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="relative">
            <Input
              value={displayValue}
              onChange={(e) => {
                const newValue = e.target.value;
                setDisplayValue(newValue);
                onChange(newValue);
                if (!open) setOpen(true);
              }}
              onClick={() => setOpen(true)}
              onFocus={() => setOpen(true)}
              placeholder={placeholder}
              className="w-full"
            />
            {onRemove && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove();
                }}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-900"
                aria-label="Remove"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Command>
            <CommandInput 
              placeholder="Search airport or city..." 
              value={searchQuery}
              onValueChange={setSearchQuery}
              className="h-9"
            />
            <CommandEmpty>No airport found.</CommandEmpty>
            <CommandGroup className="max-h-64 overflow-auto">
              {filteredAirports.map((airport) => (
                <CommandItem
                  key={airport.code}
                  value={airport.code}
                  onSelect={handleSelect}
                  className="flex items-center"
                >
                  <div className="flex-1">
                    <div className="font-medium">{airport.city} ({airport.code})</div>
                    <div className="text-xs text-gray-500">{airport.name}, {airport.country}</div>
                  </div>
                  {displayValue === `${airport.city} (${airport.code})` && (
                    <Check className="h-4 w-4 text-green-500 ml-2" />
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default AirportAutocomplete;
