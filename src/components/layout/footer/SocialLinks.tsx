import React from 'react';
import Logo from '@/components/ui-custom/Logo';
import { SocialLink } from '../Footer';

interface SocialLinksProps {
  social: SocialLink[];
}

const SocialLinks: React.FC<SocialLinksProps> = ({ social }) => {
  return (
    <div className="space-y-6 max-md:flex max-md:flex-col max-md:align-middle max-md:justify-center">
      {/*<Logo size="lg" withLink={false} />*/}
      <img src={'/footer/logo.png'} className="h-12 object-contain" />
      <p className="text-white font-medium text-sm max-w-xs max-md:text-center max-md:min-w-full">
        Helping air passengers get the <br />
        compensation they deserve when
        <br /> flights are delayed or canceled.
      </p>
      <div className="flex space-x-4 max-md:justify-center">
        {social.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className="text-white hover:text-primary transition-colors"
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
