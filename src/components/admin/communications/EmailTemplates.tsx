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
import { Badge } from '@/components/ui/badge';
import { PlusCircle } from 'lucide-react';

const EmailTemplates = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="lg:col-span-1"
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Email Templates</CardTitle>
          <CardDescription>
            Pre-configured email templates for common scenarios
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border p-4 cursor-pointer hover:bg-gray-50 transition-colors">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Claim Confirmation</h3>
              <Badge variant="outline">Automated</Badge>
            </div>
            <p className="text-sm text-gray-500">
              Sent when a new claim is submitted
            </p>
          </div>
          <div className="rounded-lg border p-4 cursor-pointer hover:bg-gray-50 transition-colors">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Document Request</h3>
              <Badge variant="outline">Manual</Badge>
            </div>
            <p className="text-sm text-gray-500">
              Request additional documents from customer
            </p>
          </div>
          <div className="rounded-lg border p-4 cursor-pointer hover:bg-gray-50 transition-colors">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Claim Status Update</h3>
              <Badge variant="outline">Automated</Badge>
            </div>
            <p className="text-sm text-gray-500">
              Notify customer about claim status changes
            </p>
          </div>
          <div className="rounded-lg border p-4 cursor-pointer hover:bg-gray-50 transition-colors">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Successful Claim</h3>
              <Badge variant="outline">Automated</Badge>
            </div>
            <p className="text-sm text-gray-500">
              Notification about successful compensation
            </p>
          </div>
          <div className="rounded-lg border p-4 cursor-pointer hover:bg-gray-50 transition-colors">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Airline Communication</h3>
              <Badge variant="outline">Manual</Badge>
            </div>
            <p className="text-sm text-gray-500">
              Template for airline communication
            </p>
          </div>
        </CardContent>
        <CardFooter className="border-t pt-4">
          <Button variant="outline" className="w-full">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Template
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default EmailTemplates;
