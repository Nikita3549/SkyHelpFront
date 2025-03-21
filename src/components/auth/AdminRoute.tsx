
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface AdminRouteProps {
  children: React.ReactNode;
}

// In a real app, this would check for admin status in the user profile
// For this example, we'll just check if the email has 'admin' in it
const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
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

  if (!user) {
    // Redirect to login, but save the current location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Basic admin check - in a real app you would check user roles
  const isAdmin = user.email?.includes('admin');
  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default AdminRoute;
