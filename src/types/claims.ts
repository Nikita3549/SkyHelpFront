
import { Claim } from "@/lib/supabase";

// Message type definition for communication logs
export type MessageEntry = {
  date: string;
  type: 'email' | 'message';
  direction: 'incoming' | 'outgoing' | 'system';
  subject?: string;
  body?: string;
  content?: string;
  sender?: 'client' | 'admin' | 'system';
  recipient?: string;
  status?: string;
  read?: boolean;
  tags?: string[];
};

export type ClaimUpdatePayload = {
  claimId: string;
  updates: Partial<Claim>;
};

export type EmailData = {
  sendEmail: boolean;
  subject: string;
  body: string;
};
