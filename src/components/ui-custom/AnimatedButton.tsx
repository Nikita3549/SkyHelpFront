
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

interface AnimatedButtonProps {
  children: React.ReactNode;
  to: string;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  icon?: boolean;
  onClick?: () => void;
}

const AnimatedButton = ({
  children,
  to,
  variant = "primary",
  size = "md",
  className,
  icon = true,
  onClick,
}: AnimatedButtonProps) => {
  const baseStyles = "inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-offset-2 hover:-translate-y-0.5";
  
  const variantStyles = {
    primary: "bg-primary text-white hover:bg-blue-600 shadow-md hover:shadow-lg focus:ring-primary/50",
    secondary: "bg-white text-primary border border-primary/20 hover:border-primary/40 shadow-sm hover:shadow focus:ring-primary/30",
    ghost: "bg-transparent text-primary hover:bg-primary/5 focus:ring-primary/30",
  };
  
  const sizeStyles = {
    sm: "text-xs px-3 py-1.5",
    md: "text-sm px-4 py-2",
    lg: "text-base px-6 py-3",
  };

  return (
    <Link
      to={to}
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        "group",
        className
      )}
      onClick={onClick}
    >
      <span>{children}</span>
      {icon && (
        <ChevronRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </Link>
  );
};

export default AnimatedButton;
