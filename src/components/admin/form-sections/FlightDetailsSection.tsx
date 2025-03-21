
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Plane } from "lucide-react";

type FlightDetailsSectionProps = {
  departureAirport: string;
  arrivalAirport: string;
  flightIssue: string;
  reasonGivenByAirline: string;
  errors: Record<string, string>;
  handleChange: (field: string, value: any) => void;
};

const FlightDetailsSection = ({
  departureAirport,
  arrivalAirport,
  flightIssue,
  reasonGivenByAirline,
  errors,
  handleChange,
}: FlightDetailsSectionProps) => {
  return (
    <div className="space-y-4 pt-2">
      <h3 className="text-lg font-medium">Flight Details</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="departureAirport">Departure Airport</Label>
          <div className="relative">
            <Input
              id="departureAirport"
              value={departureAirport}
              onChange={(e) => handleChange("departureAirport", e.target.value)}
              placeholder="e.g. LHR"
              className="pr-10"
            />
            <Plane className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
          {errors.departureAirport && <p className="text-sm text-red-500">{errors.departureAirport}</p>}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="arrivalAirport">Arrival Airport</Label>
          <div className="relative">
            <Input
              id="arrivalAirport"
              value={arrivalAirport}
              onChange={(e) => handleChange("arrivalAirport", e.target.value)}
              placeholder="e.g. CDG"
              className="pr-10"
            />
            <Plane className="absolute right-3 top-1/2 transform -translate-y-1/2 rotate-90 h-4 w-4 text-gray-400" />
          </div>
          {errors.arrivalAirport && <p className="text-sm text-red-500">{errors.arrivalAirport}</p>}
        </div>
      </div>
      
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
