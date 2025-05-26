
import React from "react";
import { Separator } from "@/components/ui/separator";

interface Claim {
  route: string;
  flightNumber: string;
  departureDate: string;
  compensation: string;
  airline: string;
}

interface FlightDetailsCardProps {
  claim: Claim;
}

const FlightDetailsCard = ({ claim }: FlightDetailsCardProps) => {
  return (
    <div>
      <h3 className="text-sm font-medium text-gray-500 mb-2">Flight Details</h3>
      <div className="bg-gray-50 rounded-lg p-4 space-y-3">
        <div className="flex justify-between">
          <span className="text-sm text-gray-500">Airline</span>
          <span className="text-sm font-medium">{claim.airline}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-500">Route</span>
          <span className="text-sm font-medium">{claim.route}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-500">Flight Number</span>
          <span className="text-sm font-medium">{claim.flightNumber}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-500">Date</span>
          <span className="text-sm font-medium">{new Date(claim.departureDate).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default FlightDetailsCard;
