import React from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface HelpItem {
  text: string;
}

interface HelpTooltipProps {
  items: HelpItem[];
  variant?: "tooltip" | "popover";
  className?: string;
}

const HelpTooltip = ({ items, variant = "tooltip", className }: HelpTooltipProps) => {
  if (variant === "popover") {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button 
            variant="ghost" 
            size="sm" 
            className={cn(
              "text-blue-500 hover:text-blue-700 hover:bg-blue-50 p-1 h-auto text-xs sm:text-sm",
              className
            )}
          >
            <HelpCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
            <span className="hidden sm:inline">Not sure how to fill?</span>
            <span className="sm:hidden">Help</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-72 sm:w-80 p-4">
          <div className="space-y-3">
            <h4 className="font-medium text-sm text-gray-900">Help</h4>
            <div className="space-y-2">
              {items.map((item, index) => (
                <p key={index} className="text-sm text-gray-600 leading-relaxed">
                  {item.text}
                </p>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <div className={cn("group relative inline-block", className)}>
      <Button 
        variant="ghost" 
        size="sm" 
        className="text-blue-500 hover:text-blue-700 hover:bg-blue-50 p-1 h-auto text-xs sm:text-sm"
      >
        <HelpCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
        <span className="hidden sm:inline">Not sure how to fill?</span>
        <span className="sm:hidden">Help</span>
      </Button>
      
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 w-64">
        <div className="space-y-2">
          {items.map((item, index) => (
            <p key={index} className="text-sm leading-relaxed">
              {item.text}
            </p>
          ))}
        </div>
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
      </div>
    </div>
  );
};

export default HelpTooltip;
