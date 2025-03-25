
import React from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, MailCheck, Banknote, CheckCircle2, XCircle, ChevronRight, Clock } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { claimsService } from "@/services/claimsService";
import { Claim } from "@/lib/supabase";
import { Link } from "react-router-dom";

// Helper function to format timestamps
const formatTimeAgo = (dateString: string) => {
  // If the dateString is in a non-standard format (DD.MM.YY), convert it
  if (dateString.includes('.')) {
    const parts = dateString.split('.');
    if (parts.length === 3) {
      // Assuming format is DD.MM.YY
      const day = parts[0];
      const month = parts[1];
      const year = `20${parts[2]}`; // Assuming 20xx for the year
      dateString = `${year}-${month}-${day}`;
    }
  }

  try {
    const date = new Date(dateString);
    
    // Check if the date is valid
    if (isNaN(date.getTime())) {
      console.warn("Invalid date format:", dateString);
      return dateString; // Return the original string if it's invalid
    }
    
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      // Today
      return `Today, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else if (diffDays === 1) {
      // Yesterday
      return `Yesterday, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else if (diffDays < 7) {
      // Within a week
      return `${diffDays} days ago, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else {
      // More than a week
      return date.toLocaleDateString() + ', ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  } catch (error) {
    console.error("Error formatting date:", error);
    return dateString; // Return the original string if there's an error
  }
};

// Helper function to determine activity type based on claim status
const determineActivity = (claim: Claim): { action: string; icon: React.ReactNode } => {
  const { status, stage } = claim;
  
  if (status === 'pending' && stage === 'initial_review') {
    return { 
      action: "Claim submitted", 
      icon: <PlusCircle className="h-4 w-4 text-blue-500" /> 
    };
  } else if (status === 'in_progress') {
    return { 
      action: "Processing claim", 
      icon: <Clock className="h-4 w-4 text-orange-500" /> 
    };
  } else if (status === 'escalated') {
    return { 
      action: "Airline responded", 
      icon: <MailCheck className="h-4 w-4 text-orange-500" /> 
    };
  } else if (status === 'completed') {
    return { 
      action: "Payment processed", 
      icon: <Banknote className="h-4 w-4 text-green-500" /> 
    };
  } else if (status === 'rejected') {
    return { 
      action: "Claim rejected", 
      icon: <XCircle className="h-4 w-4 text-red-500" /> 
    };
  } else {
    return { 
      action: "Status updated", 
      icon: <CheckCircle2 className="h-4 w-4 text-green-500" /> 
    };
  }
};

const RecentActivity = () => {
  // Fetch claims data using react-query
  const { data: claimsData = [], isLoading, error } = useQuery({
    queryKey: ['recentActivity'],
    queryFn: claimsService.getClaims,
    select: (data) => data.slice(0, 5), // Get only the 5 most recent claims
    staleTime: 60000, // Consider data stale after 1 minute
  });

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
            <CardDescription>Loading recent claim activities...</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-start space-x-3 pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                <div className="h-8 w-8 rounded-full bg-gray-100 animate-pulse" />
                <div className="w-full">
                  <div className="h-4 bg-gray-100 rounded animate-pulse w-3/4 mb-2" />
                  <div className="h-3 bg-gray-100 rounded animate-pulse w-1/2 mb-2" />
                  <div className="h-3 bg-gray-100 rounded animate-pulse w-1/4" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  if (error) {
    console.error("Error loading recent activity:", error);
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
            <CardDescription className="text-red-500">Error loading activities</CardDescription>
          </CardHeader>
          <CardContent>
            <p>There was a problem loading recent claim activities. Please try again later.</p>
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
          {claimsData.length > 0 ? (
            claimsData.map((claim) => {
              const { action, icon } = determineActivity(claim);
              const timeAgo = formatTimeAgo(claim.created_at || claim.lastupdated);
              
              return (
                <div key={claim.id} className="flex items-start space-x-3 pb-3 border-b border-gray-100 last:border-0 last:pb-0">
                  <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                    {icon}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{action}</p>
                    <p className="text-xs text-gray-500">
                      {claim.id} • {claim.customer}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">{timeAgo}</p>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-4 text-center text-gray-500">
              <p>No recent activity found</p>
              <p className="text-xs mt-1">New claims will appear here</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="border-t pt-4">
          <Link to="/admin?tab=claims" className="w-full">
            <Button variant="ghost" className="w-full text-sm" size="sm">
              View All Activity
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default RecentActivity;
