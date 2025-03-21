
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
              className="pl-10"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Plane className="h-5 w-5 text-gray-400" />
            </div>
            {errors.departureAirport && <p className="text-sm text-red-500">{errors.departureAirport}</p>}
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="arrivalAirport">Arrival Airport</Label>
          <div className="relative">
            <Input
              id="arrivalAirport"
              value={arrivalAirport}
              onChange={(e) => handleChange("arrivalAirport", e.target.value)}
              placeholder="e.g. JFK"
              className="pl-10"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Plane className="h-5 w-5 text-gray-400 transform rotate-90" />
            </div>
            {errors.arrivalAirport && <p className="text-sm text-red-500">{errors.arrivalAirport}</p>}
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label>What happened with the flight?</Label>
        <RadioGroup
          value={flightIssue}
          onValueChange={(value) => handleChange("flightIssue", value)}
          className="flex flex-col space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="delayed" id="flight-delayed" />
            <Label htmlFor="flight-delayed" className="cursor-pointer">Flight was delayed</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="canceled" id="flight-canceled" />
            <Label htmlFor="flight-canceled" className="cursor-pointer">Flight was canceled</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="overbooking" id="flight-overbooking" />
            <Label htmlFor="flight-overbooking" className="cursor-pointer">Overbooking</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="missed_connection" id="flight-missed_connection" />
            <Label htmlFor="flight-missed_connection" className="cursor-pointer">Missed connecting flight</Label>
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
