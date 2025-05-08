import React, { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Menu, X, ChevronDown } from "lucide-react";
import Logo from "@/components/ui-custom/Logo";
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "How It Works", href: "/#how-it-works" },
    { name: "Check Eligibility", href: "/claim" },
    { name: "FAQ", href: "/#faq" },
  ];

  const passengerRightsLinks = [
    { name: "Air Passenger Rights", href: "/rights/air-passenger-rights" },
    { name: "Delayed Flight Compensation", href: "/rights/delayed-flight-compensation" },
    { name: "Overbooked Flight Compensation", href: "/rights/overbooked-flight-compensation" },
    { name: "Cancelled Flight Compensation", href: "/rights/cancelled-flight-compensation" },
    { name: "Denied Boarding Compensation", href: "/rights/denied-boarding-compensation" },
    { name: "Missed Connection Compensation", href: "/rights/missed-connection-compensation" },
    { name: "Airline Strike Compensation", href: "/rights/airline-strike-compensation" },
    { name: "Delayed Baggage Compensation", href: "/rights/delayed-baggage-compensation" },
    { name: "Flight Compensation", href: "/rights/flight-compensation" },
    { name: "SHY Regulation Turkey", href: "/rights/shy-regulation-turkey" },
    { name: "ANAC 400 Regulation", href: "/rights/anac-400-regulation" },
    { name: "UK 261 Flight Compensation", href: "/rights/uk-261-flight-compensation" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
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
        "fixed top-0 w-full z-50 transition-all duration-300 ease-in-out",
        scrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm py-2"
          : "bg-transparent py-4"
      )}
    >
      <div className="container-custom">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Logo size="md" />
          </div>

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

          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/dashboard"
              className="text-sm font-medium text-gray-600 hover:text-primary transition-colors"
            >
              My Claims
            </Link>
            <Link
              to="/claim"
              className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-full hover:bg-blue-600 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Start Your Claim
            </Link>
          </div>

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
      </div>
    </header>
  );
};

export default Header;
