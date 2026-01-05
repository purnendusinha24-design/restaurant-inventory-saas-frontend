"use client";

import { useEffect, useState } from "react";
import { getDashboardStats, DashboardStats } from "@/lib/api/dashboard";
import PageHeader from "@/components/ui/PageHeader";
import StatCard from "@/components/ui/StatCard";

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    getDashboardStats()
      .then(setStats)
      .catch(() => {
        localStorage.removeItem("accessToken");
        window.location.href = "/login";
      });
  }, []);

  if (!stats) return null;

  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Overview of your restaurant operations"
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Ingredients" value={stats.totalIngredients} />
        <StatCard title="Low Stock Items" value={stats.lowStockItems} />
        <StatCard title="Orders Today" value={stats.ordersToday} />
        <StatCard title="Active Vendors" value={stats.activeVendors} />
      </div>
    </>
  );
}
