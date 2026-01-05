import { apiFetch } from "./client";

export type Order = {
  id: string;
  createdAt: string;
  itemsCount: number;
  totalAmount: number;
  status: "PENDING" | "COMPLETED" | "CANCELLED";
};

export async function getOrders(): Promise<Order[]> {
  return apiFetch("/orders");
}
