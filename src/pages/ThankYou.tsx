import React from 'react';
import Logo from '@/components/ui-custom/Logo.tsx';

export default function ThankYouPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f7fafe] px-4 text-center">
      <div className="max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="mb-6">
          <div className="w-full flex justify-center mb-3">
            <Logo withLink={false} />
          </div>
          <h1 className="text-3xl font-bold text-[#1f2937]">
            Thank you for signing!
          </h1>
          <p className="text-gray-600 mt-2">
            Your signature has been successfully submitted.
          </p>
        </div>
      </div>
    </div>
  );
}
