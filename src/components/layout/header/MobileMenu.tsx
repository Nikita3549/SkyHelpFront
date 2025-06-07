import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import LanguageSelector from './LanguageSelector';
import { useAuth } from '@/contexts/AuthContext.tsx';

interface MobileMenuProps {
  isOpen: boolean;
  navigation: Array<{
    name: string;
    href: string;
    current?: boolean;
    hasDropdown?: boolean;
    subItems?: Array<{ name: string; href: string; description?: string }>;
  }>;
  passengerRightsLinks: Array<{
    name: string;
    href: string;
    description?: string;
  }>;
  location: { pathname: string };
  handleNavClick: (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  navigation,
  passengerRightsLinks,
  location,
  handleNavClick,
}) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <div
      className={cn(
        'md:hidden transition-all duration-300 ease-in-out overflow-hidden',
        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0',
      )}
    >
      <div className="px-2 pt-2 pb-3 space-y-1 bg-white shadow-lg rounded-lg mt-2">
        {navigation.map((item) => (
          <div key={item.name}>
            <a
              href={item.href}
              className={cn(
                'block px-3 py-2 text-base font-medium rounded-md transition-colors',
                location.pathname === item.href
                  ? 'bg-primary text-white'
                  : 'text-gray-700 hover:bg-gray-100',
              )}
              onClick={(e) => handleNavClick(e, item.href)}
            >
              {item.name}
            </a>
            {item.name === 'Passenger Rights' && (
              <div className="ml-4 space-y-1">
                {passengerRightsLinks.map((subItem) => (
                  <a
                    key={subItem.name}
                    href={subItem.href}
                    className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md"
                    onClick={(e) => handleNavClick(e, subItem.href)}
                  >
                    {subItem.name}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}

        <div className="pt-4 border-t border-gray-200">
          {/*<div className="flex items-center justify-between px-3 py-2">*/}
          {/*<span className="text-sm font-medium text-gray-700">Language</span>*/}
          {/*<LanguageSelector />*/}
          {/*</div>*/}
          <Button
            className="w-full mt-2 bg-primary hover:bg-primary/90"
            onClick={() => navigate(isAuthenticated ? '/dashboard' : '/login')}
          >
            My Claims
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
