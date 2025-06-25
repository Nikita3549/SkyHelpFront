import React, { useEffect, useState, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Plane } from 'lucide-react';
import { io, Socket } from 'socket.io-client';
import { debounce } from 'lodash';

export interface Airport {
  name: string;
  city: string;
  country: string;
  icao: string;
}

interface Props {
  setAirport: (airport: Airport | null) => void;
  isDeparture: boolean;
  placeHolder: string;
  isRounded?: boolean;
  preFilled?: Airport;
  isColoredBorder?: boolean;
}

const AirportInput: React.FC<Props> = ({
  setAirport,
  isDeparture,
  placeHolder,
  isRounded = false,
  preFilled = null,
  isColoredBorder = false,
}) => {
  const [input, setInput] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [airportOptions, setAirportOptions] = useState<Airport[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [ws, setWs] = useState<Socket | null>(null);
  const debouncedLookupRef = useRef<((q: string) => void) | null>(null);

  useEffect(() => {
    const socket = io(`${import.meta.env.VITE_WS_HOST}/airports`, {
      transports: ['websocket'],
    });
    socket.connect();

    socket.on('exception', (e) => {
      console.error(e);
    });

    setWs(socket);

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!ws) return;

    const debounced = debounce((query: string) => {
      if (query.trim().length < 2) return;

      setLoading(true);
      ws.emit('lookupAirportCode', { name: query }, (ackData: Airport[]) => {
        setAirportOptions(ackData);
        setLoading(false);
      });
    }, 400);

    debouncedLookupRef.current = debounced;

    return () => {
      debounced.cancel();
    };
  }, [ws]);

  useEffect(() => {
    if (preFilled) {
      setInput(`${preFilled.name} (${preFilled.icao})`);
    }
  }, [preFilled]);

  useEffect(() => {
    setAirportOptions([]);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    setAirport(null);
    setShowDropdown(true);

    if (debouncedLookupRef.current) {
      debouncedLookupRef.current(value);
    }
  };

  const handleSelect = (airport: Airport) => {
    setInput(`${airport.name} (${airport.icao})`);
    setAirport(airport);
    setShowDropdown(false);
  };

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
        <Plane
          className={`h-4 w-4 transform ${isDeparture ? '' : 'rotate-90'}`}
        />
      </span>
      <Input
        type="text"
        className={`w-full pl-10 ${isRounded ? 'rounded-[48px]' : ''} ${isColoredBorder ? 'border border-[#3282f7]' : ''}`}
        value={input}
        onChange={handleChange}
        placeholder={placeHolder}
        onFocus={() => setShowDropdown(airportOptions.length > 0)}
      />
      {showDropdown && (
        <ul className="absolute z-20 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-md max-h-60 overflow-auto">
          {airportOptions.length > 0 ? (
            airportOptions.map((airport, index) => (
              <li
                key={index}
                className="p-3 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSelect(airport)}
              >
                <div className="font-medium">
                  {airport.name}{' '}
                  <span className="text-sm text-gray-500">
                    ({airport.icao})
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  {airport.city}, {airport.country}
                </div>
              </li>
            ))
          ) : loading ? (
            <li className="p-3 text-gray-500 text-sm">Searching...</li>
          ) : (
            <li className="p-3 text-gray-500 text-sm">No results found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default AirportInput;
