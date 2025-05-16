
import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Claim } from "@/lib/supabase";
import { MessageType } from "./types";
import { getMockMessages, groupMessagesByDate, isToday } from "./utils/messageUtils";
import MessageHeader from "./components/MessageHeader";
import DateGroup from "./components/DateGroup";
import MessageInput from "./components/MessageInput";

type MessagesLogProps = {
  claim: Claim;
}

const MessagesLog = ({ claim }: MessagesLogProps) => {
  const [filter, setFilter] = useState<'all' | 'client' | 'admin' | 'system'>('all');
  
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
  const groupedMessages = groupMessagesByDate(messages, filter);
  const dateGroups = Object.keys(groupedMessages).sort();
  
  // Handle sending a new message
  const handleSendReply = (replyText: string) => {
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
  };
  
  return (
    <div className="space-y-4">
      <MessageHeader 
        messageCount={messages.length}
        filter={filter}
        onFilterChange={setFilter}
      />
      
      <ScrollArea className="h-[400px] border rounded-md p-4 bg-gray-50">
        {dateGroups.length > 0 ? (
          dateGroups.map(date => (
            <DateGroup 
              key={date}
              date={date}
              messages={groupedMessages[date]}
              claim={claim}
              isToday={isToday(date)}
            />
          ))
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            No messages match the current filter
          </div>
        )}
      </ScrollArea>
      
      <MessageInput onSendMessage={handleSendReply} />
    </div>
  );
};

export default MessagesLog;
