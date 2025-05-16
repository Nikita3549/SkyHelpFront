
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Claim } from "@/lib/supabase";
import { Calendar, Send, User, UserCircle2, BellRing } from "lucide-react";
import { format } from "date-fns";

type MessagesLogProps = {
  claim: Claim;
}

type MessageType = {
  id: string;
  timestamp: string; // ISO date string
  sender: 'client' | 'admin' | 'system';
  content: string;
  read: boolean;
  tags?: string[];
}

const MessagesLog = ({ claim }: MessagesLogProps) => {
  const [filter, setFilter] = useState<'all' | 'client' | 'admin' | 'system'>('all');
  const [replyText, setReplyText] = useState('');
  
  // Parse messages from claim data or use mock data if none exists
  const [messages, setMessages] = useState<MessageType[]>(() => {
    if (claim.communicationlog) {
      try {
        const parsedLog = JSON.parse(claim.communicationlog);
        // Filter for message-type communications (vs emails)
        const messageEntries = parsedLog.filter((entry: any) => entry.type === 'message') || [];
        return messageEntries;
      } catch (e) {
        console.error("Error parsing communication log for messages", e);
        return getMockMessages(claim);
      }
    } else {
      return getMockMessages(claim);
    }
  });
  
  // Group messages by date
  const groupedMessages: Record<string, MessageType[]> = {};
  
  messages.forEach(message => {
    // Only show messages that match the current filter
    if (filter !== 'all' && message.sender !== filter) return;
    
    const date = new Date(message.timestamp).toISOString().split('T')[0];
    if (!groupedMessages[date]) {
      groupedMessages[date] = [];
    }
    groupedMessages[date].push(message);
  });
  
  const dateGroups = Object.keys(groupedMessages).sort();
  
  // Handle sending a new message
  const handleSendReply = () => {
    if (!replyText.trim()) return;
    
    const newMessage: MessageType = {
      id: `msg-${Date.now()}`,
      timestamp: new Date().toISOString(),
      sender: 'admin',
      content: replyText,
      read: true,
      tags: ['manual']
    };
    
    setMessages([...messages, newMessage]);
    
    // In a real app, we would update the claim's communication log here
    // updateClaimCommunicationLog(claim.id, newMessage);
    
    setReplyText('');
  };
  
  // Format a date for display
  const formatDisplayDate = (dateString: string) => {
    return format(new Date(dateString), 'MMMM d, yyyy');
  };
  
  // Determine if a message was sent today
  const isToday = (dateString: string) => {
    const today = new Date().toISOString().split('T')[0];
    return dateString === today;
  };
  
  // Render sender icon based on sender type
  const renderSenderIcon = (sender: string) => {
    switch (sender) {
      case 'client':
        return <User className="h-4 w-4 text-blue-500" />;
      case 'admin':
        return <UserCircle2 className="h-4 w-4 text-green-600" />;
      case 'system':
        return <BellRing className="h-4 w-4 text-amber-500" />;
      default:
        return null;
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <h3 className="text-lg font-medium">Messages History</h3>
          <Badge variant="outline" className="ml-2">
            {messages.length}
          </Badge>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Filter:</span>
          <Select 
            value={filter}
            onValueChange={(value) => setFilter(value as any)}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Filter by sender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Messages</SelectItem>
              <SelectItem value="client">Client</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <ScrollArea className="h-[400px] border rounded-md p-4 bg-gray-50">
        {dateGroups.length > 0 ? (
          dateGroups.map(date => (
            <div key={date} className="mb-6">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-gray-200 rounded-full px-3 py-1 text-xs flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  {isToday(date) ? 'Today' : formatDisplayDate(date)}
                </div>
              </div>
              
              <div className="space-y-4">
                {groupedMessages[date].map(message => (
                  <div 
                    key={message.id} 
                    className={`flex ${message.sender === 'client' ? 'justify-start' : message.sender === 'system' ? 'justify-center' : 'justify-end'}`}
                  >
                    <div 
                      className={`
                        max-w-[80%] p-3 rounded-lg 
                        ${message.sender === 'client' ? 'bg-white border' : ''} 
                        ${message.sender === 'admin' ? 'bg-blue-100' : ''}
                        ${message.sender === 'system' ? 'bg-gray-100 text-gray-500 text-sm max-w-[90%] text-center' : ''}
                      `}
                    >
                      <div className="flex items-center space-x-2 mb-1">
                        {renderSenderIcon(message.sender)}
                        <span className="text-xs font-medium">
                          {message.sender === 'client' ? claim.customer : 
                           message.sender === 'admin' ? 'Support Agent' : 'System'}
                        </span>
                        <span className="text-xs text-gray-400">
                          {format(new Date(message.timestamp), 'HH:mm')}
                        </span>
                        {message.read === false && <Badge variant="outline" className="ml-2 bg-red-50">Unread</Badge>}
                        {message.tags && message.tags.map(tag => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            No messages match the current filter
          </div>
        )}
      </ScrollArea>
      
      <div className="flex space-x-2">
        <Input
          placeholder="Type your message..."
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendReply()}
          className="flex-1"
        />
        <Button onClick={handleSendReply}>
          <Send className="h-4 w-4 mr-2" />
          Send
        </Button>
      </div>
    </div>
  );
};

// Generate mock messages for display purposes
function getMockMessages(claim: Claim): MessageType[] {
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
function getTimestampDaysAgo(days: number, hoursOffset = 0): string {
  const date = new Date();
  date.setDate(date.getDate() - days);
  date.setHours(date.getHours() + hoursOffset);
  return date.toISOString();
}

export default MessagesLog;
