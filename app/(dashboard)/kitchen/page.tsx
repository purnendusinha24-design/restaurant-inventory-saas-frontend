"use client";

import { useEffect, useRef, useState } from "react";
import { useOutlet } from "@/lib/outlet-context";
import {
  fetchKitchenOrders,
  markPreparing,
  markReady,
  type KitchenOrder,
} from "@/lib/api/orders";
import KitchenOrderCard from "@/components/kitchen/KitchenOrderCard";

export default function KitchenPage() {
  const { activeOutlet } = useOutlet();

  const [orders, setOrders] = useState<KitchenOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const pollingRef = useRef<NodeJS.Timeout | null>(null);

  async function load() {
    if (!activeOutlet?.id) return;

    try {
      const data = await fetchKitchenOrders(activeOutlet.id);
      setOrders(data);
      setError(null);
    } catch (err: any) {
      setError(err?.message ?? "Failed to load kitchen orders");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();

    pollingRef.current = setInterval(load, 5000);

    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current);
    };
  }, [activeOutlet?.id]);

  if (loading) {
    return <p className="p-6 text-slate-400">Loading kitchen orders…</p>;
  }

  if (error) {
    return <p className="p-6 text-red-400">{error}</p>;
  }

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold text-white">Kitchen Orders</h1>

      {orders.length === 0 && (
        <p className="text-slate-400">No active orders 🎉</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {orders.map((order) => (
          <KitchenOrderCard
            key={order.id}
            order={order}
            onPreparing={async () => {
              await markPreparing(order.id);
              load();
            }}
            onReady={async () => {
              await markReady(order.id);
              load();
            }}
          />
        ))}
      </div>
    </div>
  );
}
