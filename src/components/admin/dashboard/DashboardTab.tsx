import React, { useEffect, useState } from 'react';
import DashboardStats from './DashboardStats';
import RecentActivity from './RecentActivity';
import PerformanceOverview from './PerformanceOverview';
import QuickActions from './QuickActions';
import api from '@/api/axios.ts';
import { ClaimResponse } from '@/components/admin/dashboard/interfaces/claim.response.ts';

const DashboardTab = () => {
  const [total, setTotal] = useState<number>(0);
  const [active, setActive] = useState<number>(0);
  const [successful, setSuccessful] = useState<number>(0);
  const [compensation, setCompensation] = useState<number>(0);
  const [successRate, setSuccessRate] = useState<number>(0);
  const [revenue, setRevenue] = useState<number>(0);
  const [successByMonth, setSuccessByMonth] = useState<
    { month: string; success: string }[]
  >([]);

  useEffect(() => {
    (async () => {
      const res = await api.get<ClaimResponse>('/claims/admin/stats');

      let successByMonth = res.data.successByMonth;
      if (successByMonth.length < 3) {
        successByMonth = [
          {
            month: 'Apr',
            success: '0',
          },
          {
            month: 'May',
            success: '0',
          },
          ...res.data.successByMonth,
        ];
      }

      setTotal(res.data.total);
      setActive(res.data.active);
      setSuccessful(res.data.successful);
      setCompensation(res.data.completedAmount);
      setRevenue(res.data.completedAmount * 0.25);
      setSuccessByMonth(successByMonth);
      setSuccessRate(
        res.data.active == 0
          ? 0
          : +((res.data.successful / res.data.total) * 100).toFixed(0),
      );
    })();
  }, []);

  return (
    <div className="space-y-8">
      <DashboardStats
        total={total}
        successful={successful}
        active={active}
        compensation={compensation}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RecentActivity />
        <PerformanceOverview
          successRate={successRate}
          successRevenue={revenue}
          chartData={successByMonth.map((s) => ({
            name: s.month,
            success: +s.success,
          }))}
        />
      </div>

      <QuickActions />
    </div>
  );
};

export default DashboardTab;
