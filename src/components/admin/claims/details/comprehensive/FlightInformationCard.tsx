
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plane, MapPin } from "lucide-react";
import { Claim } from "@/lib/supabase";

type FlightInformationCardProps = {
  claim: Claim;
};

const FlightInformationCard = ({ claim }: FlightInformationCardProps) => {
  // Parse connecting flights if available
  let connectingFlights = [];
  try {
    if (claim.additionalinformation) {
      const additionalInfo = JSON.parse(claim.additionalinformation);
      connectingFlights = additionalInfo.connectingFlights || [];
    }
  } catch (e) {
    // Ignore parsing errors
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plane className="h-5 w-5" />
          Flight Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-500">Departure Airport</label>
            <p className="text-sm font-medium">{claim.departureairport || "Not specified"}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Arrival Airport</label>
            <p className="text-sm font-medium">{claim.arrivalairport || "Not specified"}</p>
          </div>
        </div>

        {connectingFlights.length > 0 && (
          <div>
            <label className="text-sm font-medium text-gray-500">Connecting Flights</label>
            <div className="mt-2 space-y-2">
              {connectingFlights.map((flight: any, index: number) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="text-sm">{flight.from} → {flight.to}</span>
                  <Badge variant="outline" className="text-xs">{flight.flightNumber}</Badge>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <label className="text-sm font-medium text-red-700">Problem Flight (Highlighted)</label>
          <div className="mt-2 flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Plane className="h-4 w-4 text-red-600" />
              <span className="font-medium text-red-800">{claim.airline} {claim.flightnumber}</span>
            </div>
            <Badge variant="destructive">{claim.flightissue || "Issue not specified"}</Badge>
          </div>
          <p className="text-sm text-red-600 mt-1">{claim.departureairport} → {claim.arrivalairport}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-500">Airline</label>
            <p className="text-sm font-medium">{claim.airline}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Departure Date</label>
            <p className="text-sm font-medium">{claim.date}</p>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-500">Flight Number</label>
          <p className="text-sm font-medium">{claim.flightnumber}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default FlightInformationCard;
