import { apiFetch } from "./client";

export interface DashboardStats {
  totalIngredients: number;
  lowStockItems: number;
  ordersToday: number;
  activeVendors: number;
  pendingPurchases?: number; // optional for now
}

export async function getDashboardStats(): Promise<DashboardStats> {
  return apiFetch("/dashboard/stats");
}
