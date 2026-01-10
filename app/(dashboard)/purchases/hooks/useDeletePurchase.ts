"use client";

import { apiFetch } from "@/lib/api/client";
import { useOutlet } from "@/lib/outlet-context";

export function useDeletePurchase() {
  const { activeOutlet } = useOutlet();

  async function deletePurchase(purchaseId: string) {
    if (!activeOutlet) {
      throw new Error("No active outlet selected");
    }

    await apiFetch(`/purchases/${purchaseId}`, {
      method: "DELETE",
      headers: {
        "x-outlet-id": activeOutlet.id, // ✅ REQUIRED
      },
    });
  }

  return { deletePurchase };
}
