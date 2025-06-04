import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface MarqueeProps {
  children: React.ReactNode;
  className?: string;
  speed?: number; // pixels per second
  pauseDuration?: number; // milliseconds
  direction?: 'left' | 'right';
}

const Marquee = ({
  children,
  className,
  speed = 50,
  pauseDuration = 2000,
  direction = 'left',
}: MarqueeProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  // Increase speed for mobile - changed from 0.7 multiplier to 1.2 multiplier
  const adjustedSpeed = isMobile ? speed * 1.2 : speed;

  useEffect(() => {
    if (!scrollRef.current || !contentRef.current) return;

    let animationFrameId: number;
    let lastTimestamp: number;
    let pauseStart: number | null = null;
    const contentWidth = contentRef.current.offsetWidth;
    const containerWidth = scrollRef.current.offsetWidth;
    let position = direction === 'left' ? containerWidth : -contentWidth;

    const animate = (timestamp: number) => {
      if (!scrollRef.current || !contentRef.current) return;

      if (!lastTimestamp) {
        lastTimestamp = timestamp;
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      const elapsed = timestamp - lastTimestamp;
      lastTimestamp = timestamp;

      // Check if we need to pause (when content is fully visible)
      if (direction === 'left') {
        if (position + contentWidth <= 0 && pauseStart === null) {
          pauseStart = timestamp;
        }
      } else {
        if (position >= containerWidth && pauseStart === null) {
          pauseStart = timestamp;
        }
      }

      // Handle pause
      if (pauseStart !== null) {
        if (timestamp - pauseStart >= pauseDuration) {
          pauseStart = null;
          // Reset position after pause
          position = direction === 'left' ? containerWidth : -contentWidth;
        }
      } else {
        // Move content
        const pixelsToMove = (adjustedSpeed * elapsed) / 1000;
        position -= direction === 'left' ? pixelsToMove : -pixelsToMove;
      }

      // Apply new position
      contentRef.current.style.transform = `translateX(${position}px)`;

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [direction, adjustedSpeed, pauseDuration]);

  return (
    <div className={cn('overflow-hidden relative', className)} ref={scrollRef}>
      <div ref={contentRef} className="inline-block whitespace-nowrap">
        {children}
      </div>
    </div>
  );
};

export default Marquee;
