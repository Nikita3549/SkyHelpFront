
import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Menu, X, ChevronDown } from "lucide-react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "How It Works", href: "/#how-it-works" },
    { name: "Check Eligibility", href: "/claim" },
    { name: "FAQ", href: "/#faq" },
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
            <Link
              to="/"
              className="text-xl md:text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600 animate-fade-in"
            >
              CleverClaim
            </Link>
          </div>

          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "relative font-medium text-sm transition-colors duration-300",
                  location.pathname === item.href && item.href !== "/#how-it-works" && item.href !== "/#faq"
                    ? "text-primary"
                    : "text-gray-600 hover:text-primary"
                )}
              >
                <span className="relative">
                  {item.name}
                  <span
                    className={cn(
                      "absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300",
                      location.pathname === item.href && item.href !== "/#how-it-works" && item.href !== "/#faq"
                        ? "w-full"
                        : "group-hover:w-full"
                    )}
                  />
                </span>
              </Link>
            ))}
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

        {/* Mobile menu */}
        <div
          className={cn(
            "md:hidden absolute left-0 right-0 top-full bg-white shadow-lg transition-all duration-300 ease-in-out overflow-hidden",
            isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="px-4 py-6 space-y-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "block py-2 px-3 rounded-lg font-medium transition-colors",
                  location.pathname === item.href && item.href !== "/#how-it-works" && item.href !== "/#faq"
                    ? "text-primary bg-blue-50"
                    : "text-gray-600 hover:text-primary hover:bg-blue-50"
                )}
              >
                {item.name}
              </Link>
            ))}
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
