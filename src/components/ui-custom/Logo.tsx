
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

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

  const logo = (
    <span className={cn(
      sizeClasses[size],
      "font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600",
      className
    )}>
      CleverClaim
    </span>
  );

  if (withLink) {
    return (
      <Link to="/" className="animate-fade-in">
        {logo}
      </Link>
    );
  }

  return logo;
};

export default Logo;
