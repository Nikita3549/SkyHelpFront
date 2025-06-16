import React from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Airline } from '@/components/claim-form/flight-details/interfaces/Airline.interface.ts';

export const airlines: Airline[] = [
  { icao: 'RYR', name: 'Ryanair', country: 'Ireland', city: 'Dublin' },
  { icao: 'EZY', name: 'EasyJet', country: 'United Kingdom', city: 'London' },
  {
    icao: 'BAW',
    name: 'British Airways',
    country: 'United Kingdom',
    city: 'London',
  },
  { icao: 'DLH', name: 'Lufthansa', country: 'Germany', city: 'Frankfurt' },
  { icao: 'AFR', name: 'Air France', country: 'France', city: 'Paris' },
  { icao: 'KLM', name: 'KLM', country: 'Netherlands', city: 'Amsterdam' },
  { icao: 'IBE', name: 'Iberia', country: 'Spain', city: 'Madrid' },
  { icao: 'VLG', name: 'Vueling', country: 'Spain', city: 'Barcelona' },
  { icao: 'WZZ', name: 'Wizz Air', country: 'Hungary', city: 'Budapest' },
  { icao: 'NAX', name: 'Norwegian', country: 'Norway', city: 'Oslo' },
  { icao: '-', name: 'Other', country: 'Unknown', city: 'Unknown' },
];

interface AirlineSelectProps {
  airline: Airline | null;
  setAirline: (value: Airline) => void;
}

const AirlineSelect: React.FC<AirlineSelectProps> = ({
  airline,
  setAirline,
}) => {
  return (
    <div className="space-y-2 w-full" style={{ margin: '0' }}>
      <label className="text-sm font-medium">Airline</label>
      <Select
        onValueChange={(icao) => {
          const selected = airlines.find((a) => a.icao === icao);
          if (selected) setAirline(selected);
        }}
        value={airline?.icao ?? ''}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select airline" />
        </SelectTrigger>
        <SelectContent>
          {airlines.map((a) => (
            <SelectItem key={a.icao} value={a.icao}>
              {a.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default AirlineSelect;
