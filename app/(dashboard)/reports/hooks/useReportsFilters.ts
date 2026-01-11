"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api/client";

export type DateRange =
  | "today"
  | "yesterday"
  | "last7"
  | "last30"
  | "thisMonth"
  | "custom";

export type ReportsFilters = {
  range: DateRange;
  outletId: string | null;
  from?: Date;
  to?: Date;
};

type Outlet = {
  id: string;
  name: string;
};

export function useReportsFilters() {
  const [filters, setFiltersState] = useState<ReportsFilters>({
    range: "today",
    outletId: null,
  });

  const [outlets, setOutlets] = useState<Outlet[]>([]);
  const [loadingOutlets, setLoadingOutlets] = useState(true);

  useEffect(() => {
    async function fetchOutlets() {
      try {
        const data = await apiFetch<Outlet[]>("/outlets");
        setOutlets(data);
      } finally {
        setLoadingOutlets(false);
      }
    }

    fetchOutlets();
  }, []);

  const setFilters = (next: Partial<ReportsFilters>) => {
    setFiltersState((prev) => ({ ...prev, ...next }));
  };

  return {
    filters,
    setFilters,
    outlets,
    loadingOutlets,
  };
}
