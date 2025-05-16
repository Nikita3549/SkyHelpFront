
import { Claim } from "@/lib/supabase";
import { MessageType } from "../types";

// Generate mock messages for display purposes
export function getMockMessages(claim: Claim): MessageType[] {
  const customerName = claim.customer;
  const flightDate = claim.date;
  const flightNumber = claim.flightnumber;
  
  return [
    {
      id: 'msg-1',
      timestamp: getTimestampDaysAgo(14), // 14 days ago
      sender: 'client',
      content: `Hello, I submitted a claim for my flight ${flightNumber} on ${flightDate}. Could you please provide an update on the status?`,
      read: true,
      tags: ['initial-contact']
    },
    {
      id: 'msg-2',
      timestamp: getTimestampDaysAgo(14, 2), // 14 days ago + 2 hours
      sender: 'system',
      content: `Your message has been received. A customer support agent will respond within 24 hours.`,
      read: true,
      tags: ['auto-reply']
    },
    {
      id: 'msg-3',
      timestamp: getTimestampDaysAgo(13), // 13 days ago
      sender: 'admin',
      content: `Hello ${customerName},\n\nThank you for your message. We have received your claim and it is currently under review. We have contacted the airline and are waiting for their response.\n\nWe'll update you as soon as we have more information.`,
      read: true,
      tags: ['manual']
    },
    {
      id: 'msg-4',
      timestamp: getTimestampDaysAgo(7), // 7 days ago
      sender: 'system',
      content: `The status of your claim has been updated to "In Progress"`,
      read: true,
    },
    {
      id: 'msg-5',
      timestamp: getTimestampDaysAgo(2), // 2 days ago
      sender: 'client',
      content: `It's been a week since my last update. Is there any progress with my claim?`,
      read: true,
    },
    {
      id: 'msg-6',
      timestamp: getTimestampDaysAgo(1), // 1 day ago
      sender: 'admin',
      content: `Hello ${customerName},\n\nWe're still waiting for the final response from the airline. These processes can sometimes take time, but we're actively following up.\n\nWe appreciate your patience and will notify you immediately once we have an update.`,
      read: true,
      tags: ['follow-up']
    },
    {
      id: 'msg-7',
      timestamp: new Date().toISOString(), // Today
      sender: 'system',
      content: `New document uploaded to your claim: "Airline Response Letter"`,
      read: false,
    }
  ];
}

// Helper function to generate timestamps for mock data
export function getTimestampDaysAgo(days: number, hoursOffset = 0): string {
  const date = new Date();
  date.setDate(date.getDate() - days);
  date.setHours(date.getHours() + hoursOffset);
  return date.toISOString();
}

// Determine if a message was sent today
export function isToday(dateString: string): boolean {
  const today = new Date().toISOString().split('T')[0];
  return dateString === today;
}

// Groups messages by date
export function groupMessagesByDate(
  messages: MessageType[], 
  filter: 'all' | 'client' | 'admin' | 'system'
): Record<string, MessageType[]> {
  const groupedMessages: Record<string, MessageType[]> = {};
  
  messages.forEach(message => {
    // Only include messages that match the current filter
    if (filter !== 'all' && message.sender !== filter) return;
    
    const date = new Date(message.timestamp).toISOString().split('T')[0];
    if (!groupedMessages[date]) {
      groupedMessages[date] = [];
    }
    groupedMessages[date].push(message);
  });
  
  return groupedMessages;
}
