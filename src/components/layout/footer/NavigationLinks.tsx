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
      <h3 className="text-sm font-semibold text-gray-700 tracking-wider uppercase mb-4">
        {title}
      </h3>
      <ul className="space-y-3">
        {links.map((item) => (
          <li key={item.name}>
            {item.href.startsWith('/') || item.href.includes('affiliate') ? (
              <Link
                to={item.href}
                className="text-gray-500 hover:text-primary text-sm transition-colors"
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
