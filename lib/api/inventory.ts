import { apiFetch } from "./client";

/**
 * FRONTEND enum (mirrors backend Prisma enum)
 * Keep strings identical to backend
 */
export type StockLogReason = "PURCHASE" | "WASTE" | "ADJUSTMENT";

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

// =====================================================
// INVENTORY SNAPSHOT
// =====================================================
export async function fetchInventorySnapshot(outletId: string) {
  return apiFetch<{ data: InventorySnapshotItem[] }>(
    `/inventory/snapshot/${outletId}`
  );
}

// =====================================================
// ADJUST STOCK (SINGLE MUTATION)
// quantity > 0 → stock in
// quantity < 0 → stock out
// =====================================================
export async function adjustStock(
  outletId: string,
  payload: {
    ingredientId: string;
    quantity: number;
    reason: StockLogReason;
    referenceId?: string;
  }
) {
  return apiFetch(`/inventory/adjust/${outletId}`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

// =====================================================
// INIT INVENTORY
// =====================================================
export async function initInventory(
  outletId: string,
  payload: {
    ingredientId: string;
    currentStock: number;
    minStock: number;
  }
) {
  return apiFetch(`/inventory/init/${outletId}`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
