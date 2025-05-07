
import React from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { disruptionDetailsSchema } from "@/components/claim-form/schemas";
import { Wrench, CloudRain, Users, Building, HelpCircle } from "lucide-react";

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
          <FormLabel className="text-xl font-semibold text-blue-800 block">
            What reason did the airline provide for the disruption?
          </FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {reasonOptions.map((option) => (
                <FormItem key={option.value} className="flex items-start space-x-3 space-y-0 border rounded-lg p-4 transition-all duration-200 hover:border-blue-300 hover:bg-blue-50 cursor-pointer data-[state=checked]:border-blue-500 data-[state=checked]:bg-blue-50">
                  <FormControl>
                    <RadioGroupItem value={option.value} className="mt-1" id={`reason-${option.value}`} />
                  </FormControl>
                  <label htmlFor={`reason-${option.value}`} className="w-full cursor-pointer">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mr-3 p-2 bg-blue-50 rounded-full">
                        {option.icon}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 mb-1">{option.title}</div>
                        <p className="text-sm text-gray-500">{option.subtitle}</p>
                      </div>
                    </div>
                  </label>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default AirlineReasonQuestion;
