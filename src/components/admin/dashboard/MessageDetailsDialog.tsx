
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { X, Send, User, Calendar, Plane } from "lucide-react";
import { TicketMessage, messagesService } from "@/services/messagesService";
import { toast } from "sonner";

interface MessageDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  message: TicketMessage;
}

const MessageDetailsDialog = ({ isOpen, onClose, message }: MessageDetailsDialogProps) => {
  const [reply, setReply] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSendReply = async () => {
    if (!reply.trim()) return;

    setIsSending(true);
    try {
      await messagesService.sendReply(message.id, reply);
      await messagesService.markAsRead(message.id);
      
      toast.success("Reply sent successfully", {
        description: `Your response has been sent to ${message.customerName}`,
      });
      
      setReply("");
      onClose();
    } catch (error) {
      toast.error("Failed to send reply", {
        description: "Please try again later",
      });
    } finally {
      setIsSending(false);
    }
  };

  const handleMarkAsRead = async () => {
    try {
      await messagesService.markAsRead(message.id);
      toast.success("Message marked as read");
      onClose();
    } catch (error) {
      toast.error("Failed to mark as read");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-xl font-semibold">
            Message from {message.customerName}
          </DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-4 right-4"
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Customer Info Card */}
          <Card className="p-4 bg-gray-50">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium">{message.customerName}</p>
                  <p className="text-xs text-gray-500">{message.customerEmail}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium">Claim: {message.claimId}</p>
                  {message.flightNumber && (
                    <div className="flex items-center space-x-1">
                      <Plane className="h-3 w-3 text-gray-400" />
                      <p className="text-xs text-gray-500">{message.flightNumber}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-3">
              <Badge variant={message.status === 'pending' ? 'destructive' : 'default'}>
                {message.status.charAt(0).toUpperCase() + message.status.slice(1)}
              </Badge>
              <span className="text-xs text-gray-500">
                {new Date(message.createdAt).toLocaleString()}
              </span>
            </div>
          </Card>

          {/* Message Content */}
          <Card className="p-4">
            <h4 className="font-medium mb-2">Customer Message:</h4>
            <p className="text-gray-700 whitespace-pre-wrap">{message.message}</p>
          </Card>

          {/* Reply Section */}
          <div className="space-y-3">
            <h4 className="font-medium">Reply to Customer:</h4>
            <Textarea
              placeholder="Type your reply here..."
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              rows={4}
              className="resize-none"
            />
            
            <div className="flex space-x-2">
              <Button 
                onClick={handleSendReply}
                disabled={!reply.trim() || isSending}
                className="flex-1"
              >
                <Send className="h-4 w-4 mr-2" />
                {isSending ? "Sending..." : "Send Reply"}
              </Button>
              
              {!message.isRead && (
                <Button 
                  variant="outline"
                  onClick={handleMarkAsRead}
                >
                  Mark as Read
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MessageDetailsDialog;
