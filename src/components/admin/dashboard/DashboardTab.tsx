import React from 'react';
import DashboardStats from './DashboardStats';
import RecentActivity from './RecentActivity';
import PerformanceOverview from './PerformanceOverview';
import QuickActions from './QuickActions';

const DashboardTab = () => {
  return (
    <div className="space-y-8">
      <DashboardStats />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RecentActivity />
        <PerformanceOverview />
      </div>

      <QuickActions />
    </div>
  );
};

export default DashboardTab;
