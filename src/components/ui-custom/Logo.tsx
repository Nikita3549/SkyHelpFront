import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  withLink?: boolean;
}

const Logo = ({ className, size = 'md', withLink = true }: LogoProps) => {
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-12',
  };

  const logo = (
    <div className={cn('flex items-center', className)}>
      <img
        src="/logo.png"
        alt="SkyHelp Logo"
        className={cn(sizeClasses[size])}
      />
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
