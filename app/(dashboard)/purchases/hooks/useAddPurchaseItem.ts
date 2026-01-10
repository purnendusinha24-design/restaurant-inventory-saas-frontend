"use client";

import { useState } from "react";
import { apiFetch } from "@/lib/api/client";
import { useOutlet } from "@/lib/outlet-context";

type AddItemInput = {
  purchaseId: string;
  ingredientId: string;
  quantity: number;
  unitCost: number;
};

export function useAddPurchaseItem() {
  const { activeOutlet } = useOutlet();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function addItem(payload: AddItemInput) {
    if (!activeOutlet) {
      throw new Error("No active outlet selected");
    }

    try {
      setLoading(true);
      setError(null);

      await apiFetch(`/purchases/${payload.purchaseId}/items`, {
        method: "POST",
        headers: {
          "x-outlet-id": activeOutlet.id,
        },
        body: JSON.stringify({
          ingredientId: payload.ingredientId,
          quantity: payload.quantity,
          unitCost: payload.unitCost,
        }),
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to add item";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return { addItem, loading, error };
}
