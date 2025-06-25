import React from 'react';
import { Link } from 'react-router-dom';

type NavigationLink = {
  name: string;
  href: string;
};

interface NavigationLinksProps {
  title: string;
  links: NavigationLink[];
}

const NavigationLinks: React.FC<NavigationLinksProps> = ({ title, links }) => {
  return (
    <div>
      <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4 max-md:text-center">
        {title}
      </h3>
      <ul className="space-y-3 max-md:flex max-md:flex-col max-md:align-middle max-md:justify-center">
        {links.map((item) => (
          <li key={item.name} className="max-md:text-center">
            {item.href.startsWith('/') || item.href.includes('affiliate') ? (
              <Link
                to={item.href}
                className="text-white font-medium hover:text-primary text-sm transition-colors"
              >
                {item.name}
              </Link>
            ) : (
              <a
                href={item.href}
                className="text-gray-500 hover:text-primary text-sm transition-colors"
              >
                {item.name}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavigationLinks;
