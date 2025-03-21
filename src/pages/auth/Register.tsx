
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

const registerSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Password must be at least 6 characters'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

const Register = () => {
  const { register } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      await register(data.email, data.password);
      form.reset();
      setRegistrationSuccess(true);
    } catch (error) {
      console.error('Registration error:', error);
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
          {!registrationSuccess ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">Create your account</CardTitle>
                <CardDescription className="text-center">
                  Create an account to manage your flight compensation claims
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
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="••••••••" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? 'Registering...' : 'Register'}
                    </Button>
                  </form>
                </Form>
              </CardContent>
              <CardFooter className="flex justify-center">
                <div className="text-center text-sm">
                  Already have an account?{' '}
                  <Link to="/login" className="font-medium text-primary hover:underline">
                    Sign in
                  </Link>
                </div>
              </CardFooter>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center text-green-600">Registration Successful!</CardTitle>
                <CardDescription className="text-center">
                  Please check your email to confirm your account.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="mb-4">
                  We've sent a confirmation link to your email address. Click on the link to activate your account.
                </p>
                <Link to="/login">
                  <Button>Go to Login</Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
