import React from 'react';
import { Check, Clock, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

type TimelineStep = {
  id: string;
  title: string;
  description: string;
  date?: string; // Making date optional with the ? modifier
  status: 'completed' | 'current' | 'upcoming';
  icon?: React.ReactNode;
};

type ClaimProgressTimelineProps = {
  steps: TimelineStep[];
  claimOpenedDate: string;
  onContactSupport: () => void;
};

const ClaimProgressTimeline = ({
  steps,
  claimOpenedDate,
  onContactSupport,
}: ClaimProgressTimelineProps) => {
  return (
    <div className="border-t pt-6 mt-8">
      <h3 className="text-lg font-semibold mb-4">Claim Progress</h3>

      <div className="space-y-0">
        {steps.map((step, index) => (
          <div key={step.id} className="relative">
            {/* Connecting line between timeline points */}
            {index < steps.length - 1 && (
              <div
                className={cn(
                  'absolute left-3.5 top-7 h-full w-0.5',
                  step.status === 'completed'
                    ? 'bg-primary'
                    : step.status === 'current'
                      ? 'bg-gradient-to-b from-primary to-gray-200'
                      : 'bg-gray-200',
                )}
              />
            )}

            <div className="relative flex items-start pt-2 pb-5">
              {/* Timeline icon */}
              <div
                className={cn(
                  'z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full',
                  step.status === 'completed'
                    ? 'bg-primary text-white'
                    : step.status === 'current'
                      ? 'bg-white border-2 border-primary text-primary'
                      : 'bg-gray-100 text-gray-400 border border-gray-200',
                )}
              >
                {step.status === 'completed' ? (
                  <Check className="h-4 w-4" />
                ) : step.status === 'current' ? (
                  <Clock className="h-4 w-4" />
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                )}
              </div>

              {/* Timeline content */}
              <div className="ml-4 flex-1">
                <h4
                  className={cn(
                    'font-medium',
                    step.status === 'completed'
                      ? 'text-gray-900'
                      : step.status === 'current'
                        ? 'text-primary'
                        : 'text-gray-500',
                  )}
                >
                  {step.title}
                </h4>
                <p className="mt-1 text-sm text-gray-600">{step.description}</p>
                {step.date && (
                  <p className="mt-0.5 text-xs text-gray-400">{step.date}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClaimProgressTimeline;
