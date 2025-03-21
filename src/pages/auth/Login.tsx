
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const { login, requestPasswordReset } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      await login(data.email, data.password);
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail) return;
    
    setIsLoading(true);
    try {
      await requestPasswordReset(resetEmail);
      setShowForgotPassword(false);
    } catch (error) {
      console.error('Password reset error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {!showForgotPassword ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">Sign in to your account</CardTitle>
                <CardDescription className="text-center">
                  Enter your credentials to access your claims
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="your.email@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="••••••••" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? 'Signing in...' : 'Sign in'}
                    </Button>
                  </form>
                </Form>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button
                  variant="link"
                  className="px-0"
                  onClick={() => setShowForgotPassword(true)}
                >
                  Forgot your password?
                </Button>
                <div className="text-center text-sm">
                  Don't have an account?{' '}
                  <Link to="/register" className="font-medium text-primary hover:underline">
                    Register now
                  </Link>
                </div>
              </CardFooter>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">Reset Your Password</CardTitle>
                <CardDescription className="text-center">
                  Enter your email and we'll send you a reset link
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePasswordReset} className="space-y-6">
                  <div className="space-y-2">
                    <FormLabel>Email</FormLabel>
                    <Input
                      type="email"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Sending...' : 'Send Reset Link'}
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button variant="link" onClick={() => setShowForgotPassword(false)}>
                  Back to login
                </Button>
              </CardFooter>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
