import React from 'react';

const EuFlag = ({
  className = '',
  size = 20,
}: {
  className?: string;
  size?: number;
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <div className="absolute inset-0 rounded-full bg-[#039] flex items-center justify-center">
        {/* Create 12 stars in a circle */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 30 * Math.PI) / 180;
          const radius = size / 2 - 3;
          const x = radius * Math.sin(angle);
          const y = -radius * Math.cos(angle);

          return (
            <div
              key={i}
              className="absolute w-[2px] h-[2px] bg-[#fc0]"
              style={{
                transform: `translate(${x}px, ${y}px)`,
                width: size / 10,
                height: size / 10,
                borderRadius: '50%',
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default EuFlag;
