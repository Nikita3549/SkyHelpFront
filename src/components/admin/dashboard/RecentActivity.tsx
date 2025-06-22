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

const recentActivities = [];

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
        <CardContent className="space-y-4 min-h-80 flex align-middle">
          <div className="w-full min-h-full text-center my-auto text-gray-500">
            Will be added soon...
          </div>
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
