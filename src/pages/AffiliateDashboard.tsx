
import React from "react";
import { Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import AffiliateLayout from "@/components/affiliate-dashboard/AffiliateLayout";
import DashboardOverview from "@/components/affiliate-dashboard/DashboardOverview";
import ReferralSection from "@/components/affiliate-dashboard/ReferralSection";
import StatisticsSection from "@/components/affiliate-dashboard/StatisticsSection";
import PayoutsSection from "@/components/affiliate-dashboard/PayoutsSection";
import PromoMaterialsSection from "@/components/affiliate-dashboard/PromoMaterialsSection";
import SupportFaqSection from "@/components/affiliate-dashboard/SupportFaqSection";
import SettingsSection from "@/components/affiliate-dashboard/SettingsSection";
import LoadingState from "@/components/affiliate-dashboard/LoadingState";

// Define the types for our affiliate data
export type AffiliateData = {
  totalEarnings: number;
  clicks: number;
  approvedClaims: number;
  pendingPayouts: number;
  completedPayouts: number;
  referralLink: string;
  performanceData: Array<{
    date: string;
    clicks: number;
    registrations: number;
    claims: number;
  }>;
  payouts: Array<{
    id: number;
    amount: number;
    date: string;
    status: string;
  }>;
  user: {
    name: string;
    email: string;
    paymentMethod: string;
    paymentDetails: string;
  };
};

const AffiliateDashboard = () => {
  const { isAuthenticated, isLoading: authLoading, user } = useAuth();

  // Check authentication
  if (!authLoading && !isAuthenticated) {
    return <Navigate to="/affiliate/login" />;
  }

  // Fetch affiliate data - would connect to API in production
  const { data: affiliateData, isLoading } = useQuery({
    queryKey: ["affiliateData", user?.id],
    queryFn: () => {
      // Simulate API call
      return new Promise<AffiliateData>((resolve) => {
        setTimeout(() => {
          resolve({
            totalEarnings: 1250,
            clicks: 345,
            approvedClaims: 28,
            pendingPayouts: 2,
            completedPayouts: 5,
            referralLink: `https://cleverclaim.com/ref/${user?.id || "user123"}`,
            performanceData: [
              { date: "2025-03-30", clicks: 12, registrations: 3, claims: 1 },
              { date: "2025-03-31", clicks: 15, registrations: 4, claims: 1 },
              { date: "2025-04-01", clicks: 18, registrations: 5, claims: 2 },
              { date: "2025-04-02", clicks: 21, registrations: 6, claims: 2 },
              { date: "2025-04-03", clicks: 24, registrations: 7, claims: 3 },
              { date: "2025-04-04", clicks: 27, registrations: 8, claims: 3 },
              { date: "2025-04-05", clicks: 30, registrations: 9, claims: 4 },
              { date: "2025-04-06", clicks: 33, registrations: 10, claims: 4 },
              { date: "2025-04-07", clicks: 36, registrations: 11, claims: 5 },
              { date: "2025-04-08", clicks: 39, registrations: 12, claims: 5 },
              { date: "2025-04-09", clicks: 42, registrations: 13, claims: 6 },
              { date: "2025-04-10", clicks: 45, registrations: 14, claims: 6 },
              { date: "2025-04-11", clicks: 48, registrations: 15, claims: 7 },
              { date: "2025-04-12", clicks: 51, registrations: 16, claims: 7 },
              { date: "2025-04-13", clicks: 54, registrations: 17, claims: 8 },
              { date: "2025-04-14", clicks: 57, registrations: 18, claims: 8 },
              { date: "2025-04-15", clicks: 60, registrations: 19, claims: 9 },
              { date: "2025-04-16", clicks: 63, registrations: 20, claims: 9 },
              { date: "2025-04-17", clicks: 66, registrations: 21, claims: 10 },
              { date: "2025-04-18", clicks: 69, registrations: 22, claims: 10 },
              { date: "2025-04-19", clicks: 72, registrations: 23, claims: 11 },
              { date: "2025-04-20", clicks: 75, registrations: 24, claims: 11 },
              { date: "2025-04-21", clicks: 78, registrations: 25, claims: 12 },
              { date: "2025-04-22", clicks: 81, registrations: 26, claims: 12 },
              { date: "2025-04-23", clicks: 84, registrations: 27, claims: 13 },
              { date: "2025-04-24", clicks: 87, registrations: 28, claims: 13 },
              { date: "2025-04-25", clicks: 90, registrations: 29, claims: 14 },
              { date: "2025-04-26", clicks: 93, registrations: 30, claims: 14 },
              { date: "2025-04-27", clicks: 96, registrations: 31, claims: 15 },
              { date: "2025-04-28", clicks: 99, registrations: 32, claims: 15 },
              { date: "2025-04-29", clicks: 102, registrations: 33, claims: 16 },
            ],
            payouts: [
              { id: 1, amount: 250, date: "2025-03-15", status: "Paid" },
              { id: 2, amount: 320, date: "2025-03-30", status: "Paid" },
              { id: 3, amount: 175, date: "2025-04-15", status: "Processing" },
              { id: 4, amount: 505, date: "2025-04-30", status: "Pending" },
            ],
            user: {
              name: user?.name || "John Smith",
              email: user?.email || "john.smith@example.com",
              paymentMethod: "PayPal",
              paymentDetails: user?.email || "john.smith@example.com"
            }
          });
        }, 800);
      });
    },
    enabled: isAuthenticated
  });

  if (authLoading || isLoading || !affiliateData) {
    return <LoadingState />;
  }

  return (
    <AffiliateLayout data={affiliateData}>
      <DashboardOverview data={affiliateData} />
      <ReferralSection referralLink={affiliateData.referralLink} />
      <StatisticsSection data={affiliateData.performanceData} />
      <PayoutsSection payoutsData={affiliateData.payouts} userData={affiliateData.user} />
      <PromoMaterialsSection />
      <SupportFaqSection />
      <SettingsSection userData={affiliateData.user} />
    </AffiliateLayout>
  );
};

export default AffiliateDashboard;
