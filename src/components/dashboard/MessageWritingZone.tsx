
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Send, Paperclip, X } from "lucide-react";
import { toast } from "sonner";

interface AttachedFile {
  file: File;
  id: string;
}

interface MessageWritingZoneProps {
  messageText: string;
  onMessageChange: (text: string) => void;
  onSendMessage: () => void;
}

const MessageWritingZone = ({ messageText, onMessageChange, onSendMessage }: MessageWritingZoneProps) => {
  const [attachedFiles, setAttachedFiles] = useState<AttachedFile[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    // Check if adding these files would exceed the limit
    if (attachedFiles.length + files.length > 10) {
      toast.error("Maximum 10 files allowed");
      return;
    }

    // Validate each file
    const validFiles: AttachedFile[] = [];
    for (const file of files) {
      if (file.size > 50 * 1024 * 1024) { // 50MB limit
        toast.error(`File "${file.name}" is too large. Maximum size is 50MB.`);
        continue;
      }
      
      validFiles.push({
        file,
        id: `${Date.now()}-${Math.random()}`
      });
    }

    if (validFiles.length > 0) {
      setAttachedFiles(prev => [...prev, ...validFiles]);
      toast.success(`${validFiles.length} file(s) attached`);
    }

    // Reset the input
    e.target.value = '';
  };

  const removeFile = (fileId: string) => {
    setAttachedFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleSendMessage = () => {
    if (!messageText.trim() && attachedFiles.length === 0) {
      toast.error("Please enter a message or attach files");
      return;
    }

    // In a real implementation, you would upload the files here
    console.log("Sending message with attachments:", {
      message: messageText,
      files: attachedFiles.map(f => ({ name: f.file.name, size: f.file.size }))
    });

    onSendMessage();
    setAttachedFiles([]);
  };

  return (
    <div className="w-full">
      <div className="flex items-center space-x-2 mb-2">
        <MessageSquare className="h-4 w-4 text-gray-500" />
        <span className="text-sm font-medium text-gray-700">Send a message to support</span>
      </div>
      
      <div className="space-y-3">
        {/* File attachments display */}
        {attachedFiles.length > 0 && (
          <div className="border rounded-lg p-3 bg-gray-50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Attached files ({attachedFiles.length}/10)
              </span>
            </div>
            <div className="space-y-2">
              {attachedFiles.map((attachedFile) => (
                <div key={attachedFile.id} className="flex items-center justify-between p-2 bg-white border rounded">
                  <div className="flex items-center space-x-2">
                    <Paperclip className="h-4 w-4 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-700 truncate max-w-xs">
                        {attachedFile.file.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatFileSize(attachedFile.file.size)}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(attachedFile.id)}
                    className="h-6 w-6 p-0"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        <Textarea
          placeholder="Type your message here..."
          value={messageText}
          onChange={(e) => onMessageChange(e.target.value)}
          className="min-h-[100px] resize-none"
          onKeyDown={handleKeyDown}
        />
        
        {/* Desktop and mobile layout for controls */}
        <div className="space-y-3">
          {/* Keyboard shortcut info for desktop */}
          <div className="hidden sm:flex sm:justify-end">
            <p className="text-xs text-gray-500">
              Press Ctrl+Enter (Cmd+Enter on Mac) to send
            </p>
          </div>
          
          {/* Button container - different layouts for mobile vs desktop */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            {/* Attach files button */}
            <div className="flex justify-center sm:justify-start">
              <input
                type="file"
                id="file-attachment"
                multiple
                className="hidden"
                onChange={handleFileSelect}
                disabled={attachedFiles.length >= 10}
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => document.getElementById('file-attachment')?.click()}
                disabled={attachedFiles.length >= 10}
                className="flex items-center space-x-1"
              >
                <Paperclip className="h-4 w-4" />
                <span>Attach Files</span>
              </Button>
            </div>
            
            {/* Send button */}
            <Button 
              onClick={handleSendMessage} 
              disabled={!messageText.trim() && attachedFiles.length === 0}
              className="w-full sm:w-auto"
            >
              <Send className="h-4 w-4 mr-2" />
              Send Message
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageWritingZone;
