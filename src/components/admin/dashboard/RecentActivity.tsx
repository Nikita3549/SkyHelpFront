
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, MailCheck, Banknote, CheckCircle2, XCircle, ChevronRight, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { formatDistanceToNow } from "date-fns";

interface Activity {
  id: number;
  action: string;
  claimId: string;
  user: string;
  time: string;
}

const RecentActivity = () => {
  const [recentActivities, setRecentActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecentClaims = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('claims')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(5);

        if (error) {
          throw error;
        }

        if (data) {
          // Transform the claims data into activity format
          const activities = data.map((claim, index) => {
            let action = "Claim submitted";
            
            // Determine action based on claim status
            if (claim.status === "completed") {
              action = "Payment processed";
            } else if (claim.status === "in_progress") {
              action = "Airline responded";
            } else if (claim.status === "rejected") {
              action = "Claim rejected";
            }

            // Format the time
            const timeString = claim.created_at 
              ? formatDistanceToNow(new Date(claim.created_at), { addSuffix: true })
              : claim.lastupdated;

            return {
              id: index + 1,
              action: action,
              claimId: claim.id,
              user: claim.customer || "System",
              time: timeString
            };
          });

          setRecentActivities(activities);
        }
      } catch (err) {
        console.error("Error fetching recent claims:", err);
        setError("Failed to load recent activities");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecentClaims();
  }, []);

  if (isLoading) {
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
            <CardDescription>Loading latest claim updates...</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center py-10">
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  if (error) {
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
            <CardDescription>Something went wrong</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-red-500">{error}</p>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

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
          {recentActivities.length === 0 ? (
            <div className="text-center py-6 text-gray-500">
              No recent activities found
            </div>
          ) : (
            recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                  {activity.action.includes("submitted") && <PlusCircle className="h-4 w-4 text-blue-500" />}
                  {activity.action.includes("responded") && <MailCheck className="h-4 w-4 text-orange-500" />}
                  {activity.action.includes("processed") && <Banknote className="h-4 w-4 text-green-500" />}
                  {activity.action.includes("verified") && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                  {activity.action.includes("rejected") && <XCircle className="h-4 w-4 text-red-500" />}
                </div>
                <div>
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-xs text-gray-500">
                    {activity.claimId} • {activity.user}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                </div>
              </div>
            ))
          )}
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
