
import React, { createContext, useContext, useState, useEffect } from "react";

type AuthUser = {
  id: string;
  email: string;
  name: string;
  isAffiliate: boolean;
};

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already logged in on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("affiliateUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Simulated login function
  const login = async (email: string, password: string) => {
    // Simple validation
    if (!email || !password) {
      return { success: false, message: "Email and password are required" };
    }

    // For demo purposes, let's accept any email with a valid format and password length > 5
    if (!email.includes("@") || password.length < 6) {
      return { success: false, message: "Invalid email or password (must be at least 6 characters)" };
    }

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Mock successful login
    const mockUser: AuthUser = {
      id: "aff-" + Math.random().toString(36).substring(2, 10),
      email,
      name: email.split("@")[0], // Use part of email as name
      isAffiliate: true,
    };

    // Store in localStorage
    localStorage.setItem("affiliateUser", JSON.stringify(mockUser));
    setUser(mockUser);

    return { success: true, message: "Login successful" };
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("affiliateUser");
    setUser(null);
  };

  const value = {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
