
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface AuthRedirectProps {
  children: React.ReactNode;
}

const AuthRedirect: React.FC<AuthRedirectProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="spinner mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (user) {
    // User is already authenticated, redirect to dashboard
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default AuthRedirect;
