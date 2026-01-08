import { apiFetch } from "./client";

/**
 * FRONTEND enum (mirrors backend Prisma enum)
 * Keep strings identical to backend
 */
export type StockLogReason = "MANUAL" | "PURCHASE" | "WASTAGE" | "ADJUSTMENT";

export type InventorySnapshotItem = {
  ingredientId: string;
  ingredientName: string;
  unit: string;
  currentStock: number;
  minStock: number;
  isLowStock: boolean;
  isActive: boolean;
  lastUpdatedAt: string;
};

export async function fetchInventorySnapshot(outletId: string) {
  return apiFetch<{ data: InventorySnapshotItem[] }>(
    `/inventory/snapshot/${outletId}`
  );
}

export async function stockIn(
  outletId: string,
  ingredientId: string,
  quantity: number,
  reason: StockLogReason,
  referenceId?: string
) {
  return apiFetch(`/inventory/stock-in/${outletId}`, {
    method: "POST",
    body: JSON.stringify({
      ingredientId,
      quantity,
      reason,
      referenceId,
    }),
  });
}

export async function stockOut(
  outletId: string,
  ingredientId: string,
  quantity: number,
  reason: StockLogReason,
  referenceId?: string
) {
  return apiFetch(`/inventory/stock-out/${outletId}`, {
    method: "POST",
    body: JSON.stringify({
      ingredientId,
      quantity,
      reason,
      referenceId,
    }),
  });
}
