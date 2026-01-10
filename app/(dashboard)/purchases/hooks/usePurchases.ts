"use client";

import { useCallback, useEffect, useState } from "react";
import { apiFetch } from "@/lib/api/client";
import { useOutlet } from "@/lib/outlet-context";

/* =========================
   Types
========================= */

export type PurchaseListItem = {
  id: string;
  status: "DRAFT" | "COMPLETED" | "CANCELLED";
  purchaseDate: string;
  totalCost: string;
  vendor: {
    id: string;
    name: string;
  };
};

/* =========================
   Hook (LIST)
========================= */

export function usePurchases() {
  const { activeOutlet, loading: outletLoading } = useOutlet();

  const [purchases, setPurchases] = useState<PurchaseListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ extracted fetcher
  const fetchPurchases = useCallback(async () => {
    if (!activeOutlet) return;

    try {
      setLoading(true);

      const res = await apiFetch<{ data: PurchaseListItem[] }>("/purchases", {
        headers: {
          "x-outlet-id": activeOutlet.id,
        },
      });

      setPurchases(res.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load purchases");
    } finally {
      setLoading(false);
    }
  }, [activeOutlet]);

  useEffect(() => {
    if (outletLoading) return;

    if (!activeOutlet) {
      setLoading(false);
      return;
    }

    fetchPurchases();
  }, [fetchPurchases, activeOutlet, outletLoading]);

  return {
    purchases,
    loading,
    error,
    refetch: fetchPurchases, // ✅ THIS fixes your delete flow
  };
}
