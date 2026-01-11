"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api/client";
import type { ReportsFilters } from "./useReportsFilters";

type SalesSummary = {
  revenue: number;
  orders: number;
  avgOrderValue: number;
};

export function useSalesReport(filters: ReportsFilters) {
  const [data, setData] = useState<SalesSummary | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function fetchReport() {
      setLoading(true);

      const res = await apiFetch<SalesSummary>(`/reports/sales/summary`, {
        method: "POST",
        body: JSON.stringify(filters),
      });

      if (!cancelled) {
        setData(res);
        setLoading(false);
      }
    }

    fetchReport();

    return () => {
      cancelled = true;
    };
  }, [filters]);

  return { data, loading };
}
