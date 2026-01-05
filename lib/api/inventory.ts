import { apiFetch } from "./client";

export type InventoryItem = {
  id: string;
  name: string;
  category: string;
  stock: number;
  unit: string;
  minStock: number;
  updatedAt: string;
};

export async function getInventory(): Promise<InventoryItem[]> {
  return apiFetch("/inventory");
}
