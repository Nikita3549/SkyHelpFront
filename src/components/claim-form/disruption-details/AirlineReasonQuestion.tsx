
import React from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { disruptionDetailsSchema } from "@/components/claim-form/schemas";
import { Wrench, CloudRain, Users, Building, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface AirlineReasonQuestionProps {
  form: UseFormReturn<z.infer<typeof disruptionDetailsSchema>>;
}

const reasonOptions = [
  {
    value: "technical_problem",
    title: "Aircraft technical problem",
    subtitle: "Issues with the aircraft that affected safety or operation",
    icon: <Wrench className="h-6 w-6 text-blue-600" />,
  },
  {
    value: "weather",
    title: "Bad weather conditions",
    subtitle: "Storms, fog, heavy snow, or other severe weather",
    icon: <CloudRain className="h-6 w-6 text-blue-600" />,
  },
  {
    value: "strike",
    title: "Strike",
    subtitle: "Industrial action by airline staff or airport workers",
    icon: <Users className="h-6 w-6 text-blue-600" />,
  },
  {
    value: "airport_issues",
    title: "Airport issues",
    subtitle: "Capacity constraints, security, or facility problems",
    icon: <Building className="h-6 w-6 text-blue-600" />,
  },
  {
    value: "other",
    title: "Other reasons",
    subtitle: "Any other explanation provided by the airline",
    icon: <HelpCircle className="h-6 w-6 text-blue-600" />,
  },
];

const AirlineReasonQuestion: React.FC<AirlineReasonQuestionProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="airlineReason"
      render={({ field }) => (
        <FormItem className="space-y-4 animate-fade-in">
          <FormLabel className="text-xl font-semibold text-black block">
            What reason did the airline provide for the disruption?
          </FormLabel>
          <FormControl>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reasonOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={cn(
                    "flex items-start space-x-3 p-4 border rounded-lg text-left w-full transition-all duration-200",
                    "hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50", 
                    field.value === option.value 
                      ? "border-blue-500 bg-blue-50 shadow-sm" 
                      : "border-gray-200"
                  )}
                  onClick={() => field.onChange(option.value)}
                  role="radio"
                  aria-checked={field.value === option.value}
                  tabIndex={0}
                >
                  <div className="flex-shrink-0 p-2 bg-blue-50 rounded-full">
                    {option.icon}
                  </div>
                  <div className="flex-grow">
                    <div className="font-medium text-gray-900 mb-1">{option.title}</div>
                    <p className="text-sm text-gray-500">{option.subtitle}</p>
                  </div>
                </button>
              ))}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default AirlineReasonQuestion;
