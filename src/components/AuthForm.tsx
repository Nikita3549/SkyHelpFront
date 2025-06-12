import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext.tsx';
import { Input } from '@/components/ui/input.tsx';
import { toast } from '@/hooks/use-toast.ts';
import { VerifyEmail } from '@/pages/VerifyEmail.tsx';
import { Spinner } from '@/components/Spinner.tsx';
import { AxiosError } from 'axios';

export enum FormTypes {
  LOGIN,
  REGISTER,
  FORGOT,
}

interface AuthFormProps {
  formType: FormTypes;
  setShowElements: (value: boolean) => void;
}
export default function AuthForm({ formType, setShowElements }: AuthFormProps) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [secondName, setSecondName] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [forgotCode, setForgotCode] = useState<number>();
  const navigate = useNavigate();
  const {
    login,
    register,
    verifyRegister,
    forgotPassword,
    verifyResetCode,
    resetPassword,
  } = useAuth();
  const [isVerifyEmail, _setIsVerifyEmail] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [isForgot, setIsForgot] = useState<boolean>(false);

  const setIsVerifyEmail = (value: boolean) => {
    setIsForgot(false);
    _setIsVerifyEmail(value);
    setShowElements(!value);
  };

  const handleVerifySubmit = async (code: number) => {
    setLoading(true);
    try {
      await verifyRegister(email, code);
      navigate('/');
    } catch (e: unknown) {
      if (e instanceof AxiosError) {
        setIsVerifyEmail(false);
      } else {
        toast({
          title: 'Authentication error',
          description: 'Something went wrong. Please try again.',
          variant: 'destructive',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    setError('');

    if (
      (formType == FormTypes.REGISTER ||
        (formType == FormTypes.FORGOT && isForgot)) &&
      password !== confirmPassword
    ) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }
    try {
      if (formType == FormTypes.LOGIN) {
        await login(email, password);
        navigate('/');
      } else if (formType == FormTypes.REGISTER) {
        await register({ name, secondName, email, password });
        setIsVerifyEmail(true);
      } else if (formType == FormTypes.FORGOT && isForgot) {
        await resetPassword(email, forgotCode, password);
        toast({
          title: 'Successfully changed',
          description: 'Password was changed. You can login',
        });
        navigate('/login');
      } else if (formType == FormTypes.FORGOT) {
        await forgotPassword(email);
        setIsForgot(true);
        setIsVerifyEmail(true);
      }
    } catch (err) {
      console.error(err);
      if (err instanceof Error && err.message == 'unknown') {
        toast({
          title: 'Authentication error',
          description: 'Something went wrong. Please try again.',
          variant: 'destructive',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotVerify = async (code: number) => {
    setLoading(true);
    try {
      await verifyResetCode(email, code);
      setForgotCode(code);
    } catch (err) {
      console.error(err);
      if (err instanceof Error && err.message == 'unknown') {
        toast({
          title: 'Authentication error',
          description: 'Something went wrong. Please try again.',
          variant: 'destructive',
        });
      }
      setIsForgot(false);
    } finally {
      setIsVerifyEmail(false);
      setLoading(false);
    }
  };

  if (isVerifyEmail) {
    return (
      <VerifyEmail
        email={email}
        onSubmit={isForgot ? handleForgotVerify : handleVerifySubmit}
        setIsVerifyEmail={setIsVerifyEmail}
        loading={loading}
        isForgot={isForgot}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4">
        {formType == FormTypes.REGISTER && (
          <>
            <div className="relative">
              <Input
                type="text"
                placeholder="First name"
                className="w-full pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="relative">
              <Input
                type="text"
                placeholder="Last name"
                className="w-full pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
                value={secondName}
                onChange={(e) => setSecondName(e.target.value)}
                required
              />
            </div>
          </>
        )}

        {!isForgot && (
          <div className="relative">
            <Input
              type="email"
              placeholder="Email"
              className="w-full pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        )}

        {(formType != FormTypes.FORGOT || isForgot) && (
          <div className="relative">
            <Input
              type="password"
              placeholder={isForgot ? 'New Password' : 'Password'}
              className="w-full pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={10}
            />
          </div>
        )}

        {formType != FormTypes.LOGIN &&
          (formType != FormTypes.FORGOT || isForgot) && (
            <div className="relative">
              <Input
                type="password"
                placeholder={
                  isForgot ? 'Confirm new password' : 'Confirm password'
                }
                className="w-full pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={10}
              />
            </div>
          )}
      </div>

      {error && (
        <p className="text-red-500 font-sans mt-2 font-semibold">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className={`mt-5 w-full px-4 py-3 rounded-lg font-medium text-white transition-colors shadow-md transform text-center
    ${loading ? 'bg-primary/80 cursor-not-allowed' : 'bg-primary hover:bg-blue-600 hover:shadow-lg hover:-translate-y-0.5'}
  `}
      >
        {loading ? (
          <Spinner />
        ) : formType == FormTypes.LOGIN ? (
          'Login'
        ) : formType == FormTypes.FORGOT ? (
          isForgot ? (
            'Reset'
          ) : (
            'Send code'
          )
        ) : (
          'Register'
        )}
      </button>
    </form>
  );
}
