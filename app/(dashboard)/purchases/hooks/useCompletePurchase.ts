"use client";

import { useState } from "react";
import { apiFetch } from "@/lib/api/client";
import { useOutlet } from "@/lib/outlet-context";

export function useCompletePurchase() {
  const { activeOutlet } = useOutlet();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function completePurchase(purchaseId: string) {
    if (!activeOutlet) {
      throw new Error("No active outlet selected");
    }

    try {
      setLoading(true);
      setError(null);

      await apiFetch(`/purchases/${purchaseId}/complete`, {
        method: "PATCH",
        headers: {
          "x-outlet-id": activeOutlet.id,
        },
      });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to complete purchase";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return { completePurchase, loading, error };
}
