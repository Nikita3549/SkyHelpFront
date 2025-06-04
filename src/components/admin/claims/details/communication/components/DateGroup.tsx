import React from 'react';
import { Calendar } from 'lucide-react';
import { format } from 'date-fns';
import MessageBubble from './MessageBubble';
import { MessageType } from '../types';
import { Claim } from '@/lib/supabase';

type DateGroupProps = {
  date: string;
  messages: MessageType[];
  claim: Claim;
  isToday: boolean;
};

const DateGroup = ({ date, messages, claim, isToday }: DateGroupProps) => {
  const formatDisplayDate = (dateString: string) => {
    return format(new Date(dateString), 'MMMM d, yyyy');
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-center mb-4">
        <div className="bg-gray-200 rounded-full px-3 py-1 text-xs flex items-center">
          <Calendar className="h-3 w-3 mr-1" />
          {isToday ? 'Today' : formatDisplayDate(date)}
        </div>
      </div>

      <div className="space-y-4">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            customerName={claim.customer}
          />
        ))}
      </div>
    </div>
  );
};

export default DateGroup;
