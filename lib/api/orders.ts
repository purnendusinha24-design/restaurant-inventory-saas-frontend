import { apiFetch } from "./client";

export type KitchenOrderStatus = "PENDING" | "PREPARING" | "READY";

export type OrderStatus =
  | "PENDING"
  | "PREPARING"
  | "READY"
  | "COMPLETED"
  | "CANCELLED";

export type OrderListItem = {
  id: string;
  orderNumber: string;
  total: string;
  status: OrderStatus;
  createdAt: string;
  completedAt?: string | null;
};

export type KitchenOrder = {
  id: string;
  orderNumber: string;
  status: KitchenOrderStatus;
  createdAt: string;
  items: {
    id: string;
    name: string;
    quantity: number;
  }[];
};

// =====================
// ORDERS (DASHBOARD)
// =====================

export async function fetchOrders(params: {
  outletId: string;
  page?: number;
  limit?: number;
  status?: OrderStatus;
}) {
  const query = new URLSearchParams({
    outletId: params.outletId,
    page: String(params.page ?? 1),
    limit: String(params.limit ?? 20),
    ...(params.status && { status: params.status }),
  });

  return apiFetch<{
    data: OrderListItem[];
    meta: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  }>(`/orders?${query.toString()}`);
}

export async function cancelOrder(orderId: string) {
  return apiFetch(`/orders/${orderId}/cancel`, {
    method: "POST",
  });
}

export async function createOrder(payload: {
  outletId: string;
  items: {
    menuId: string;
    quantity: number;
  }[];
}) {
  return apiFetch(`/orders`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

// =====================
// KITCHEN (KOT)
// =====================

export async function fetchKitchenOrders(outletId: string) {
  return apiFetch<KitchenOrder[]>(`/orders/kitchen?outletId=${outletId}`);
}

export async function markPreparing(orderId: string) {
  return apiFetch(`/orders/${orderId}/preparing`, { method: "POST" });
}

export async function markReady(orderId: string) {
  return apiFetch(`/orders/${orderId}/ready`, { method: "POST" });
}
