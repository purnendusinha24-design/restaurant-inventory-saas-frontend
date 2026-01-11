"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { getDashboardStats, DashboardStats } from "@/lib/api/dashboard";
import { useAuth } from "@/lib/use-auth";
import { hasRole } from "@/lib/auth/roles";

import PageHeader from "@/components/ui/PageHeader";
import SmartKpiCard from "@/components/ui/SmartKpiCard";
import AttentionNeededSection from "@/components/dashboard/AttentionNeededSection";
import InventoryHealthSection from "@/components/dashboard/InventoryHealthSection";
import OrdersSnapshotSection from "@/components/dashboard/OrdersSnapshotSection";

import SkeletonKpiCard from "@/components/ui/SkeletonKpiCard";
import SkeletonAttentionSection from "@/components/dashboard/SkeletonAttentionSection";
import SkeletonPanel from "@/components/dashboard/SkeletonPanel";

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const router = useRouter();

  const { user, isAuthenticated, isLoading } = useAuth();
  const role = user?.role;

  useEffect(() => {
    // ⏳ wait for auth restoration
    if (isLoading) return;

    // 🔐 redirect unauthenticated users
    if (!isAuthenticated) {
      router.replace("/login");
      return;
    }

    // 📊 fetch dashboard stats
    getDashboardStats()
      .then(setStats)
      .catch(() => {
        router.replace("/login");
      });
  }, [isAuthenticated, isLoading, router]);

  // ⛔ prevent flicker / invalid render
  if (isLoading || !stats || !role) {
    return (
      <>
        <PageHeader
          title="Dashboard"
          description="Overview of your restaurant operations"
        />

        {/* KPI Skeletons */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <SkeletonKpiCard key={i} />
          ))}
        </div>

        {/* Attention Skeleton */}
        <SkeletonAttentionSection />

        {/* Panels Skeleton */}
        <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <SkeletonPanel />
          <SkeletonPanel />
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Overview of your restaurant operations"
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {hasRole(role, ["OWNER", "MANAGER"]) && (
          <SmartKpiCard
            title="Total Ingredients"
            value={stats.totalIngredients}
            contextText="Tracked ingredients"
            status="healthy"
            ctaLabel="View Inventory"
            onClick={() => router.push("/inventory")}
          />
        )}

        {hasRole(role, ["OWNER", "MANAGER", "STAFF"]) && (
          <SmartKpiCard
            title="Low Stock Items"
            value={stats.lowStockItems}
            contextText={
              stats.lowStockItems > 0
                ? "Needs attention"
                : "All ingredients healthy 🎉"
            }
            status={stats.lowStockItems > 0 ? "critical" : "healthy"}
            ctaLabel="Check Stock"
            onClick={() => router.push("/inventory?filter=low")}
          />
        )}

        {hasRole(role, ["OWNER", "MANAGER", "STAFF"]) && (
          <SmartKpiCard
            title="Orders Today"
            value={stats.ordersToday}
            contextText="Orders placed today"
            status="healthy"
            ctaLabel="View Orders"
            onClick={() => router.push("/orders")}
          />
        )}

        {hasRole(role, ["OWNER"]) && (
          <SmartKpiCard
            title="Active Vendors"
            value={stats.activeVendors}
            contextText="Approved & active"
            status="healthy"
            ctaLabel="View Vendors"
            onClick={() => router.push("/vendors")}
          />
        )}
      </div>

      {/* ATTENTION NEEDED */}
      {hasRole(role, ["OWNER", "MANAGER", "STAFF"]) && (
        <AttentionNeededSection
          lowStockItems={stats.lowStockItems}
          pendingPurchases={
            hasRole(role, ["OWNER", "MANAGER"])
              ? stats.pendingPurchases ?? 0
              : 0
          }
        />
      )}

      {/* INVENTORY + ORDERS SNAPSHOT */}
      {hasRole(role, ["OWNER", "MANAGER"]) && (
        <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <InventoryHealthSection
            lowStockItems={stats.lowStockItems}
            totalIngredients={stats.totalIngredients}
          />

          <OrdersSnapshotSection ordersToday={stats.ordersToday} />
        </div>
      )}
    </>
  );
}
