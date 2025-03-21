
import React from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { BarChart4 } from "lucide-react";

const PerformanceOverview = () => {
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
          <CardDescription>Claims status and processing metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center">
            <div className="text-center text-gray-500">
              <BarChart4 className="h-16 w-16 mx-auto opacity-30" />
              <p className="mt-2">Charts and metrics visualization</p>
              <p className="text-sm">(Actual charts would be implemented here)</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t pt-4 flex justify-between">
          <div className="grid grid-cols-3 w-full gap-4 text-center">
            <div>
              <p className="text-xs text-gray-500">Avg. Processing Time</p>
              <p className="font-semibold">18 days</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Success Rate</p>
              <p className="font-semibold">78%</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Revenue</p>
              <p className="font-semibold">€13,312</p>
            </div>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default PerformanceOverview;
