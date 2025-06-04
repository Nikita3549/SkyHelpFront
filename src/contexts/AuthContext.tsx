// src/context/AuthContext.tsx
import { createContext, useContext, useEffect, useState } from 'react';
import { getToken, setToken, clearToken } from '@/utils/auth';
import api from '@/api/axios';
import { AxiosError, AxiosResponse, HttpStatusCode } from 'axios';
import { toast } from '@/hooks/use-toast.ts';

export enum UserRole {
  ADMIN = 'ADMIN',
  MODERATOR = 'MODERATOR',
  CLIENT = 'CLIENT',
}

interface User {
  id: string;
  email: string;
  name: string;
  secondName: string;
  role: UserRole;
  isActive: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (registerDto: {
    email: string;
    password: string;
    name: string;
    secondName: string;
  }) => Promise<void>;
  verifyRegister: (email: string, code: number) => Promise<void>;
  resendCode: (email: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  verifyResetCode: (email: string, code: number) => Promise<void>;
  resetPassword: (
    email: string,
    code: number,
    newPassword: string,
  ) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (token) {
      api
        .get('/auth/me')
        .then((res) => {
          setUser(res.data);
        })
        .catch(() => {
          clearToken();
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const res = await api
      .post('/auth/login', { email, password })
      .catch((e: AxiosError) => {
        if (e.status == HttpStatusCode.Unauthorized) {
          toast({
            title: 'Wrong credentials',
            description: 'Incorrect email or password',
            variant: 'destructive',
          });
          throw e;
        }
        throw new Error('unknown');
      });
    const token = res.data.jwt;
    setToken(token);

    const userRes = await api.get('/auth/me');
    setUser(userRes.data);
  };

  const logout = () => {
    clearToken();
    setUser(null);
  };
  const register = async (registerDto) => {
    const res: AxiosResponse<string> = await api
      .post('/auth/register', {
        ...registerDto,
      })
      .catch((e: AxiosError) => {
        if (e.status == HttpStatusCode.Conflict) {
          toast({
            title: 'Conflict',
            description: 'This email already registered',
            variant: 'destructive',
          });
          throw e;
        }
        if (e.status == HttpStatusCode.BadRequest) {
          toast({
            title: 'Wrong Email',
            description: 'Email must be an email',
            variant: 'destructive',
          });
          throw e;
        }
        throw new Error('unknown');
      });

    if (res.status != HttpStatusCode.Ok) {
      throw new Error();
    }
  };
  const verifyRegister = async (email: string, code: number) => {
    const res = await api
      .post('/auth/verify-register', {
        email,
        code: code,
      })
      .catch((e: AxiosError) => {
        if (e.status == HttpStatusCode.BadRequest) {
          toast({
            title: 'Wrong credentials',
            description: 'Email is wrong or code is expired',
            variant: 'destructive',
          });
          throw e;
        }
        throw new Error('unknown');
      });

    const token = res.data.jwt;
    setToken(token);

    const userRes = await api.get('/auth/me');
    setUser(userRes.data);
  };

  const resendCode = async (email: string) => {
    await api
      .post('/auth/resend-code/', {
        email,
      })
      .catch((e: AxiosError) => {
        if (e.status == HttpStatusCode.BadRequest) {
          toast({
            title: 'Wrong credentials',
            description: 'Email is wrong or code is expired',
            variant: 'destructive',
          });
          throw e;
        }
        throw new Error('unknown');
      });
  };

  const forgotPassword = async (email: string) => {
    const res: AxiosResponse = await api
      .post('/auth/forgot-password', {
        email,
      })
      .catch((e: AxiosError) => {
        if (e.status == HttpStatusCode.BadRequest) {
          toast({
            title: 'Wrong email',
            description: "This email isn't registered",
            variant: 'destructive',
          });
          throw e;
        }
        throw new Error('unknown');
      });
  };

  const verifyResetCode = async (email: string, code: number) => {
    await api
      .post('/auth/verify-reset-password', {
        email,
        code,
      })
      .catch((e: AxiosError) => {
        if (e.status == HttpStatusCode.BadRequest) {
          toast({
            title: 'Wrong code',
            description: 'Code is wrong or expired',
            variant: 'destructive',
          });
          throw e;
        }
        throw new Error('unknown');
      });
  };

  const resetPassword = async (
    email: string,
    code: number,
    newPassword: string,
  ) => {
    await api
      .post('/auth/reset-password', {
        email,
        code,
        newPassword,
      })
      .catch((e: AxiosError) => {
        if (e.status == HttpStatusCode.BadRequest) {
          toast({
            title: 'Oops..',
            description: 'Unknown error was occurred',
            variant: 'destructive',
          });
          throw e;
        }
        throw new Error('unknown');
      });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        register,
        verifyRegister,
        resendCode,
        forgotPassword,
        verifyResetCode,
        resetPassword,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
