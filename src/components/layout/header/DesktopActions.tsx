import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import LanguageSelector from './LanguageSelector';
import { useAuth } from '@/contexts/AuthContext.tsx';

const DesktopActions = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <div className="hidden md:flex items-center space-x-4">
      <LanguageSelector />
      <Button
        variant="outline"
        onClick={() => navigate(isAuthenticated ? '/dashboard' : '/login')}
        className="border-primary text-primary hover:bg-primary hover:text-white"
      >
        My Claims
      </Button>
    </div>
  );
};

export default DesktopActions;
