import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { FlightData } from '@/components/claim-form/flight-details/FlightSelectionCards';

// Mock flight data generator
const generateMockFlights = (
  airline: string,
  departureDate: string,
  departureAirport: string = 'LHR',
  arrivalAirport: string = 'JFK',
): FlightData[] => {
  const date = new Date(departureDate);
  const formattedDate = format(date, 'yyyy-MM-dd');

  // Generate airline code based on airline name
  let airlineCode = 'BA';

  if (airline === 'ryanair') airlineCode = 'FR';
  else if (airline === 'easyjet') airlineCode = 'U2';
  else if (airline === 'ba') airlineCode = 'BA';
  else if (airline === 'lufthansa') airlineCode = 'LH';
  else if (airline === 'airfrance') airlineCode = 'AF';
  else if (airline === 'klm') airlineCode = 'KL';
  else if (airline === 'iberia') airlineCode = 'IB';
  else if (airline === 'vueling') airlineCode = 'VY';
  else if (airline === 'wizz') airlineCode = 'W6';
  else if (airline === 'norwegian') airlineCode = 'DY';

  // Generate 2-3 mock flights for the selected date and airline
  const flightCount = Math.floor(Math.random() * 2) + 2;
  const flights: FlightData[] = [];

  for (let i = 0; i < flightCount; i++) {
    // Generate random flight number between 100-999
    const flightNumberSuffix = Math.floor(Math.random() * 900) + 100;
    const flightNumber = `${airlineCode} ${flightNumberSuffix}`;

    // Generate departure time at different hours of the day
    const hour = (8 + (i * 3 + Math.floor(Math.random() * 2))) % 24;
    const minute = [0, 15, 30, 45][Math.floor(Math.random() * 4)];

    // Format departure time
    const departureHour = hour.toString().padStart(2, '0');
    const departureMinute = minute.toString().padStart(2, '0');
    const departureTime = `${departureHour}:${departureMinute}`;

    // Calculate arrival time (departure + 2-4 hours)
    const flightDurationHours = Math.floor(Math.random() * 2) + 2;
    const arrivalHour = (hour + flightDurationHours) % 24;
    const arrivalMinute = minute;

    // Format arrival time
    const arrivalHourStr = arrivalHour.toString().padStart(2, '0');
    const arrivalMinuteStr = arrivalMinute.toString().padStart(2, '0');
    const arrivalTime = `${arrivalHourStr}:${arrivalMinuteStr}`;

    flights.push({
      id: `${i + 1}`,
      flightNumber,
      departureTime,
      arrivalTime,
      departureAirport,
      arrivalAirport,
    });
  }

  // Sort flights by departure time
  flights.sort((a, b) => {
    const timeA = parseInt(a.departureTime.replace(':', ''));
    const timeB = parseInt(b.departureTime.replace(':', ''));
    return timeA - timeB;
  });

  return flights;
};

interface UseFlightDataProps {
  airline: string;
  departureDate: string;
  departureAirport?: string;
  arrivalAirport?: string;
}

export const useFlightData = ({
  airline,
  departureDate,
  departureAirport,
  arrivalAirport,
}: UseFlightDataProps) => {
  const [flights, setFlights] = useState<FlightData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedFlightId, setSelectedFlightId] = useState<string | null>(null);
  const [selectedFlight, setSelectedFlight] = useState<FlightData | null>(null);

  // Fetch flights when airline and departureDate are both set
  useEffect(() => {
    if (airline && departureDate) {
      setIsLoading(true);

      // Simulate API call delay
      const timer = setTimeout(() => {
        const mockFlights = generateMockFlights(
          airline,
          departureDate,
          departureAirport,
          arrivalAirport,
        );
        setFlights(mockFlights);
        setIsLoading(false);
        // Reset selection when flights change
        setSelectedFlightId(null);
        setSelectedFlight(null);
      }, 800);

      return () => clearTimeout(timer);
    } else {
      setFlights([]);
      setSelectedFlightId(null);
      setSelectedFlight(null);
    }
  }, [airline, departureDate, departureAirport, arrivalAirport]);

  // Handle flight selection
  const selectFlight = (flight: FlightData) => {
    setSelectedFlightId(flight.id);
    setSelectedFlight(flight);
  };

  return {
    flights,
    isLoading,
    selectedFlightId,
    selectedFlight,
    selectFlight,
  };
};
