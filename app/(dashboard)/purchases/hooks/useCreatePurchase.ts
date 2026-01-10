"use client";

import { useState } from "react";
import { apiFetch } from "@/lib/api/client";
import { useOutlet } from "@/lib/outlet-context";

export function useCreatePurchase() {
  const { activeOutlet } = useOutlet();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function createPurchase(input: { vendorId: string }) {
    if (!activeOutlet) {
      setError("No outlet selected");
      return null;
    }

    try {
      setLoading(true);
      setError(null);

      const res = await apiFetch<{ id: string }>("/purchases", {
        method: "POST",
        headers: {
          "x-outlet-id": activeOutlet.id,
        },
        body: JSON.stringify(input),
      });

      return res; // ✅ MUST return { id }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to create purchase"
      );
      return null;
    } finally {
      setLoading(false);
    }
  }

  return { createPurchase, loading, error };
}
