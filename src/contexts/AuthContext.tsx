
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { authService } from '@/services/authService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  requestPasswordReset: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { session } = await authService.login(email, password);
      setSession(session);
      setUser(session?.user ?? null);
      toast.success('Successfully logged in');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.message || 'Failed to login');
      throw error;
    }
  };

  const register = async (email: string, password: string) => {
    try {
      await authService.register(email, password);
      toast.success('Registration successful! Please check your email to confirm your account.');
    } catch (error: any) {
      toast.error(error.message || 'Failed to register');
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setSession(null);
      setUser(null);
      toast.success('Successfully logged out');
      navigate('/');
    } catch (error: any) {
      toast.error(error.message || 'Failed to logout');
      throw error;
    }
  };

  const requestPasswordReset = async (email: string) => {
    try {
      await authService.requestPasswordReset(email);
      toast.success('Password reset email sent. Please check your inbox.');
    } catch (error: any) {
      toast.error(error.message || 'Failed to send password reset email');
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        loading,
        login,
        register,
        logout,
        requestPasswordReset,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
