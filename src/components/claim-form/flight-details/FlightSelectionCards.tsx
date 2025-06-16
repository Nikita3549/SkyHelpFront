import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Plane } from 'lucide-react';
import { IClaimForm } from '@/components/claim-form/interfaces/claim-form.interface.ts';

export interface FlightData {
  id: string;
  flightNumber: string;
  departureTime: string;
  arrivalTime: string;
  departureAirport: string;
  arrivalAirport: string;
}

interface FlightSelectionCardsProps {
  manualFlightNumber: string;
  setManualFlightNumber: (value: string) => void;
  flights: FlightData[];
  newForm: IClaimForm;
  setNewForm: (form: IClaimForm) => void;
}

const FlightSelectionCards: React.FC<FlightSelectionCardsProps> = ({
  manualFlightNumber,
  setManualFlightNumber,
  flights,
  newForm,
  setNewForm,
}) => {
  const [selectedFlightId, setSelectedFlightId] = useState<string | null>(null);

  useEffect(() => {
    setSelectedFlightId(newForm.meta?.flightId && null);
  }, [flights]);

  const handleSelectFlight = (flightId: string) => {
    setSelectedFlightId(flightId);
    if (flightId !== 'not-found') {
      setManualFlightNumber('');
    }
    setManualFlightNumber(flights.find((f) => f.id == flightId).flightNumber);
    setNewForm({
      ...newForm,
      meta: {
        ...newForm.meta,
        flightId,
      },
    });
  };

  return (
    <div className="my-4 ">
      <h3 className="text-lg font-medium mb-3 text-blue-900">
        Please select your flight:
      </h3>

      <div className="flex justify-between text-xs text-gray-500 px-4 mb-2">
        <span>Flight time</span>
        <span>Flight #</span>
      </div>

      <div className="space-y-3">
        {flights.map((flight) => (
          <div
            key={flight.id}
            className="w-full cursor-pointer"
            onClick={() => handleSelectFlight(flight.id)}
          >
            <Card
              className={`w-full border transition-colors ${
                selectedFlightId === flight.id
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200'
              }`}
            >
              <CardContent className="p-3 flex justify-between items-center">
                <div className="flex items-center">
                  <div
                    className={`w-4 h-4 rounded-full border mr-3 flex items-center justify-center ${
                      selectedFlightId === flight.id
                        ? 'border-blue-600 bg-white'
                        : 'border-gray-300'
                    }`}
                  >
                    {selectedFlightId === flight.id && (
                      <div className="w-2 h-2 rounded-full bg-blue-600" />
                    )}
                  </div>
                  <div className="flex items-center space-x-1.5 text-sm">
                    <span className="font-medium">{flight.departureTime}</span>
                    <Plane
                      size={16}
                      className="text-gray-400 transform rotate-90"
                    />
                    <span className="font-medium">{flight.arrivalTime}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">
                    {flight.flightNumber}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}

        {/*<div*/}
        {/*  className="w-full cursor-pointer"*/}
        {/*  onClick={() => handleSelectFlight('not-found')}*/}
        {/*>*/}
        {/*<Card*/}
        {/*  className={`w-full border transition-colors ${*/}
        {/*    selectedFlightId === 'not-found'*/}
        {/*      ? 'border-blue-600 bg-blue-50'*/}
        {/*      : 'border-gray-200'*/}
        {/*  }`}*/}
        {/*>*/}
        {/*    <CardContent className="p-3">*/}
        {/*      <div className="flex items-center">*/}
        {/*        <div*/}
        {/*          className={`w-4 h-4 rounded-full border mr-3 flex items-center justify-center ${*/}
        {/*            selectedFlightId === 'not-found'*/}
        {/*              ? 'border-blue-600 bg-white'*/}
        {/*              : 'border-gray-300'*/}
        {/*          }`}*/}
        {/*        >*/}
        {/*          {selectedFlightId === 'not-found' && (*/}
        {/*            <div className="w-2 h-2 rounded-full bg-blue-600" />*/}
        {/*          )}*/}
        {/*        </div>*/}
        {/*        <span className="text-sm">I can't find my flight</span>*/}
        {/*      </div>*/}
        {/*    </CardContent>*/}
        {/*  </Card>*/}
        {/*</div>*/}

        {/*  {selectedFlightId === 'not-found' && (*/}
        {/*    <input*/}
        {/*      type="text"*/}
        {/*      value={manualFlightNumber}*/}
        {/*      onChange={(e) => setManualFlightNumber(e.target.value)}*/}
        {/*      placeholder="Enter your flight number"*/}
        {/*      className="w-full mt-2 p-3 border border-gray-300 rounded-md text-sm"*/}
        {/*    />*/}
        {/*  )}*/}
        {flights.length === 0 && (
          <Card className="w-full border border-dashed border-gray-300 bg-gray-50">
            <CardContent className="flex flex-col items-center py-6 space-y-2">
              <Plane size={32} className="text-gray-400 transform rotate-90" />
              <p className="text-sm text-gray-600 text-center">
                We couldn’t find any flights matching your search.
                <br />
                Try adjusting the date or route.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default FlightSelectionCards;
