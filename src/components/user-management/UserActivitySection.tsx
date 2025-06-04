import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  LogIn,
  LogOut,
  Clock,
  AlertCircle,
  FileText,
  Settings,
  RefreshCcw,
} from 'lucide-react';

interface UserActivitySectionProps {
  userId: string;
}

const UserActivitySection = ({ userId }: UserActivitySectionProps) => {
  // This would be fetched from your database in a real application
  const activityLogs = [
    {
      id: 1,
      type: 'login',
      description: 'User logged in',
      timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
      icon: LogIn,
    },
    {
      id: 2,
      type: 'profile',
      description: 'Updated profile information',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      icon: Settings,
    },
    {
      id: 3,
      type: 'claim',
      description: 'Submitted new claim #CL-2023-01',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      icon: FileText,
    },
    {
      id: 4,
      type: 'logout',
      description: 'User logged out',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
      icon: LogOut,
    },
    {
      id: 5,
      type: 'login',
      description: 'User logged in',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
      icon: LogIn,
    },
    {
      id: 6,
      type: 'password',
      description: 'Password reset requested',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
      icon: RefreshCcw,
    },
  ];

  const getIconForActivityType = (type: string, IconComponent: any) => {
    return <IconComponent className="h-4 w-4" />;
  };

  const getIconBackgroundForType = (type: string) => {
    switch (type) {
      case 'login':
        return 'bg-green-100 text-green-700';
      case 'logout':
        return 'bg-blue-100 text-blue-700';
      case 'claim':
        return 'bg-purple-100 text-purple-700';
      case 'error':
        return 'bg-red-100 text-red-700';
      case 'profile':
        return 'bg-yellow-100 text-yellow-700';
      case 'password':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        {activityLogs.length > 0 ? (
          <ScrollArea className="h-80">
            <div className="relative space-y-4 before:absolute before:inset-y-0 before:left-5 before:w-[1px] before:bg-gray-200">
              {activityLogs.map((log) => (
                <div key={log.id} className="flex gap-4 relative">
                  <div
                    className={`rounded-full p-2 h-10 w-10 flex items-center justify-center z-10 ${getIconBackgroundForType(log.type)}`}
                  >
                    {getIconForActivityType(log.type, log.icon)}
                  </div>
                  <div className="flex-1 bg-gray-50 p-3 rounded-md">
                    <div className="flex justify-between items-start">
                      <p className="font-medium">{log.description}</p>
                      <p className="text-xs text-gray-500 flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {formatTimestamp(log.timestamp)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <AlertCircle className="h-10 w-10 mx-auto mb-2 opacity-30" />
            <p>No activity records found.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UserActivitySection;
