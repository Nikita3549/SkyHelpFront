
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { TableCell, TableRow } from "@/components/ui/table";

// Define the flight data type
interface FlightData {
  id: string;
  time: string;
  destination: string;
  flight: string;
  gate: string;
  status: string;
  delayed: boolean;
}

// Generate sample flight data
const generateFlights = (): FlightData[] => [
  { id: "1", time: "08:15", destination: "London", flight: "BA 354", gate: "12", status: "On Time", delayed: false },
  { id: "2", time: "09:30", destination: "Paris", flight: "AF 1234", gate: "05", status: "On Time", delayed: false },
  { id: "3", time: "10:45", destination: "New York", flight: "AA 198", gate: "23", status: "On Time", delayed: false },
  { id: "4", time: "11:20", destination: "Berlin", flight: "LH 4521", gate: "18", status: "On Time", delayed: false },
  { id: "5", time: "12:10", destination: "Rome", flight: "AZ 7890", gate: "07", status: "On Time", delayed: false },
  { id: "6", time: "13:30", destination: "Madrid", flight: "IB 4321", gate: "14", status: "On Time", delayed: false },
  { id: "7", time: "14:45", destination: "Amsterdam", flight: "KL 1357", gate: "22", status: "On Time", delayed: false },
  { id: "8", time: "15:15", destination: "Dubai", flight: "EK 2468", gate: "10", status: "On Time", delayed: false },
];

// The character cell component that flips
interface FlipCellProps {
  char: string;
  flipKey?: number;
  textColor?: string;
}

const FlipCell: React.FC<FlipCellProps> = ({ char, flipKey = 0, textColor = "text-foreground" }) => {
  const [flipped, setFlipped] = useState(false);
  const [displayChar, setDisplayChar] = useState(char);

  useEffect(() => {
    if (flipKey > 0) {
      setFlipped(true);
      const timer = setTimeout(() => {
        setDisplayChar(char);
        setFlipped(false);
      }, 250); // Half of the flip animation time
      return () => clearTimeout(timer);
    } else {
      setDisplayChar(char);
    }
  }, [char, flipKey]);

  return (
    <span 
      className={cn(
        "inline-block transition-transform duration-500 perspective-[1000px]",
        flipped ? "transform-style-3d rotate-x-180" : "",
        textColor
      )}
    >
      {displayChar}
    </span>
  );
};

// Status cell component that handles status text flip animation
interface StatusCellProps {
  status: string;
  delayed: boolean;
  flipTrigger: boolean;
}

const StatusCell: React.FC<StatusCellProps> = ({ status, delayed, flipTrigger }) => {
  const [currentStatus, setCurrentStatus] = useState(status);
  const [flipKey, setFlipKey] = useState(0);
  const [isDelayed, setIsDelayed] = useState(delayed);

  useEffect(() => {
    if (flipTrigger) {
      const timer = setTimeout(() => {
        setFlipKey(prev => prev + 1);
        setIsDelayed(Math.random() > 0.5); // Randomly set to delayed or cancelled
      }, 2000); // 2 second delay before status change
      
      return () => clearTimeout(timer);
    }
  }, [flipTrigger]);

  useEffect(() => {
    if (flipKey > 0) {
      const newStatus = isDelayed ? "DELAYED" : "CANCELLED";
      const timer = setTimeout(() => {
        setCurrentStatus(newStatus);
      }, 250); // Half of the flip animation time
      
      return () => clearTimeout(timer);
    }
  }, [flipKey, isDelayed]);

  return (
    <TableCell className="font-mono text-right">
      {currentStatus.split("").map((char, idx) => (
        <FlipCell 
          key={`${idx}-${char}`} 
          char={char} 
          flipKey={flipKey} 
          textColor={flipKey > 0 ? "text-red-600 font-bold" : ""}
        />
      ))}
    </TableCell>
  );
};

// Flight information row component
interface FlightRowProps {
  flight: FlightData;
  flipTrigger: boolean;
}

const FlightRow: React.FC<FlightRowProps> = ({ flight, flipTrigger }) => {
  return (
    <TableRow className="border-b border-gray-200">
      <TableCell className="font-mono">{flight.time}</TableCell>
      <TableCell className="font-mono">{flight.destination}</TableCell>
      <TableCell className="font-mono">{flight.flight}</TableCell>
      <TableCell className="font-mono text-center">{flight.gate}</TableCell>
      <StatusCell status={flight.status} delayed={flight.delayed} flipTrigger={flipTrigger} />
    </TableRow>
  );
};

// Main departures board component
const DeparturesBoard: React.FC = () => {
  const [flights, setFlights] = useState<FlightData[]>([]);
  const [flipTrigger, setFlipTrigger] = useState(false);

  useEffect(() => {
    setFlights(generateFlights());
    setFlipTrigger(true);
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto my-12">
      <div className="relative">
        {/* Board Header */}
        <div className="bg-primary text-primary-foreground py-4 px-6 rounded-t-lg">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Departures</h2>
            <div className="text-xl font-mono">
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        </div>
        
        {/* Flights Table */}
        <div className="bg-gray-50 dark:bg-gray-900 overflow-hidden shadow-md rounded-b-lg">
          <div className="w-full overflow-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800 text-left">
                  <th className="p-4 font-mono font-medium text-muted-foreground">Time</th>
                  <th className="p-4 font-mono font-medium text-muted-foreground">Destination</th>
                  <th className="p-4 font-mono font-medium text-muted-foreground">Flight</th>
                  <th className="p-4 font-mono font-medium text-muted-foreground text-center">Gate</th>
                  <th className="p-4 font-mono font-medium text-muted-foreground text-right">Status</th>
                </tr>
              </thead>
              <tbody>
                {flights.map((flight) => (
                  <FlightRow key={flight.id} flight={flight} flipTrigger={flipTrigger} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeparturesBoard;
