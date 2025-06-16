import React from 'react';
import { Plane } from 'lucide-react';
import { IClaimForm } from '@/components/claim-form/interfaces/claim-form.interface.ts';

interface ProblemFlightSelectorProps {
  newForm: IClaimForm;
  setNewForm: (value: IClaimForm) => void;
}

const ProblemFlightSelector: React.FC<ProblemFlightSelectorProps> = ({
  newForm,
  setNewForm,
}) => {
  const routes = newForm.details.routes;

  if (routes.length == 1) {
    newForm.details.routes[0].troubled = true;
    return null;
  }

  const handleSegmentSelect = (selectedIndex: number) => {
    const updatedRoutes = routes.map((route, index) => ({
      ...route,
      troubled: index === selectedIndex,
    }));

    setNewForm({
      ...newForm,
      details: {
        ...newForm.details,
        routes: updatedRoutes,
      },
    });
  };

  return (
    <div className="border border-input rounded-md p-4 mb-2">
      <h3 className="text-base font-medium mb-3">
        Select the flight that didn't go as planned
      </h3>
      <div className="space-y-2">
        {routes.map((route, index) => {
          const { departureAirport, arrivalAirport } = route;
          const id = `${departureAirport.icao}-${arrivalAirport.icao}`;
          const isSelected = route.troubled;

          return (
            <div
              key={id}
              onClick={() => handleSegmentSelect(index)}
              className={`flex items-center gap-2 border rounded-md p-3 cursor-pointer transition-colors ${
                isSelected
                  ? 'bg-blue-50 border-primary'
                  : 'hover:border-primary hover:bg-slate-50'
              }`}
            >
              <input
                type="radio"
                id={id}
                checked={isSelected}
                onChange={() => {}}
                className="h-5 w-5 rounded-full border border-primary text-primary ring-offset-background focus:outline-none"
              />
              <label
                htmlFor={id}
                className="flex items-center gap-1 cursor-pointer"
              >
                <span className="text-sm">{departureAirport.name}</span>
                <Plane className="text-primary h-3.5 w-3.5 mx-1" />
                <span className="text-sm">{arrivalAirport.name}</span>
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProblemFlightSelector;
