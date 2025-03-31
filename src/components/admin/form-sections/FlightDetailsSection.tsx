
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AirportAutocomplete from "@/components/claim-form/flight-details/AirportAutocomplete";

type FlightDetailsSectionProps = {
  departureAirport: string;
  arrivalAirport: string;
  flightIssue: string;
  reasonGivenByAirline: string;
  delayDuration?: string;
  errors: Record<string, string>;
  handleChange: (field: string, value: any) => void;
};

const FlightDetailsSection = ({
  departureAirport,
  arrivalAirport,
  flightIssue,
  reasonGivenByAirline,
  delayDuration,
  errors,
  handleChange,
}: FlightDetailsSectionProps) => {
  return (
    <div className="space-y-4 pt-2">
      <h3 className="text-lg font-medium">Flight Details</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="departureAirport">Departure Airport</Label>
          <AirportAutocomplete
            value={departureAirport}
            onChange={(value) => handleChange("departureAirport", value)}
            placeholder="e.g. London or LHR"
          />
          {errors.departureAirport && <p className="text-sm text-red-500">{errors.departureAirport}</p>}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="arrivalAirport">Arrival Airport</Label>
          <AirportAutocomplete
            value={arrivalAirport}
            onChange={(value) => handleChange("arrivalAirport", value)}
            placeholder="e.g. Paris or CDG"
          />
          {errors.arrivalAirport && <p className="text-sm text-red-500">{errors.arrivalAirport}</p>}
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
            <RadioGroupItem value="missed_connection" id="flight-missed-connection" />
            <Label htmlFor="flight-missed-connection" className="cursor-pointer">Missed connecting flight</Label>
          </div>
        </RadioGroup>
        {errors.flightIssue && <p className="text-sm text-red-500">{errors.flightIssue}</p>}
      </div>
      
      {flightIssue === "delayed" && (
        <div className="space-y-2">
          <Label htmlFor="delayDuration">Delay Duration</Label>
          <Select 
            value={delayDuration} 
            onValueChange={(value) => handleChange("delayDuration", value)}
          >
            <SelectTrigger className="w-full md:w-1/2">
              <SelectValue placeholder="Select delay duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1 hour">1 hour</SelectItem>
              <SelectItem value="2 hours">2 hours</SelectItem>
              <SelectItem value="3 hours">3 hours</SelectItem>
              <SelectItem value="4+ hours">4+ hours</SelectItem>
            </SelectContent>
          </Select>
          {errors.delayDuration && <p className="text-sm text-red-500">{errors.delayDuration}</p>}
        </div>
      )}
      
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
