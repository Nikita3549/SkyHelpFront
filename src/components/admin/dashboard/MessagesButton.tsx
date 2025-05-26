
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare } from "lucide-react";
import { messagesService, TicketMessage } from "@/services/messagesService";
import MessagesModal from "./MessagesModal";

const MessagesButton = () => {
  const [messages, setMessages] = useState<TicketMessage[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      const ticketMessages = await messagesService.getTicketMessages();
      setMessages(ticketMessages);
      
      // Count unread messages
      const unread = ticketMessages.filter(msg => !msg.isRead).length;
      setUnreadCount(unread);
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Reload messages when modal closes to update read status
    loadMessages();
  };

  return (
    <>
      <Button 
        onClick={handleOpenModal}
        variant="outline"
        className="relative"
      >
        <MessageSquare className="h-4 w-4 mr-2" />
        Messages
        {unreadCount > 0 && (
          <Badge 
            variant="destructive" 
            className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
          >
            {unreadCount}
          </Badge>
        )}
      </Button>

      <MessagesModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        messages={messages}
        onMessagesUpdate={loadMessages}
      />
    </>
  );
};

export default MessagesButton;
