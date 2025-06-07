import React from 'react';
import { Separator } from '@/components/ui/separator';
import AnimatedButton from '@/components/ui-custom/AnimatedButton';

interface RightsCallToActionProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  stats?: {
    value: string;
    label: string;
  };
  additionalInfo?: string[];
  className?: string;
}

/**
 * Reusable call to action component for rights pages
 */
const RightsCallToAction = ({
  title = 'Tired of Fighting Airlines?',
  description = 'Let our experts handle.svg your flight compensation.svg claim. With our specialized knowledge of air passenger rights and years of experience dealing with resistant airlines, we can maximize your chances of receiving the compensation.svg you deserve.',
  buttonText = 'Start Your Compensation Claim Now',
  buttonLink = '/claim',
  stats,
  additionalInfo = [
    'Claim takes just 3 minutes to start',
    'Most claims resolved within 12 weeks',
  ],
  className = '',
}: RightsCallToActionProps) => {
  return (
    <>
      <Separator className="my-10" />

      <div
        className={`grid md:grid-cols-2 gap-8 my-10 bg-blue-50 p-8 rounded-xl ${className}`}
      >
        <div>
          <h3 className="text-2xl font-semibold mb-4">{title}</h3>
          <p className="mb-6">{description}</p>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>No win, no fee policy - we only get paid if you do</li>
            <li>We handle all airline communications and paperwork</li>
            <li>Higher success rate than claiming yourself</li>
            <li>Expert knowledge of case law and precedents</li>
            <li>Regular updates on your claim's progress</li>
          </ul>
          <AnimatedButton
            to={buttonLink}
            variant="primary"
            size="lg"
            className="mt-4"
          >
            {buttonText}
          </AnimatedButton>
        </div>
        {stats && (
          <div className="flex items-center justify-center">
            <div className="text-center">
              <div className="text-5xl font-bold text-primary mb-3">
                {stats.value}
              </div>
              <p className="text-xl">{stats.label}</p>
              {additionalInfo.map((info, index) => (
                <p key={index} className="text-sm mt-2 text-gray-600">
                  {info}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default RightsCallToAction;
