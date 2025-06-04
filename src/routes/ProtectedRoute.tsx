import { useAuth, UserRole } from '@/contexts/AuthContext';
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: UserRole[];
}

export const ProtectedRoute = ({
  children,
  requiredRole,
}: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  let hasAccess = false;
  requiredRole.forEach((role) => {
    if (user.role == role) {
      hasAccess = true;
    }
  });

  if (requiredRole && !hasAccess) {
    return (
      <Navigate
        to={
          user?.role === UserRole.ADMIN || user.role === UserRole.MODERATOR
            ? '/admin'
            : '/'
        }
      />
    );
  }

  return <>{children}</>;
};
