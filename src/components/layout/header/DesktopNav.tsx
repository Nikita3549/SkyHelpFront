
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

interface DesktopNavProps {
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

const DesktopNav: React.FC<DesktopNavProps> = ({
  navigation,
  passengerRightsLinks,
  location,
  handleNavClick,
}) => {
  return (
    <nav className="hidden md:flex items-center space-x-2">
      {navigation.map((item) => (
        <Link
          key={item.name}
          to={item.href}
          onClick={(e) => handleNavClick(e, item.href)}
          className={cn(
            "relative px-3 py-2 font-medium text-sm transition-colors duration-300",
            location.pathname === item.href && !item.href.includes('#')
              ? "text-primary"
              : "text-gray-600 hover:text-primary"
          )}
        >
          <span className="relative">
            {item.name}
            <span
              className={cn(
                "absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300",
                location.pathname === item.href && !item.href.includes('#')
                  ? "w-full"
                  : "group-hover:w-full"
              )}
            />
          </span>
        </Link>
      ))}
      
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className={cn(
              "px-3 py-2 font-medium text-sm transition-colors duration-300",
              location.pathname.includes('/rights')
                ? "text-primary"
                : "text-gray-600 hover:text-primary"
            )}>Know Your Rights</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="w-[600px] p-4 grid grid-cols-2 gap-3">
                {passengerRightsLinks.map((link) => (
                  <Link 
                    key={link.name}
                    to={link.href}
                    className="block p-2 hover:bg-slate-100 rounded-md text-sm"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
};

export default DesktopNav;
