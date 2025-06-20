import React from 'react';
import { Separator } from '@/components/ui/separator';

interface Claim {
  route: string;
  flightNumber: string;
  departureDate: string;
  compensation: string;
  airline: string;
  disruptionType?: string;
  passengerName?: string;
  lastUpdate?: string;
}

interface FlightDetailsCardProps {
  claim: Claim;
}

const FlightDetailsCard = ({ claim }: FlightDetailsCardProps) => {
  // Format disruption type for display
  const formatDisruptionType = (type?: string) => {
    if (!type) return 'Not specified';

    const typeMap: { [key: string]: string } = {
      delay: 'Flight Delay',
      cancellation: 'Flight Cancellation',
      denied_boarding: 'Denied Boarding',
      missed_connection: 'Missed Connection',
    };

    return typeMap[type] || type;
  };

  return (
    <div>
      <h3 className="text-sm font-medium text-gray-500 mb-2">Flight Details</h3>
      <div className="bg-gray-50 rounded-lg p-4 space-y-3">
        {claim.passengerName && (
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Passenger Name</span>
            <span className="text-sm font-medium">{claim.passengerName}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="text-sm text-gray-500">Airline</span>
          <span className="text-sm font-medium">{claim.airline}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-500 pr-8">Route</span>
          <span className="text-sm font-medium">{claim.route}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-500">Flight Number</span>
          <span className="text-sm font-medium">{claim.flightNumber}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-500">Disruption Type</span>
          <span className="text-sm font-medium">
            {formatDisruptionType(claim.disruptionType)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-500">Flight Date</span>
          <span className="text-sm font-medium">
            {new Date(claim.departureDate).toLocaleDateString()}
          </span>
        </div>
        {claim.lastUpdate && (
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Claim Submitted</span>
            <span className="text-sm font-medium">
              {new Date(claim.lastUpdate).toLocaleDateString()}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightDetailsCard;
