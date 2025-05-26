
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, MessageSquare, Clock, CheckCircle } from "lucide-react";
import { TicketMessage } from "@/services/messagesService";
import MessageDetailsDialog from "./MessageDetailsDialog";

interface MessagesModalProps {
  isOpen: boolean;
  onClose: () => void;
  messages: TicketMessage[];
  onMessagesUpdate: () => void;
}

const MessagesModal = ({ isOpen, onClose, messages, onMessagesUpdate }: MessagesModalProps) => {
  const [selectedMessage, setSelectedMessage] = useState<TicketMessage | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const handleMessageClick = (message: TicketMessage) => {
    setSelectedMessage(message);
    setIsDetailsOpen(true);
  };

  const handleDetailsClose = () => {
    setIsDetailsOpen(false);
    setSelectedMessage(null);
    onMessagesUpdate();
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-orange-500" />;
      case 'responded':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'closed':
        return <CheckCircle className="h-4 w-4 text-gray-500" />;
      default:
        return <MessageSquare className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: 'destructive',
      responded: 'default',
      closed: 'secondary'
    } as const;
    
    return (
      <Badge variant={variants[status as keyof typeof variants] || 'default'}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
          <DialogHeader className="flex flex-row items-center justify-between">
            <DialogTitle className="text-xl font-semibold">Ticket Messages</DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="absolute top-4 right-4"
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogHeader>

          <ScrollArea className="h-[500px] mt-4">
            <div className="space-y-4">
              {messages.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No messages found
                </div>
              ) : (
                messages.map((message) => (
                  <div
                    key={message.id}
                    className={`p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${
                      !message.isRead ? 'border-primary bg-blue-50' : 'border-gray-200'
                    }`}
                    onClick={() => handleMessageClick(message)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(message.status)}
                        <h3 className="font-medium">{message.customerName}</h3>
                        {!message.isRead && (
                          <Badge variant="destructive" className="text-xs">New</Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusBadge(message.status)}
                        <span className="text-xs text-gray-500">
                          {new Date(message.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                      <span>Claim: {message.claimId}</span>
                      {message.flightNumber && (
                        <span>Flight: {message.flightNumber}</span>
                      )}
                      <span>{message.customerEmail}</span>
                    </div>
                    
                    <p className="text-sm text-gray-700 truncate">
                      {message.message}
                    </p>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {selectedMessage && (
        <MessageDetailsDialog
          isOpen={isDetailsOpen}
          onClose={handleDetailsClose}
          message={selectedMessage}
        />
      )}
    </>
  );
};

export default MessagesModal;
