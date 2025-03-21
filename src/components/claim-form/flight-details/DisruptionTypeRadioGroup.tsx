
import React, { useEffect, useState } from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Clock, AlertCircle, Users, Plane, ChevronDown } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { flightDetailsSchema } from "@/components/claim-form/schemas";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DisruptionTypeRadioGroupProps {
  form: UseFormReturn<z.infer<typeof flightDetailsSchema>>;
}

const DisruptionTypeRadioGroup: React.FC<DisruptionTypeRadioGroupProps> = ({ form }) => {
  const disruptionType = form.watch("disruptionType");
  const delayDuration = form.watch("delayDuration");
  const [isOpen, setIsOpen] = useState(false);

  // Initialize delayDuration when delay is selected
  useEffect(() => {
    if (disruptionType === "delay" && !form.getValues("delayDuration")) {
      form.setValue("delayDuration", "1 hour");
    }
  }, [disruptionType, form]);

  const handleDelayDurationSelect = (duration: string) => {
    form.setValue("delayDuration", duration);
    setIsOpen(false);
  };

  return (
    <FormField
      control={form.control}
      name="disruptionType"
      render={({ field }) => (
        <FormItem className="md:col-span-2">
          <FormLabel>What happened to your flight?</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2"
            >
              <div className={cn(
                "rounded-lg border p-4 cursor-pointer hover:bg-gray-50 transition-colors",
                disruptionType === "delay" ? "bg-blue-50 border-primary" : ""
              )}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="delay" id="delay" className="mt-0.5" />
                  <label htmlFor="delay" className="flex items-center cursor-pointer">
                    <Clock className="h-4 w-4 mr-2 text-primary" />
                    <span>Flight was delayed</span>
                  </label>
                </div>
                
                {disruptionType === "delay" && (
                  <div className="mt-3 ml-7">
                    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                      <DropdownMenuTrigger asChild>
                        <Button 
                          variant="outline" 
                          className="flex justify-between w-full md:w-48 text-sm font-normal"
                          onClick={(e) => e.preventDefault()}
                        >
                          <span>{delayDuration || "Select duration"}</span>
                          <ChevronDown className="h-4 w-4 opacity-50" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-48">
                        {["1 hour", "2 hours", "3 hours", "4+ hours"].map((duration) => (
                          <DropdownMenuItem 
                            key={duration} 
                            onClick={() => handleDelayDurationSelect(duration)}
                            className="cursor-pointer"
                          >
                            {duration}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
              </div>

              <div className={cn(
                "flex items-center space-x-2 rounded-lg border p-4 cursor-pointer hover:bg-gray-50 transition-colors",
                disruptionType === "cancellation" ? "bg-blue-50 border-primary" : ""
              )}>
                <RadioGroupItem value="cancellation" id="cancellation" />
                <label htmlFor="cancellation" className="flex items-center cursor-pointer">
                  <AlertCircle className="h-4 w-4 mr-2 text-red-500" />
                  <span>Flight was cancelled</span>
                </label>
              </div>

              <div className={cn(
                "flex items-center space-x-2 rounded-lg border p-4 cursor-pointer hover:bg-gray-50 transition-colors",
                disruptionType === "denied_boarding" ? "bg-blue-50 border-primary" : ""
              )}>
                <RadioGroupItem value="denied_boarding" id="denied_boarding" />
                <label htmlFor="denied_boarding" className="flex items-center cursor-pointer">
                  <Users className="h-4 w-4 mr-2 text-orange-500" />
                  <span>Denied boarding (overbooking)</span>
                </label>
              </div>

              <div className={cn(
                "flex items-center space-x-2 rounded-lg border p-4 cursor-pointer hover:bg-gray-50 transition-colors",
                disruptionType === "missed_connection" ? "bg-blue-50 border-primary" : ""
              )}>
                <RadioGroupItem value="missed_connection" id="missed_connection" />
                <label htmlFor="missed_connection" className="flex items-center cursor-pointer">
                  <Plane className="h-4 w-4 mr-2 text-blue-500" />
                  <span>Missed connecting flight</span>
                </label>
              </div>
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DisruptionTypeRadioGroup;
