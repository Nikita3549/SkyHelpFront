
import React from "react";
import { Circle, CircleCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface TimelineItem {
  label: string;
  status: "active" | "completed" | "pending";
}

interface TimelineProps {
  items: TimelineItem[];
}

const Timeline: React.FC<TimelineProps> = ({ items }) => {
  return (
    <div className="flex flex-col space-y-1">
      {items.map((item, index) => (
        <div key={index} className="flex items-start">
          {/* Left side connector line */}
          <div className="flex flex-col items-center">
            {/* Step icon */}
            <div 
              className={cn(
                "relative flex h-8 w-8 items-center justify-center rounded-full border-2",
                item.status === "active" ? "border-primary bg-primary text-white" :
                item.status === "completed" ? "border-primary bg-primary text-white" :
                "border-gray-300 bg-white"
              )}
            >
              {item.status === "completed" ? (
                <CircleCheck className="h-5 w-5" />
              ) : (
                <Circle className={cn("h-5 w-5", item.status === "active" ? "fill-white stroke-white" : "fill-gray-300 stroke-gray-300")} />
              )}
            </div>
            
            {/* Connector line */}
            {index < items.length - 1 && (
              <div 
                className={cn(
                  "h-12 w-0.5",
                  item.status === "completed" ? "bg-primary" : "bg-gray-200"
                )}
              />
            )}
          </div>

          {/* Step label */}
          <div className="ml-4 mt-1">
            <span 
              className={cn(
                "text-md font-medium",
                item.status === "active" ? "text-primary" :
                item.status === "completed" ? "text-primary" :
                "text-gray-400"
              )}
            >
              {item.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
