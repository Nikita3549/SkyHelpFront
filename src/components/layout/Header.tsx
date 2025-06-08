import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import Logo from '@/components/ui-custom/Logo';
import DesktopNav from './header/DesktopNav';
import DesktopActions from './header/DesktopActions';
import MobileMenu from './header/MobileMenu';
import { getNavigationData } from './header/navigationData';
import { useAuth } from '@/contexts/AuthContext.tsx';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { navigation, passengerRightsLinks } = getNavigationData();

  useEffect(() => {
    const handleScroll = () => {
      // if (window.scrollY > 10) {
      setScrolled(true);
      // } else {
      //   setScrolled(false);
      // }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (href.includes('#')) {
      e.preventDefault();

      const isOnHomePage = location.pathname === '/';
      const elementId = href.split('#')[1];
      const element = document.getElementById(elementId);

      if (isOnHomePage && element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate('/', { state: { scrollTo: elementId } });
      }

      setIsOpen(false);
    }
  };

  return (
    <header
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300 ease-in-out py-2',
        scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent',
      )}
    >
      <div className="container-custom">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Logo size="lg" />
          </div>

          <DesktopNav
            navigation={navigation}
            passengerRightsLinks={passengerRightsLinks}
            location={location}
            handleNavClick={handleNavClick}
          />

          <DesktopActions />

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-primary transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        <MobileMenu
          isOpen={isOpen}
          navigation={navigation}
          passengerRightsLinks={passengerRightsLinks}
          location={location}
          handleNavClick={handleNavClick}
        />
      </div>
    </header>
  );
};

export default Header;
