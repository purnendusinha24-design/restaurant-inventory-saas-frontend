"use client";

import { useCallback, useEffect, useState } from "react";
import { useOutlet } from "@/lib/outlet-context";
import { fetchOrders, OrderListItem } from "@/lib/api/orders";
import OrdersTable from "@/components/orders/OrdersTable";
import CreateOrderModal from "@/components/orders/CreateOrderModal";

export default function OrdersPage() {
  const { activeOutlet, loading: outletLoading } = useOutlet();

  const [orders, setOrders] = useState<OrderListItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [createOpen, setCreateOpen] = useState(false);

  const loadOrders = useCallback(async () => {
    if (!activeOutlet) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetchOrders({ outletId: activeOutlet.id });
      setOrders(res.data);
    } catch (err) {
      setError("Failed to load orders");
    } finally {
      setLoading(false);
    }
  }, [activeOutlet?.id]);

  useEffect(() => {
    if (!outletLoading && activeOutlet) {
      loadOrders();
    }
  }, [activeOutlet?.id, outletLoading, loadOrders]);

  /* =====================================================
     GUARDS
  ===================================================== */

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

  /* =====================================================
     UI
  ===================================================== */

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-blue-950">
          Orders — {activeOutlet.name}
        </h1>

        <button
          onClick={() => setCreateOpen(true)}
          className="rounded bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-500"
        >
          + New Order
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Orders Table */}
      {loading ? (
        <p className="text-black">Loading orders…</p>
      ) : (
        <OrdersTable orders={orders} onChange={loadOrders} />
      )}

      {/* Create Order */}
      {createOpen && (
        <CreateOrderModal
          outletId={activeOutlet.id}
          onClose={() => setCreateOpen(false)}
          onSuccess={() => {
            setCreateOpen(false);
            loadOrders();
          }}
        />
      )}
    </div>
  );
}
