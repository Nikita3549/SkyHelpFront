
import React from "react";
import { Badge } from "@/components/ui/badge";
import { User, UserCircle2, BellRing } from "lucide-react";
import { format } from "date-fns";
import { MessageType } from "../types";

type MessageBubbleProps = {
  message: MessageType;
  customerName: string;
}

const MessageBubble = ({ message, customerName }: MessageBubbleProps) => {
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
    <div 
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
            {message.sender === 'client' ? customerName : 
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
  );
};

export default MessageBubble;
