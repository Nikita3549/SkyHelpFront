
import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Send } from "lucide-react";

interface MessageWritingZoneProps {
  messageText: string;
  onMessageChange: (text: string) => void;
  onSendMessage: () => void;
}

const MessageWritingZone = ({ messageText, onMessageChange, onSendMessage }: MessageWritingZoneProps) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      onSendMessage();
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center space-x-2 mb-2">
        <MessageSquare className="h-4 w-4 text-gray-500" />
        <span className="text-sm font-medium text-gray-700">Send a message to support</span>
      </div>
      <div className="space-y-3">
        <Textarea
          placeholder="Type your message here..."
          value={messageText}
          onChange={(e) => onMessageChange(e.target.value)}
          className="min-h-[100px] resize-none"
          onKeyDown={handleKeyDown}
        />
        <div className="flex justify-between items-center">
          <p className="text-xs text-gray-500">
            Press Ctrl+Enter (Cmd+Enter on Mac) to send
          </p>
          <Button onClick={onSendMessage} disabled={!messageText.trim()}>
            <Send className="h-4 w-4 mr-2" />
            Send Message
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MessageWritingZone;
