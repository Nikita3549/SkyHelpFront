import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';

type MessageInputProps = {
  onSendMessage: (message: string) => void;
};

const MessageInput = ({ onSendMessage }: MessageInputProps) => {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (!text.trim()) return;
    onSendMessage(text);
    setText('');
  };

  return (
    <div className="flex space-x-2">
      <Input
        placeholder="Type your message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        className="flex-1"
      />
      <Button onClick={handleSend}>
        <Send className="h-4 w-4 mr-2" />
        Send
      </Button>
    </div>
  );
};

export default MessageInput;
