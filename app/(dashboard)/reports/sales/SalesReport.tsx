"use client";

import { useEffect, useState } from "react";
import RevenueChart from "./RevenueChart";
import TopItemsTable from "./TopItemsTable";
import { apiFetch } from "@/lib/api/client";

type SalesReportData = {
  revenue: { date: string; revenue: number }[];
  topItems: { name: string; quantity: number }[];
};

export default function SalesReport() {
  const [data, setData] = useState<SalesReportData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    apiFetch<SalesReportData>("/reports/sales")
      .then(setData)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="space-y-4">
      <RevenueChart data={data?.revenue ?? []} loading={isLoading} />
      <TopItemsTable data={data?.topItems ?? []} loading={isLoading} />
    </div>
  );
}
