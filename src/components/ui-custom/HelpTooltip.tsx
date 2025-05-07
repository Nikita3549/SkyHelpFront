
import React, { useState } from "react";
import { HelpCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { 
  AlertDialog, 
  AlertDialogContent, 
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface HelpTooltipProps {
  items: {
    text: string;
    highlight?: boolean;
  }[];
  className?: string;
  position?: "top" | "right" | "bottom" | "left";
  variant?: "tooltip" | "dialog";
}

const HelpTooltip: React.FC<HelpTooltipProps> = ({ 
  items, 
  className,
  position = "top",
  variant = "tooltip"
}) => {
  const [isOpen, setIsOpen] = useState(false);

  if (variant === "dialog") {
    return (
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogTrigger asChild>
          <button 
            className={cn(
              "inline-flex items-center text-green-600 hover:text-green-700 transition-colors gap-1.5 text-sm font-medium bg-green-50 px-3 py-1.5 rounded-full", 
              className
            )}
            aria-label="Get help with filling the form"
          >
            Not sure how to fill? <HelpCircle className="h-4 w-4" />
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent className="w-[90%] max-w-md p-0 rounded-xl border border-green-200 overflow-hidden">
          <div className="relative p-5 pt-10 bg-white rounded-xl">
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
              aria-label="Close help dialog"
            >
              <X className="h-5 w-5" />
            </button>
            <ul className="space-y-6">
              {items.map((item, index) => (
                <li key={index} className="flex gap-3">
                  <span className="font-bold text-lg">•</span>
                  <p className="text-gray-800">
                    {item.text.split(/(\booked together\b|\benter\b|\boriginal flight\b)/g).map((part, i) => {
                      if (part === "booked together" || part === "enter" || part === "original flight") {
                        return <span key={i} className="text-green-600 font-medium">{part}</span>;
                      }
                      return part;
                    })}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button 
            className={cn(
              "inline-flex items-center text-green-600 hover:text-green-700 transition-colors gap-1.5 text-sm font-medium bg-green-50 px-3 py-1.5 rounded-full", 
              className
            )}
            aria-label="Get help with filling the form"
          >
            Not sure how to fill? <HelpCircle className="h-4 w-4" />
          </button>
        </TooltipTrigger>
        <TooltipContent 
          side={position} 
          className="w-80 p-5 bg-white rounded-xl border border-green-200"
        >
          <ul className="space-y-4">
            {items.map((item, index) => (
              <li key={index} className="flex gap-2">
                <span className="font-bold">•</span>
                <p>
                  {item.text.split(/(\booked together\b|\benter\b|\boriginal flight\b)/g).map((part, i) => {
                    if (part === "booked together" || part === "enter" || part === "original flight") {
                      return <span key={i} className="text-green-600 font-medium">{part}</span>;
                    }
                    return part;
                  })}
                </p>
              </li>
            ))}
          </ul>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default HelpTooltip;
