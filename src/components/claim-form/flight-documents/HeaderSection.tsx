import React from 'react';
import { TicketIcon } from 'lucide-react';

const HeaderSection: React.FC = () => {
  return (
    <>
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
        Add flight documents
      </h2>
      <p className="text-lg text-gray-700 mb-6">
        To submit a claim, we need just a few documents:
      </p>

      <div className="flex items-center gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-full">
          <TicketIcon className="w-8 h-8 text-blue-600" />
        </div>
        <p className="text-gray-700">
          Booking confirmation email, boarding pass, or any other document
          confirming your ticket reservation.
        </p>
      </div>
    </>
  );
};

export default HeaderSection;
