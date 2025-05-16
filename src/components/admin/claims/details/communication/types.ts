
export type MessageType = {
  id: string;
  timestamp: string; // ISO date string
  sender: 'client' | 'admin' | 'system';
  content: string;
  read: boolean;
  tags?: string[];
};
