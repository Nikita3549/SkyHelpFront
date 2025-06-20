import React, { useEffect, useRef, useState } from 'react';
import { Input } from '@/components/ui/input.tsx';
import { Button } from '@/components/ui/button.tsx';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '@/components/Spinner.tsx';
import { useAuth } from '@/contexts/AuthContext.tsx';
import { AxiosError } from 'axios';
import { toast } from '@/hooks/use-toast.ts';

interface VerifyEmailProps {
  email: string;
  onSubmit: (code: number) => void;
  setIsVerifyEmail: (value: boolean) => void;
  loading: boolean;
  isForgot: boolean;
  setIsForgot: (value: boolean) => void;
}

export function VerifyEmail({
  email,
  onSubmit,
  setIsVerifyEmail,
  loading,
  isForgot,
  setIsForgot,
}: VerifyEmailProps) {
  const [code, setCode] = useState<string[]>(Array(6).fill(''));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const [resendTimer, setResendTimer] = useState(0);
  const { resendCode } = useAuth();

  const handleResendCode = async () => {
    try {
      await resendCode(email);
    } catch (e: unknown) {
      if (e instanceof AxiosError) {
        setIsVerifyEmail(false);
      }
      toast({
        title: 'Authentication error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    }
    setResendTimer(60);
  };

  useEffect(() => {
    if (resendTimer > 0) {
      const interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [resendTimer]);

  const focusNext = (idx: number) => {
    if (idx < 5) inputsRef.current[idx + 1]?.focus();
  };

  const focusPrev = (idx: number) => {
    if (idx > 0) inputsRef.current[idx - 1]?.focus();
  };

  const handleChange = (value: string, idx: number) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newCode = [...code];
    newCode[idx] = value;
    setCode(newCode);

    if (value !== '') focusNext(idx);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    idx: number,
  ) => {
    if (e.key === 'Backspace' && !code[idx]) {
      focusPrev(idx);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData
      .getData('text')
      .replace(/\D/g, '')
      .slice(0, 6);
    if (!pasted) return;

    const newCode = [...code];
    for (let i = 0; i < pasted.length; i++) {
      newCode[i] = pasted[i];
      if (inputsRef.current[i]) {
        inputsRef.current[i]!.value = pasted[i];
      }
    }
    setCode(newCode);
    inputsRef.current[Math.min(pasted.length, 5)]?.focus();
    e.preventDefault();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fullCode = code.join('');
    if (fullCode.length === 6) {
      onSubmit(+fullCode);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative max-w-sm px-auto text-center space-y-6"
    >
      {/* Back arrow */}
      <button
        type="button"
        onClick={() =>
          (() => {
            if (isForgot) {
              setIsForgot(false);
            }
            setIsVerifyEmail(false);
          })()
        }
        className="absolute top-0 left-0 text-gray-500 hover:text-gray-700 transition-colors"
        aria-label="Back"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>

      <div>
        <h2 className="text-xl font-semibold text-gray-800">
          Confirm your email address
        </h2>
        <p className="text-sm text-gray-400 mt-2">
          We’ve sent a confirmation code to{' '}
          <span className="text-gray-500">{email}</span>. Check your inbox and
          enter the code here.
        </p>
      </div>

      <div className="flex justify-between gap-2">
        {code.map((char, idx) => (
          <Input
            key={idx}
            type="text"
            inputMode="numeric"
            maxLength={1}
            defaultValue={char}
            onChange={(e) => handleChange(e.target.value, idx)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            onPaste={handlePaste}
            ref={(el) => (inputsRef.current[idx] = el)}
            className="w-12 h-12 text-xl text-center rounded-md border border-gray-300 focus:ring-2 focus:ring-primary/50 focus:outline-none bg-background text-foreground"
          />
        ))}
      </div>

      {!isForgot && (
        <div className="mt-2 text-sm text-blue-600 cursor-pointer hover:underline">
          {resendTimer > 0 ? (
            <span>Resend code in {resendTimer}s</span>
          ) : (
            <span onClick={handleResendCode}>Resend code</span>
          )}
        </div>
      )}

      <Button
        type="submit"
        className="w-full py-3 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors"
        disabled={code.join('').length < 6 || loading}
      >
        {loading ? <Spinner /> : 'Confirm'}
      </Button>
    </form>
  );
}
