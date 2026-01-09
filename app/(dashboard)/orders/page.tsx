"use client";

import { useEffect, useState } from "react";
import { useOutlet } from "@/lib/outlet-context";
import { fetchOrders, OrderListItem } from "@/lib/api/orders";
import OrdersTable from "@/components/orders/OrdersTable";
import CreateOrderModal from "@/components/orders/CreateOrderModal";

export default function OrdersPage() {
  const { activeOutlet, loading: outletLoading } = useOutlet();

  const [orders, setOrders] = useState<OrderListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [createOpen, setCreateOpen] = useState(false);

  async function loadOrders() {
    if (!activeOutlet) return;

    setLoading(true);
    try {
      const res = await fetchOrders({ outletId: activeOutlet.id });
      setOrders(res.data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!outletLoading && activeOutlet) {
      loadOrders();
    }
  }, [activeOutlet?.id, outletLoading]);

  // Guards
  if (outletLoading) {
    return <p className="text-slate-400">Loading outlet…</p>;
  }

  if (!activeOutlet) {
    return (
      <div className="rounded border border-slate-800 p-6 text-slate-400">
        Please select an outlet to view orders.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-white">
          Orders — {activeOutlet.name}
        </h1>

        <button
          onClick={() => setCreateOpen(true)}
          className="rounded bg-indigo-600 px-4 py-2 text-sm text-white"
        >
          + New Order
        </button>
      </div>

      {/* Orders Table */}
      {loading ? (
        <p className="text-slate-400">Loading orders…</p>
      ) : (
        <OrdersTable orders={orders} onChange={loadOrders} />
      )}

      {/* Create Order */}
      {createOpen && (
        <CreateOrderModal
          outletId={activeOutlet.id}
          onClose={() => setCreateOpen(false)}
          onSuccess={loadOrders}
        />
      )}
    </div>
  );
}
