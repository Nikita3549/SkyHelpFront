import React, { ReactNode } from 'react';

interface RightsInfoBoxProps {
  children: ReactNode;
  type?: 'info' | 'warning' | 'success' | 'error';
  icon?: ReactNode;
  className?: string;
}

/**
 * Reusable styled info box component for rights pages
 */
const RightsInfoBox = ({
  children,
  type = 'info',
  icon,
  className = '',
}: RightsInfoBoxProps) => {
  // Define colors based on type
  const colorClasses = {
    info: 'bg-blue-50 text-blue-500',
    warning: 'bg-amber-50 text-amber-500',
    success: 'bg-green-50 text-green-500',
    error: 'bg-red-50 text-red-500',
  };

  return (
    <div
      className={`${colorClasses[type].split(' ')[0]} p-5 rounded-lg mb-6 flex items-start ${className}`}
    >
      {icon && (
        <div
          className={`w-6 h-6 ${colorClasses[type].split(' ')[1]} mr-3 flex-shrink-0 mt-1`}
        >
          {icon}
        </div>
      )}
      <div>{children}</div>
    </div>
  );
};

export default RightsInfoBox;
