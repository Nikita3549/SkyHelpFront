
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { PlaneTakeoff } from "lucide-react"; // Changed to PlaneTakeoff icon for aviation theme

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  withLink?: boolean;
}

const Logo = ({ className, size = "md", withLink = true }: LogoProps) => {
  const sizeClasses = {
    sm: "text-lg",
    md: "text-xl md:text-2xl",
    lg: "text-2xl md:text-3xl"
  };
  
  const iconSizes = {
    sm: 18,
    md: 24,
    lg: 32
  };

  const logo = (
    <div className={cn("flex items-center", className)}>
      <PlaneTakeoff 
        className={cn(
          "mr-1.5 text-primary",
          size === "sm" ? "mt-0.5" : size === "md" ? "mt-1" : "mt-1.5"
        )} 
        size={iconSizes[size]} 
        strokeWidth={2.5}
      />
      <div className={cn(sizeClasses[size], "font-semibold flex")}>
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
          Clever
        </span>
        <span className="text-black">
          Claim
        </span>
      </div>
    </div>
  );

  if (withLink) {
    return (
      <Link to="/" className="animate-fade-in flex items-center">
        {logo}
      </Link>
    );
  }

  return logo;
};

export default Logo;
