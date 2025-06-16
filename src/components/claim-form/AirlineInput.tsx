import React, { useEffect, useState, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Plane } from 'lucide-react';
import { io, Socket } from 'socket.io-client';
import { Airline } from '@/components/claim-form/flight-details/interfaces/Airline.interface.ts';

interface Props {
  setAirline: (airport: Airline | null) => void;
  placeHolder: string;
  isRounded?: boolean;
  preFilled?: Airline;
}

const AirlineInput: React.FC<Props> = ({
  setAirline,
  placeHolder,
  isRounded = false,
  preFilled = null,
}) => {
  const [input, setInput] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [airlinesOptions, setAirlineOptions] = useState<Airline[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [ws, setWs] = useState<Socket>();

  useEffect(() => {
    if (preFilled) {
      setInput(`${preFilled.name} (${preFilled.icao})`);
    }
  }, [preFilled]);

  useEffect(() => {
    const socket = io(`${import.meta.env.VITE_WS_HOST}/airlines`, {
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
    setAirlineOptions([]);
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

  const sendQuery = (query: string) => {
    setLoading(true);
    if (query.trim().length >= 1) {
      ws.emit('lookupAirline', { name: query }, (ackData: Airline[]) => {
        setAirlineOptions(
          ackData.map((a) => ({
            icao: a.icao,
            name: a.name,
            city: a.city,
            country: a.country,
          })),
        );
        setLoading(false);
      });
    } else {
      setAirlineOptions([]);
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    setAirline(null);
    sendQuery(value);
    setShowDropdown(true);
  };

  const handleSelect = (airport: Airline) => {
    setInput(`${airport.name} (${airport.icao})`);
    setAirline(airport);
    setShowDropdown(false);
  };

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <Input
        type="text"
        className={`w-full pl-4 ${isRounded ? 'rounded-[48px]' : ''}`}
        value={input}
        onChange={handleChange}
        placeholder={placeHolder}
        onFocus={() => setShowDropdown(airlinesOptions.length > 0)}
      />
      {showDropdown && (
        <ul className="absolute z-20 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-md max-h-60 overflow-auto">
          {airlinesOptions.length > 0 ? (
            airlinesOptions.map((airport, index) => (
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
                {/*<div className="text-sm text-gray-500">*/}
                {/*  {airport.city}, {airport.country}*/}
                {/*</div>*/}
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

export default AirlineInput;
