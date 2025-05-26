
import React from "react";
import { Button } from "@/components/ui/button";
import {
  MessageSquare,
  User,
} from "lucide-react";

interface Message {
  date: string;
  content: string;
  isFromTeam: boolean;
}

interface MessagesTabProps {
  messages: Message[];
  onGenerateNewMessage: () => void;
}

const MessagesTab = ({ messages, onGenerateNewMessage }: MessagesTabProps) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium text-gray-500">Communication History</h3>
        <Button onClick={onGenerateNewMessage} size="sm" variant="outline">
          <MessageSquare className="mr-2 h-4 w-4" />
          New Message
        </Button>
      </div>
      
      <div className="space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.isFromTeam ? "justify-start" : "justify-end"}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-4 ${
                message.isFromTeam
                  ? "bg-white border shadow-sm"
                  : "bg-primary text-white"
              }`}
            >
              <div className="flex items-center mb-2">
                {message.isFromTeam ? (
                  <>
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                      <User className="h-3 w-3 text-primary" />
                    </div>
                    <span className="text-xs font-medium">
                      Support Team
                    </span>
                  </>
                ) : (
                  <span className="text-xs font-medium">You</span>
                )}
                <span className="text-xs ml-auto opacity-70">
                  {new Date(message.date).toLocaleDateString()}
                </span>
              </div>
              <p className={`text-sm ${message.isFromTeam ? "text-gray-700" : "text-white"}`}>
                {message.content}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {messages.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No messages yet</p>
        </div>
      )}
    </div>
  );
};

export default MessagesTab;
