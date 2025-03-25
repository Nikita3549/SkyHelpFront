
import React from "react";
import { Check, Circle } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

type TimelineItemStatus = "pending" | "active" | "completed";

interface TimelineItem {
  label: string;
  status: TimelineItemStatus;
}

interface TimelineProps {
  items: TimelineItem[];
}

const Timeline: React.FC<TimelineProps> = ({ items }) => {
  const isMobile = useIsMobile();
  
  return (
    <div className={`flex ${isMobile ? 'flex-row w-full justify-between mb-4 overflow-x-auto pb-2' : 'flex-col space-y-8'}`}>
      {items.map((item, index) => (
        <div 
          key={index} 
          className={`flex ${isMobile ? 'flex-col items-center px-2 min-w-[70px]' : 'flex-row items-center'}`}
        >
          <div className="relative">
            <div 
              className={`
                w-10 h-10 rounded-full flex items-center justify-center
                ${item.status === 'completed' ? 'bg-primary text-white' : 
                  item.status === 'active' ? 'bg-primary text-white' : 
                  'bg-gray-100 text-gray-400 border border-gray-200'}
                ${isMobile ? 'mb-2' : 'mr-4'}
              `}
            >
              {item.status === "completed" ? (
                <Check className="h-5 w-5" />
              ) : (
                <span className="font-medium">{index + 1}</span>
              )}
            </div>
            
            {/* Connect line (only shown for desktop) */}
            {!isMobile && index < items.length - 1 && (
              <div 
                className={`absolute top-10 left-5 w-0.5 h-8 -ml-px
                  ${item.status === 'completed' ? 'bg-primary' : 'bg-gray-200'}`}
              ></div>
            )}
          </div>
          
          <span className={`
            ${item.status === 'completed' ? 'text-primary font-medium' : 
              item.status === 'active' ? 'text-primary font-medium' : 
              'text-gray-500'}
            ${isMobile ? 'text-xs text-center' : 'text-sm'}
          `}>
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
