import React from 'react';
import { Plane } from 'lucide-react';
import { Claim } from '@/lib/supabase';

type FlightInfoCardProps = {
  claim: Claim;
};

const FlightInfoCard = ({ claim }: FlightInfoCardProps) => {
  // Format the date from DD.MM.YY to a more readable format
  const formatFlightDate = (dateString: string) => {
    if (!dateString) return 'N/A';

    const parts = dateString.split('.');
    if (parts.length !== 3) return dateString;

    // Convert from DD.MM.YY to a proper Date object
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // JS months are 0-indexed
    const year = 2000 + parseInt(parts[2], 10); // Assuming 20xx for YY

    try {
      const date = new Date(year, month, day);
      return date.toLocaleDateString();
    } catch (e) {
      return dateString;
    }
  };

  return (
    <div>
      <h3 className="text-sm font-medium text-gray-500 mb-2 flex items-center">
        <Plane className="h-4 w-4 mr-1" />
        Flight Information
      </h3>
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Airline:</span>
          <span className="font-medium">{claim?.airline}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Flight Number:</span>
          <span className="font-medium">{claim?.flightnumber}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Date:</span>
          <span className="font-medium">{formatFlightDate(claim?.date)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Departure:</span>
          <span className="font-medium">
            {claim?.departureairport || 'N/A'}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Arrival:</span>
          <span className="font-medium">{claim?.arrivalairport || 'N/A'}</span>
        </div>
      </div>
    </div>
  );
};

export default FlightInfoCard;
