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
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface PerformanceOverviewProps {
  successRevenue: number;
  successRate: number;
  chartData: { name: string; success: number }[];
}

const PerformanceOverview = ({
  successRevenue,
  successRate,
  chartData,
}: PerformanceOverviewProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="lg:col-span-2"
    >
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="text-lg">Performance Overview</CardTitle>
          <CardDescription>Successful claims</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] text-blue-500">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="success" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
        <CardFooter className="border-t pt-4 flex justify-between">
          <div className="w-full text-center flex justify-center gap-12">
            {/*<div>*/}
            {/*  <p className="text-xs text-gray-500">Avg. Processing Time</p>*/}
            {/*  <p className="font-semibold">18 days</p>*/}
            {/*</div>*/}
            <div className="min-w-[30%]">
              <p className="text-xs text-gray-500">Success Rate</p>
              <p className="font-semibold">{successRate}%</p>
            </div>
            <div className="min-w-[30%]">
              <p className="text-xs text-gray-500">Revenue</p>
              <p className="font-semibold">€{successRevenue}</p>
            </div>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default PerformanceOverview;
