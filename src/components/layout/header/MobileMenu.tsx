
import React from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  isOpen: boolean;
  navigation: Array<{
    name: string;
    href: string;
  }>;
  passengerRightsLinks: Array<{
    name: string;
    href: string;
  }>;
  location: {
    pathname: string;
  };
  handleNavClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  navigation,
  passengerRightsLinks,
  location,
  handleNavClick,
}) => {
  return (
    <div
      className={cn(
        "md:hidden absolute left-0 right-0 top-full bg-white shadow-lg transition-all duration-300 ease-in-out overflow-hidden z-50",
        isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
      )}
    >
      <div className="px-4 py-6 space-y-3">
        {navigation.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            onClick={(e) => handleNavClick(e, item.href)}
            className={cn(
              "block py-2 px-3 rounded-lg font-medium transition-colors",
              location.pathname === item.href && !item.href.includes('#')
                ? "text-primary bg-blue-50"
                : "text-gray-600 hover:text-primary hover:bg-blue-50"
            )}
          >
            {item.name}
          </Link>
        ))}
        
        <div className="py-2">
          <div 
            className="flex justify-between items-center px-3 py-2 rounded-lg font-medium text-gray-600 hover:text-primary hover:bg-blue-50"
            onClick={() => {
              const rightsMenu = document.getElementById('mobile-rights-menu');
              if (rightsMenu) {
                rightsMenu.classList.toggle('hidden');
              }
            }}
          >
            <span>Know Your Rights</span>
            <ChevronDown className="h-4 w-4" />
          </div>
          <div id="mobile-rights-menu" className="hidden pl-4 mt-1 space-y-2">
            {passengerRightsLinks.map((link) => (
              <Link 
                key={link.name}
                to={link.href}
                className="block py-1 px-3 text-sm text-gray-600 hover:text-primary"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
        
        <hr className="my-2 border-gray-100" />
        <Link
          to="/dashboard"
          className="block py-2 px-3 rounded-lg font-medium text-gray-600 hover:text-primary hover:bg-blue-50 transition-colors"
        >
          My Claims
        </Link>
        <Link
          to="/claim"
          className="block py-2 px-3 rounded-lg text-center font-medium text-white bg-primary hover:bg-blue-600 transition-colors"
        >
          Start Your Claim
        </Link>
      </div>
    </div>
  );
};

export default MobileMenu;
