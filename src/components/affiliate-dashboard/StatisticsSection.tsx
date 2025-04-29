
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid,
  Legend,
} from "recharts";

// Types
type PerformanceData = {
  date: string;
  clicks: number;
  registrations: number;
  claims: number;
};

type StatisticsSectionProps = {
  data: PerformanceData[];
};

// Define time periods for filtering
type TimePeriod = "today" | "week" | "month" | "custom";

const StatisticsSection: React.FC<StatisticsSectionProps> = ({ data }) => {
  const [timeRange, setTimeRange] = useState<TimePeriod>("week");
  const [selectedMetric, setSelectedMetric] = useState<"clicks" | "registrations" | "claims">("clicks");
  
  // Get the current date
  const currentDate = new Date();
  
  // Filter data based on selected time range
  const filteredData = React.useMemo(() => {
    switch (timeRange) {
      case "today":
        const today = currentDate.toISOString().split('T')[0];
        return data.filter(item => item.date === today);
      
      case "week":
        // Get data for the last 7 days
        const lastWeek = new Date();
        lastWeek.setDate(lastWeek.getDate() - 7);
        return data.filter(item => new Date(item.date) >= lastWeek);
      
      case "month":
        // Get data for the last 30 days
        return data.slice(-30);
      
      default:
        return data.slice(-30); // Default to month view
    }
  }, [data, timeRange]);
  
  // Calculate totals
  const totals = React.useMemo(() => {
    const result = {
      clicks: filteredData.reduce((sum, item) => sum + item.clicks, 0),
      registrations: filteredData.reduce((sum, item) => sum + item.registrations, 0),
      claims: filteredData.reduce((sum, item) => sum + item.claims, 0),
    };
    return result;
  }, [filteredData]);
  
  // Format date for display
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${date.getDate()}/${date.getMonth() + 1}`;
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Statistics</h1>
        <p className="text-muted-foreground">
          Track your performance with detailed analytics.
        </p>
      </div>
      
      {/* Time Range Selector */}
      <div className="flex justify-between items-center">
        <Tabs value={timeRange} onValueChange={(value) => setTimeRange(value as TimePeriod)} className="w-auto">
          <TabsList>
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="week">Last 7 days</TabsTrigger>
            <TabsTrigger value="month">Last 30 days</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <Tabs value={selectedMetric} onValueChange={(value) => setSelectedMetric(value as "clicks" | "registrations" | "claims")} className="w-auto">
          <TabsList>
            <TabsTrigger value="clicks">Clicks</TabsTrigger>
            <TabsTrigger value="registrations">Registrations</TabsTrigger>
            <TabsTrigger value="claims">Claims</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      {/* Stats Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totals.clicks}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Registrations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totals.registrations}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Approved Claims</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totals.claims}</div>
          </CardContent>
        </Card>
      </div>
      
      {/* Statistics Chart */}
      <Card>
        <CardHeader>
          <CardTitle>{selectedMetric.charAt(0).toUpperCase() + selectedMetric.slice(1)} Over Time</CardTitle>
          <CardDescription>
            {timeRange === "today" ? "Today's data" : 
             timeRange === "week" ? "Last 7 days" : "Last 30 days"}
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tickFormatter={formatDate} interval={timeRange === "week" ? 0 : 4} />
              <YAxis />
              <Tooltip 
                formatter={(value) => [`${value}`, selectedMetric.charAt(0).toUpperCase() + selectedMetric.slice(1)]}
                labelFormatter={(label) => new Date(label).toLocaleDateString()}
              />
              <Legend />
              <Bar 
                dataKey={selectedMetric} 
                fill={
                  selectedMetric === "clicks" ? "#8884d8" : 
                  selectedMetric === "registrations" ? "#82ca9d" : "#ffc658"
                } 
                name={selectedMetric.charAt(0).toUpperCase() + selectedMetric.slice(1)} 
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      {/* Conversion Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Conversion Rates</CardTitle>
          <CardDescription>
            Performance statistics for your referral link
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Click to Registration */}
            <div>
              <h3 className="text-sm font-medium mb-2">Click to Registration Rate</h3>
              <div className="flex items-end gap-2">
                <span className="text-2xl font-bold">
                  {totals.clicks > 0 
                    ? `${((totals.registrations / totals.clicks) * 100).toFixed(1)}%` 
                    : "0%"}
                </span>
                <span className="text-sm text-muted-foreground mb-1">
                  ({totals.registrations} of {totals.clicks})
                </span>
              </div>
              <div className="h-2 bg-muted rounded-full mt-2">
                <div 
                  className="h-2 bg-primary rounded-full" 
                  style={{ 
                    width: `${totals.clicks > 0 ? (totals.registrations / totals.clicks) * 100 : 0}%` 
                  }}
                />
              </div>
            </div>
            
            {/* Registration to Claim */}
            <div>
              <h3 className="text-sm font-medium mb-2">Registration to Claim Rate</h3>
              <div className="flex items-end gap-2">
                <span className="text-2xl font-bold">
                  {totals.registrations > 0 
                    ? `${((totals.claims / totals.registrations) * 100).toFixed(1)}%` 
                    : "0%"}
                </span>
                <span className="text-sm text-muted-foreground mb-1">
                  ({totals.claims} of {totals.registrations})
                </span>
              </div>
              <div className="h-2 bg-muted rounded-full mt-2">
                <div 
                  className="h-2 bg-primary rounded-full" 
                  style={{ 
                    width: `${totals.registrations > 0 ? (totals.claims / totals.registrations) * 100 : 0}%` 
                  }}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatisticsSection;
