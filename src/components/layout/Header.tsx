
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Menu, X, ChevronDown, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold text-gray-900 flex items-center">
            <span className="text-primary">Flight</span>Claim
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link to="/">
              <Button variant="ghost">Home</Button>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-1">
                  Services <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Link to="/claim" className="w-full">
                    Flight Compensation
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/claim" className="w-full">
                    Delayed Flights
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/claim" className="w-full">
                    Cancelled Flights
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link to="/claim">
              <Button variant="ghost">File a Claim</Button>
            </Link>
            
            {/* Show Dashboard link if logged in */}
            {user && (
              <Link to="/dashboard">
                <Button variant="ghost">My Dashboard</Button>
              </Link>
            )}

            {/* Show admin button if admin user */}
            {user && user.email?.includes('admin') && (
              <Link to="/admin">
                <Button variant="ghost">Admin</Button>
              </Link>
            )}

            {/* Authentication buttons */}
            {!user ? (
              <>
                <Link to="/login">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link to="/register">
                  <Button>Create Account</Button>
                </Link>
              </>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {user.email?.split('@')[0]}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Link to="/dashboard" className="w-full">
                      My Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => logout()}>
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex items-center text-gray-900"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        className={`md:hidden ${isMenuOpen ? "block" : "hidden"}`}
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: isMenuOpen ? 1 : 0, height: isMenuOpen ? "auto" : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="container mx-auto px-4 py-4 bg-white shadow-lg rounded-b-lg">
          <div className="flex flex-col space-y-3">
            <Link to="/" className="px-4 py-2 hover:bg-gray-100 rounded-md">
              Home
            </Link>
            <div className="px-4 py-2 hover:bg-gray-100 rounded-md">
              <details>
                <summary className="list-none flex justify-between items-center cursor-pointer">
                  Services
                  <ChevronDown className="h-4 w-4" />
                </summary>
                <div className="mt-2 ml-2 space-y-2">
                  <Link
                    to="/claim"
                    className="block px-2 py-1 hover:text-primary text-sm"
                  >
                    Flight Compensation
                  </Link>
                  <Link
                    to="/claim"
                    className="block px-2 py-1 hover:text-primary text-sm"
                  >
                    Delayed Flights
                  </Link>
                  <Link
                    to="/claim"
                    className="block px-2 py-1 hover:text-primary text-sm"
                  >
                    Cancelled Flights
                  </Link>
                </div>
              </details>
            </div>
            <Link to="/claim" className="px-4 py-2 hover:bg-gray-100 rounded-md">
              File a Claim
            </Link>
            
            {/* Authenticated mobile nav links */}
            {user && (
              <Link to="/dashboard" className="px-4 py-2 hover:bg-gray-100 rounded-md">
                My Dashboard
              </Link>
            )}
            
            {user && user.email?.includes('admin') && (
              <Link to="/admin" className="px-4 py-2 hover:bg-gray-100 rounded-md">
                Admin Panel
              </Link>
            )}

            {/* Auth links for mobile */}
            {!user ? (
              <>
                <Link to="/login" className="px-4 py-2 hover:bg-gray-100 rounded-md">
                  Sign In
                </Link>
                <Link to="/register" className="px-4 py-2 bg-primary text-white rounded-md text-center">
                  Create Account
                </Link>
              </>
            ) : (
              <button 
                onClick={() => logout()} 
                className="px-4 py-2 text-left hover:bg-gray-100 rounded-md text-red-600"
              >
                Sign Out
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </header>
  );
};

export default Header;
