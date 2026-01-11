"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api/client";
import type { ReportsFilters } from "./useReportsFilters";

/* ================= Types ================= */

export type TopSellingItem = {
  menuId: string;
  name: string;
  quantity: number;
};

/* ================= Helpers ================= */

function resolveRange(range: ReportsFilters["range"]) {
  const now = new Date();
  let from: Date;
  const to = new Date();

  switch (range) {
    case "today":
      from = new Date();
      from.setHours(0, 0, 0, 0);
      break;

    case "last7":
      from = new Date();
      from.setDate(now.getDate() - 6);
      from.setHours(0, 0, 0, 0);
      break;

    case "last30":
      from = new Date();
      from.setDate(now.getDate() - 29);
      from.setHours(0, 0, 0, 0);
      break;

    case "thisMonth":
      from = new Date(now.getFullYear(), now.getMonth(), 1);
      break;

    default:
      from = new Date();
      from.setHours(0, 0, 0, 0);
  }

  return { from, to };
}

/* ================= Hook ================= */

export function useTopSellingItems(filters: ReportsFilters) {
  const [items, setItems] = useState<TopSellingItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const { from, to } = resolveRange(filters.range);

    async function load() {
      setLoading(true);
      try {
        const res = await apiFetch<{ items: TopSellingItem[] }>(
          "/reports/sales/top-items",
          {
            method: "POST",
            body: JSON.stringify({
              from: from.toISOString(),
              to: to.toISOString(),
              outletId: filters.outletId,
            }),
          }
        );

        setItems(res.items);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [filters.range, filters.outletId]);

  return { items, loading };
}
