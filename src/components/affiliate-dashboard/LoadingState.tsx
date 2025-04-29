
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const LoadingState = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid gap-8">
          {/* Header Skeleton */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <Skeleton className="h-8 w-60 mb-6" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Array(4).fill(null).map((_, i) => (
                <div key={i} className="flex flex-col space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-8 w-32" />
                </div>
              ))}
            </div>
          </div>
          
          {/* Chart Skeleton */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <Skeleton className="h-6 w-40 mb-6" />
            <Skeleton className="h-[300px] w-full rounded-md" />
          </div>
          
          {/* Table Skeleton */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <Skeleton className="h-6 w-40 mb-6" />
            <div className="space-y-4">
              {Array(5).fill(null).map((_, i) => (
                <div key={i} className="flex justify-between">
                  <Skeleton className="h-6 w-1/3" />
                  <Skeleton className="h-6 w-1/5" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingState;
