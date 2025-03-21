
import React from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";

const RecentCommunications = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="lg:col-span-1"
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Communications</CardTitle>
          <CardDescription>Latest emails sent to customers and airlines</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-medium">Claim Update Notification</h3>
                <p className="text-xs text-gray-500">Sent to customer@example.com</p>
              </div>
              <Badge>2 hours ago</Badge>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Notification about claim CLM-1002 status change to "In Progress"
            </p>
          </div>
          <div className="rounded-lg border p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-medium">Airline Response</h3>
                <p className="text-xs text-gray-500">To airline@example.com</p>
              </div>
              <Badge>Yesterday</Badge>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Follow-up request for compensation for claim CLM-1003
            </p>
          </div>
          <div className="rounded-lg border p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-medium">Document Request</h3>
                <p className="text-xs text-gray-500">Sent to customer@example.com</p>
              </div>
              <Badge>3 days ago</Badge>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Request for boarding pass and ID for claim CLM-1008
            </p>
          </div>
        </CardContent>
        <CardFooter className="border-t pt-4">
          <Button variant="ghost" className="w-full text-sm">
            View Communication History
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default RecentCommunications;
