"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api/client";
import type { ReportsFilters } from "./useReportsFilters";

type ConsumptionItem = {
  name: string;
  unit: string;
  quantity: number;
};

type WastageItem = {
  name: string;
  unit: string;
  quantity: number;
  reason: string;
};

export function useInventoryReport(filters: ReportsFilters) {
  const [consumption, setConsumption] = useState<ConsumptionItem[]>([]);
  const [wastage, setWastage] = useState<WastageItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!filters.range) return;

    async function load() {
      setLoading(true);

      const { from, to } = resolveDateRange(filters.range);

      const body = JSON.stringify({
        from,
        to,
        outletId: filters.outletId,
      });

      try {
        const [consumptionRes, wastageRes] = await Promise.all([
          apiFetch<{ items: ConsumptionItem[] }>(
            "/reports/inventory/consumption",
            { method: "POST", body }
          ),
          apiFetch<{ items: WastageItem[] }>("/reports/inventory/wastage", {
            method: "POST",
            body,
          }),
        ]);

        setConsumption(consumptionRes.items);
        setWastage(wastageRes.items);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [filters.range, filters.outletId]);

  return { consumption, wastage, loading };
}

/* ================= Helpers ================= */

function resolveDateRange(range: ReportsFilters["range"]) {
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

  return {
    from: start.toISOString(),
    to: now.toISOString(),
  };
}
