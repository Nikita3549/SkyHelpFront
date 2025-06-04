import React from 'react';
import Logo from '@/components/ui-custom/Logo';
import { SocialLink } from '../Footer';

interface SocialLinksProps {
  social: SocialLink[];
}

const SocialLinks: React.FC<SocialLinksProps> = ({ social }) => {
  return (
    <div className="space-y-6">
      <Logo size="lg" withLink={false} />
      <p className="text-gray-500 text-sm max-w-xs">
        Helping air passengers get the compensation they deserve when flights
        are delayed or canceled.
      </p>
      <div className="flex space-x-4">
        {social.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className="text-gray-400 hover:text-primary transition-colors"
          >
            <span className="sr-only">{item.name}</span>
            <item.icon className="h-5 w-5" aria-hidden="true" />
          </a>
        ))}
      </div>
    </div>
  );
};

export default SocialLinks;
