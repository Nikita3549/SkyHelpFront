import React from 'react';
import { Input } from '@/components/ui/input';
import { HelpCircle } from 'lucide-react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

type ClaimFormData = {
  bookingReference?: string;
};

interface BookingReferenceFieldProps {
  form: UseFormReturn<ClaimFormData>;
}

const BookingReferenceField: React.FC<BookingReferenceFieldProps> = ({
  form,
}) => {
  // Tooltip (hovercard)
  const hoverCard = (
    <HoverCard>
      <HoverCardTrigger asChild>
        <span className="cursor-help">
          <HelpCircle className="h-4 w-4 text-gray-400" />
        </span>
      </HoverCardTrigger>
      <HoverCardContent className="w-[500px] max-w-md bg-white p-6">
        <div className="space-y-4">
          <p className="text-sm">
            You can find your booking reference (also known as PNR or
            reservation code) on your e-ticket or other travel reservation
            document.
          </p>

          <div className="flex justify-center">
            <img
              src="/lovable-uploads/1e0292c1-67d0-4f4a-b16f-733d751a620b.png"
              alt="Boarding pass with PNR highlighted"
              className="w-[70%]"
            />
          </div>

          <ul className="text-sm space-y-2 list-disc pl-5">
            <li>
              A booking reference is usually a six-digit alphanumeric number
              (e.g. AMR6X3), but there may be exceptions.
            </li>
            <li>
              You'll find it in your booking confirmation email, e-ticket, or
              boarding pass.
            </li>
            <li>
              If you and your fellow passenger have different booking
              references, please only enter your number.
            </li>
          </ul>

          <p className="text-sm text-gray-500 italic">
            Don't worry if you don't have it right now — you can still continue.
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );

  return (
    <FormField
      control={form.control}
      name="bookingReference"
      render={({ field }) => (
        <FormItem>
          <div className="flex items-center space-x-2">
            <FormLabel className="text-base font-medium text-black">
              Booking Reference (PNR)
            </FormLabel>
            {hoverCard}
          </div>
          <FormControl>
            <Input placeholder="e.g. ABC123" {...field} />
          </FormControl>
          <FormDescription>
            Your booking reference is usually a 6-character alphanumeric code
            found in your airline confirmation email.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default BookingReferenceField;
