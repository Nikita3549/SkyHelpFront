import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type FlightInfoSectionProps = {
  airline: string;
  flightnumber: string;
  errors: Record<string, string>;
  handleChange: (field: string, value: any) => void;
};

const FlightInfoSection = ({
  airline,
  flightnumber,
  errors,
  handleChange,
}: FlightInfoSectionProps) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="airline">Airline</Label>
        <Select
          value={airline}
          onValueChange={(value) => handleChange('airline', value)}
        >
          <SelectTrigger id="airline">
            <SelectValue placeholder="Select airline" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Lufthansa">Lufthansa</SelectItem>
            <SelectItem value="British Airways">British Airways</SelectItem>
            <SelectItem value="Air France">Air France</SelectItem>
            <SelectItem value="Ryanair">Ryanair</SelectItem>
            <SelectItem value="EasyJet">EasyJet</SelectItem>
            <SelectItem value="Eurowings">Eurowings</SelectItem>
            <SelectItem value="KLM">KLM</SelectItem>
          </SelectContent>
        </Select>
        {errors.airline && (
          <p className="text-sm text-red-500">{errors.airline}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="flightnumber">Flight Number</Label>
        <Input
          id="flightnumber"
          value={flightnumber}
          onChange={(e) => handleChange('flightnumber', e.target.value)}
          placeholder="e.g. LH1234"
        />
        {errors.flightnumber && (
          <p className="text-sm text-red-500">{errors.flightnumber}</p>
        )}
      </div>
    </div>
  );
};

export default FlightInfoSection;
