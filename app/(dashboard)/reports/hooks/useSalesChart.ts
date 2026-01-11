"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api/client";
import type { ReportsFilters } from "./useReportsFilters";

type SalesChartPoint = {
  date: string;
  revenue: number;
};

export function useSalesChart(filters: ReportsFilters) {
  const [data, setData] = useState<SalesChartPoint[]>([]);
  const [loading, setLoading] = useState(false);

  const { range, outletId } = filters;

  useEffect(() => {
    if (!range) return;

    async function fetchChart() {
      setLoading(true);

      try {
        const now = new Date();

        const res = await apiFetch<{ points: SalesChartPoint[] }>(
          "/reports/sales/chart",
          {
            method: "POST",
            body: JSON.stringify({
              from: resolveFromDate(range),
              to: now.toISOString(),
              outletId,
            }),
          }
        );

        setData(res.points);
      } finally {
        setLoading(false);
      }
    }

    fetchChart();
  }, [range, outletId]);

  return { data, loading };
}

/* ================= Helpers ================= */

function resolveFromDate(range: ReportsFilters["range"]) {
  const now = new Date();
  const start = new Date();

  switch (range) {
    case "today":
      start.setHours(0, 0, 0, 0);
      break;

    case "last7":
      start.setDate(now.getDate() - 6);
      start.setHours(0, 0, 0, 0);
      break;

    case "last30":
      start.setDate(now.getDate() - 29);
      start.setHours(0, 0, 0, 0);
      break;

    case "thisMonth":
      start.setDate(1);
      start.setHours(0, 0, 0, 0);
      break;
  }

  return start.toISOString();
}
