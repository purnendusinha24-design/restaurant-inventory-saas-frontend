"use client";

import { useEffect, useState, useCallback } from "react";
import { apiFetch } from "@/lib/api/client";
import { useOutlet } from "@/lib/outlet-context";
import type { Purchase } from "@/lib/api/purchase";

export function usePurchase(purchaseId: string) {
  const { activeOutlet } = useOutlet();

  const [purchase, setPurchase] = useState<Purchase | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPurchase = useCallback(async () => {
    if (!activeOutlet) return;

    try {
      setLoading(true);
      setError(null);

      const res = await apiFetch<{ data: Purchase }>(
        `/purchases/${purchaseId}`,
        {
          headers: {
            "x-outlet-id": activeOutlet.id,
          },
        }
      );

      setPurchase(res.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load purchase");
    } finally {
      setLoading(false);
    }
  }, [purchaseId, activeOutlet]);

  useEffect(() => {
    fetchPurchase();
  }, [fetchPurchase]);

  return {
    purchase,
    loading,
    error,
    refetch: fetchPurchase, // ✅ THIS FIXES YOUR ERROR
  };
}
