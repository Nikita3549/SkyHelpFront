import React from 'react';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type MessageHeaderProps = {
  messageCount: number;
  filter: 'all' | 'client' | 'admin' | 'system';
  onFilterChange: (value: 'all' | 'client' | 'admin' | 'system') => void;
};

const MessageHeader = ({
  messageCount,
  filter,
  onFilterChange,
}: MessageHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <h3 className="text-lg font-medium">Messages History</h3>
        <Badge variant="outline" className="ml-2">
          {messageCount}
        </Badge>
      </div>

      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-500">Filter:</span>
        <Select
          value={filter}
          onValueChange={(value) => onFilterChange(value as any)}
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Filter by sender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Messages</SelectItem>
            <SelectItem value="client">Client</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default MessageHeader;
