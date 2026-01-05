import { apiFetch } from "./client";

export type DashboardStats = {
  totalIngredients: number;
  lowStockItems: number;
  ordersToday: number;
  activeVendors: number;
};

export async function getDashboardStats(): Promise<DashboardStats> {
  return apiFetch("/dashboard/stats");
}
