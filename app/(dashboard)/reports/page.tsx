"use client";

import { useState } from "react";

import { useReportsFilters } from "./hooks/useReportsFilters";
import { useSalesReport } from "./hooks/useSalesReport";
import { useSalesChart } from "./hooks/useSalesChart";
import { useInventoryReport } from "./hooks/useInventoryReport";
import { useTopSellingItems } from "./hooks/useTopSellingItems";

import RevenueChart from "./sales/RevenueChart";
import TopSellingItems from "./sales/TopSellingItems";
import ConsumptionChart from "./inventory/ConsumptionChart";
import WastageTable from "./inventory/WastageTable";

/* ======================================================
   Page
====================================================== */

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState<
    "sales" | "inventory" | "purchases"
  >("sales");

  const { filters, setFilters, outlets } = useReportsFilters();

  const salesSummary = useSalesReport(filters);
  const salesChart = useSalesChart(filters);
  const topSelling = useTopSellingItems(filters);
  const inventory = useInventoryReport(filters);

  return (
    <div className="space-y-6">
      {/* ================= Header ================= */}
      <header>
        <h1 className="text-2xl font-semibold">Reports</h1>
        <p className="text-sm text-slate-400">
          Analyze your restaurant performance
        </p>
      </header>

      {/* ================= Filters ================= */}
      <div className="flex gap-4 rounded-lg border border-slate-800 bg-slate-950 p-4">
        <select
          value={filters.range}
          onChange={(e) => setFilters({ range: e.target.value as any })}
          className="rounded border border-slate-800 bg-slate-900 px-3 py-2 text-sm"
        >
          <option value="today">Today</option>
          <option value="last7">Last 7 days</option>
          <option value="last30">Last 30 days</option>
          <option value="thisMonth">This month</option>
        </select>

        <select
          value={filters.outletId ?? "all"}
          onChange={(e) =>
            setFilters({
              outletId: e.target.value === "all" ? null : e.target.value,
            })
          }
          className="rounded border border-slate-800 bg-slate-900 px-3 py-2 text-sm"
        >
          <option value="all">All outlets</option>
          {outlets.map((o) => (
            <option key={o.id} value={o.id}>
              {o.name}
            </option>
          ))}
        </select>
      </div>

      {/* ================= Summary ================= */}
      <div className="grid grid-cols-4 gap-4">
        <Summary
          label="Revenue"
          value={`₹${salesSummary.data?.revenue ?? 0}`}
        />
        <Summary label="Orders" value={`${salesSummary.data?.orders ?? 0}`} />
        <Summary
          label="Avg Order Value"
          value={`₹${salesSummary.data?.avgOrderValue ?? 0}`}
        />
        <Summary label="Wastage" value="₹0" />
      </div>

      {/* ================= Tabs ================= */}
      <div className="rounded-lg border border-slate-800 bg-slate-950">
        <div className="flex border-b border-slate-800">
          <Tab
            active={activeTab === "sales"}
            onClick={() => setActiveTab("sales")}
          >
            Sales
          </Tab>
          <Tab
            active={activeTab === "inventory"}
            onClick={() => setActiveTab("inventory")}
          >
            Inventory
          </Tab>
          <Tab disabled>Purchases</Tab>
        </div>

        <div className="p-4 space-y-6">
          {/* ================= Sales ================= */}
          {activeTab === "sales" && (
            <div className="space-y-6">
              {/* Revenue chart */}
              <RevenueChart
                data={salesChart.data}
                loading={salesChart.loading}
              />

              {/* Top selling items */}
              <div className="rounded-lg border border-slate-800 bg-slate-950 p-4">
                <h3 className="mb-4 text-sm font-medium text-slate-300">
                  Top Selling Items
                </h3>

                {topSelling.loading ? (
                  <EmptyState text="Loading top selling items…" />
                ) : topSelling.items.length === 0 ? (
                  <EmptyState text="No sales recorded for this period" />
                ) : (
                  <TopSellingItems
                    items={topSelling.items}
                    loading={topSelling.loading}
                  />
                )}
              </div>
            </div>
          )}

          {/* ================= Inventory ================= */}
          {activeTab === "inventory" && (
            <div className="space-y-6">
              {/* Consumption */}
              {inventory.loading ? (
                <EmptyState text="Loading inventory consumption…" />
              ) : inventory.consumption.length === 0 ? (
                <EmptyState text="No inventory consumption for this period" />
              ) : (
                <ConsumptionChart data={inventory.consumption} />
              )}

              {/* Wastage */}
              {inventory.loading ? (
                <EmptyState text="Loading wastage…" />
              ) : inventory.wastage.length === 0 ? (
                <EmptyState text="No wastage recorded for this period" />
              ) : (
                <WastageTable items={inventory.wastage} />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ======================================================
   UI helpers
====================================================== */

function Summary({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-slate-900 p-4">
      <div className="text-sm text-slate-400">{label}</div>
      <div className="text-xl font-semibold">{value}</div>
    </div>
  );
}

function Tab({
  active,
  disabled,
  children,
  onClick,
}: {
  active?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`px-4 py-2 text-sm transition ${
        active
          ? "border-b-2 border-blue-500 text-white"
          : "text-slate-400 hover:text-white"
      } ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
    >
      {children}
    </button>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="flex h-40 items-center justify-center text-slate-500">
      {text}
    </div>
  );
}
