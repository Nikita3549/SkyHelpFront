
import React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { countries, CountryOption } from "@/lib/countries";
import { FormControl } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

interface CountrySelectProps {
  value: string;
  onValueChange: (value: string) => void;
}

const CountrySelect: React.FC<CountrySelectProps> = ({ value, onValueChange }) => {
  const isMobile = useIsMobile();
  const [open, setOpen] = React.useState(false);
  
  // Find the country object based on the value
  const selectedCountry = React.useMemo(() => 
    countries.find(country => country.value === value || country.label === value), 
    [value]
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "w-full justify-between font-normal",
              !value && "text-muted-foreground",
              isMobile ? "h-12 px-3 py-3 text-base" : "h-10 px-3 py-2 text-sm"
            )}
          >
            {selectedCountry ? (
              <span className="flex items-center">
                <span className="mr-2">{selectedCountry.flag}</span>
                {selectedCountry.label}
              </span>
            ) : (
              "Select your country"
            )}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start" sideOffset={5}>
        <Command>
          <CommandInput placeholder="Search for a country..." />
          <CommandEmpty>No country found.</CommandEmpty>
          <CommandGroup className="max-h-64 overflow-y-auto">
            {countries.map((country) => (
              <CommandItem
                key={country.value}
                value={country.label}
                onSelect={() => {
                  onValueChange(country.label);
                  setOpen(false);
                }}
              >
                <span className="mr-2">{country.flag}</span>
                <span>{country.label}</span>
                <Check
                  className={cn(
                    "ml-auto h-4 w-4",
                    selectedCountry?.label === country.label ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default CountrySelect;
