
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type FlightDetailsSectionProps = {
  flightIssue: string;
  reasonGivenByAirline: string;
  departureAirport: string;
  arrivalAirport: string;
  errors: Record<string, string>;
  handleChange: (field: string, value: any) => void;
};

const FlightDetailsSection = ({
  flightIssue,
  reasonGivenByAirline,
  errors,
  handleChange,
}: FlightDetailsSectionProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>What happened with the flight?</Label>
        <RadioGroup
          value={flightIssue}
          onValueChange={(value) => handleChange("flightIssue", value)}
          className="grid grid-cols-1 sm:grid-cols-2 gap-2"
        >
          <div className="flex items-center space-x-2 rounded-lg border p-4 cursor-pointer hover:bg-gray-50 transition-colors">
            <RadioGroupItem value="delayed" id="flight-delayed" />
            <Label htmlFor="flight-delayed" className="cursor-pointer flex items-center">
              <span className="ml-1">Flight was delayed</span>
            </Label>
          </div>
          <div className="flex items-center space-x-2 rounded-lg border p-4 cursor-pointer hover:bg-gray-50 transition-colors">
            <RadioGroupItem value="canceled" id="flight-canceled" />
            <Label htmlFor="flight-canceled" className="cursor-pointer flex items-center">
              <span className="ml-1">Flight was cancelled</span>
            </Label>
          </div>
          <div className="flex items-center space-x-2 rounded-lg border p-4 cursor-pointer hover:bg-gray-50 transition-colors">
            <RadioGroupItem value="overbooking" id="flight-overbooking" />
            <Label htmlFor="flight-overbooking" className="cursor-pointer flex items-center">
              <span className="ml-1">Denied boarding (overbooking)</span>
            </Label>
          </div>
          <div className="flex items-center space-x-2 rounded-lg border p-4 cursor-pointer hover:bg-gray-50 transition-colors">
            <RadioGroupItem value="missed_connection" id="flight-missed-connection" />
            <Label htmlFor="flight-missed-connection" className="cursor-pointer flex items-center">
              <span className="ml-1">Missed connecting flight</span>
            </Label>
          </div>
        </RadioGroup>
        {errors.flightIssue && <p className="text-sm text-red-500">{errors.flightIssue}</p>}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="reasonGivenByAirline">Reason Given by Airline</Label>
        <Input
          id="reasonGivenByAirline"
          value={reasonGivenByAirline}
          onChange={(e) => handleChange("reasonGivenByAirline", e.target.value)}
          placeholder="Enter reason provided by the airline"
        />
        {errors.reasonGivenByAirline && <p className="text-sm text-red-500">{errors.reasonGivenByAirline}</p>}
      </div>
    </div>
  );
};

export default FlightDetailsSection;
