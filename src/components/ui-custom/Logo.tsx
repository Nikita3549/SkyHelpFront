
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Leaf } from "lucide-react"; // Import the Leaf icon

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  withLink?: boolean;
}

const Logo = ({ className, size = "md", withLink = true }: LogoProps) => {
  const sizeClasses = {
    sm: "text-xl",
    md: "text-2xl md:text-3xl",
    lg: "text-3xl md:text-4xl"
  };
  
  const iconSizes = {
    sm: 18,
    md: 24,
    lg: 32
  };

  const logo = (
    <div className={cn("flex items-center", className)}>
      <Leaf 
        className={cn(
          "mr-1.5 text-primary",
          size === "sm" ? "mt-0.5" : size === "md" ? "mt-1" : "mt-1.5"
        )} 
        size={iconSizes[size]} 
        strokeWidth={2.5}
      />
      <span className={cn(
        sizeClasses[size],
        "font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600"
      )}>
        CleverClaim
      </span>
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
