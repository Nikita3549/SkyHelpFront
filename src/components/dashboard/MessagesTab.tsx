
import React from "react";
import { Button } from "@/components/ui/button";
import {
  User,
  Paperclip,
  Download,
} from "lucide-react";

interface MessageAttachment {
  name: string;
  size: number;
  url?: string;
}

interface Message {
  date: string;
  content: string;
  isFromTeam: boolean;
  attachments?: MessageAttachment[];
}

interface MessagesTabProps {
  messages: Message[];
  onGenerateNewMessage: () => void;
}

const MessagesTab = ({ messages, onGenerateNewMessage }: MessagesTabProps) => {
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium text-gray-500">Communication History</h3>
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
              
              {message.content && (
                <p className={`text-sm mb-2 ${message.isFromTeam ? "text-gray-700" : "text-white"}`}>
                  {message.content}
                </p>
              )}
              
              {message.attachments && message.attachments.length > 0 && (
                <div className="space-y-2">
                  {message.attachments.map((attachment, attachIndex) => (
                    <div
                      key={attachIndex}
                      className={`flex items-center justify-between p-2 rounded border ${
                        message.isFromTeam 
                          ? "bg-gray-50 border-gray-200" 
                          : "bg-white/10 border-white/20"
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <Paperclip className={`h-3 w-3 ${message.isFromTeam ? "text-gray-400" : "text-white/70"}`} />
                        <div>
                          <p className={`text-xs font-medium truncate max-w-xs ${
                            message.isFromTeam ? "text-gray-700" : "text-white"
                          }`}>
                            {attachment.name}
                          </p>
                          <p className={`text-xs ${message.isFromTeam ? "text-gray-500" : "text-white/70"}`}>
                            {formatFileSize(attachment.size)}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`h-6 w-6 p-0 ${
                          message.isFromTeam 
                            ? "hover:bg-gray-200" 
                            : "hover:bg-white/20 text-white hover:text-white"
                        }`}
                        onClick={() => {
                          // In a real implementation, this would download the file
                          console.log("Downloading file:", attachment.name);
                        }}
                      >
                        <Download className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
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
