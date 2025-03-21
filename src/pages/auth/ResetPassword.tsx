
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
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
import { authService } from '@/services/authService';
import { toast } from 'sonner';

const resetPasswordSchema = z.object({
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Password must be at least 6 characters'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

const ResetPassword = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [resetComplete, setResetComplete] = useState(false);

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    setIsLoading(true);
    try {
      await authService.updatePassword(data.password);
      setResetComplete(true);
      toast.success('Password has been reset successfully');
    } catch (error: any) {
      toast.error(error.message || 'Error resetting password');
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
          {!resetComplete ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">Reset Your Password</CardTitle>
                <CardDescription className="text-center">
                  Enter your new password
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>New Password</FormLabel>
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
                          <FormLabel>Confirm New Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="••••••••" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? 'Resetting...' : 'Reset Password'}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center text-green-600">Password Reset Complete!</CardTitle>
                <CardDescription className="text-center">
                  Your password has been successfully reset.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="mb-4">
                  You can now log in with your new password.
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

export default ResetPassword;
