import React from 'react';
import { motion } from 'framer-motion';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  PlusCircle,
  MailCheck,
  Banknote,
  CheckCircle2,
  XCircle,
  ChevronRight,
} from 'lucide-react';

const recentActivities = [
  {
    id: 1,
    action: 'Claim submitted',
    claimId: 'CLM-1007',
    user: 'David Wilson',
    time: 'Today, 09:45 AM',
  },
  {
    id: 2,
    action: 'Airline responded',
    claimId: 'CLM-1002',
    user: 'System',
    time: 'Today, 08:30 AM',
  },
  {
    id: 3,
    action: 'Payment processed',
    claimId: 'CLM-1004',
    user: 'Admin',
    time: 'Yesterday, 05:20 PM',
  },
  {
    id: 4,
    action: 'Documents verified',
    claimId: 'CLM-1001',
    user: 'Admin',
    time: 'Yesterday, 02:15 PM',
  },
  {
    id: 5,
    action: 'Claim rejected',
    claimId: 'CLM-1005',
    user: 'System',
    time: '2 days ago, 11:30 AM',
  },
];

const RecentActivity = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="lg:col-span-1"
    >
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="text-lg">Recent Activity</CardTitle>
          <CardDescription>Latest claim updates and activities</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {recentActivities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start space-x-3 pb-3 border-b border-gray-100 last:border-0 last:pb-0"
            >
              <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                {activity.action.includes('submitted') && (
                  <PlusCircle className="h-4 w-4 text-blue-500" />
                )}
                {activity.action.includes('responded') && (
                  <MailCheck className="h-4 w-4 text-orange-500" />
                )}
                {activity.action.includes('processed') && (
                  <Banknote className="h-4 w-4 text-green-500" />
                )}
                {activity.action.includes('verified') && (
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                )}
                {activity.action.includes('rejected') && (
                  <XCircle className="h-4 w-4 text-red-500" />
                )}
              </div>
              <div>
                <p className="text-sm font-medium">{activity.action}</p>
                <p className="text-xs text-gray-500">
                  {activity.claimId} • {activity.user}
                </p>
                <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </CardContent>
        <CardFooter className="border-t pt-4">
          <Button variant="ghost" className="w-full text-sm" size="sm">
            View All Activity
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default RecentActivity;
