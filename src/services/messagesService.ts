
import { supabase } from '@/lib/supabase';

export interface TicketMessage {
  id: string;
  claimId: string;
  customerName: string;
  customerEmail: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  flightNumber?: string;
  status: 'pending' | 'responded' | 'closed';
}

export const messagesService = {
  // Get all ticket messages
  getTicketMessages: async (): Promise<TicketMessage[]> => {
    // Mock data for now - in real app, this would fetch from database
    return [
      {
        id: 'msg-001',
        claimId: 'CLM-1234',
        customerName: 'John Smith',
        customerEmail: 'john@example.com',
        message: 'Hello, I have a question about my claim status. When can I expect an update?',
        isRead: false,
        createdAt: '2024-01-15T10:30:00Z',
        flightNumber: 'LH1234',
        status: 'pending'
      },
      {
        id: 'msg-002',
        claimId: 'CLM-5678',
        customerName: 'Sarah Johnson',
        customerEmail: 'sarah@example.com',
        message: 'I need to update my bank account details for the compensation payment.',
        isRead: false,
        createdAt: '2024-01-15T09:15:00Z',
        flightNumber: 'BA2160',
        status: 'pending'
      },
      {
        id: 'msg-003',
        claimId: 'CLM-9012',
        customerName: 'Michael Brown',
        customerEmail: 'michael@example.com',
        message: 'Thank you for processing my claim so quickly!',
        isRead: true,
        createdAt: '2024-01-14T16:45:00Z',
        flightNumber: 'FR8012',
        status: 'responded'
      }
    ];
  },

  // Mark message as read
  markAsRead: async (messageId: string): Promise<void> => {
    console.log('Marking message as read:', messageId);
    // In real app, this would update the database
  },

  // Send reply to customer
  sendReply: async (messageId: string, reply: string): Promise<void> => {
    console.log('Sending reply to message:', messageId, reply);
    // In real app, this would send email and update database
  }
};
