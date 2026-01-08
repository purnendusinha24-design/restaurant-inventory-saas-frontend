"use client";

import { useEffect, useState } from "react";
import {
  fetchInventorySnapshot,
  InventorySnapshotItem,
} from "@/lib/api/inventory";
import StockStatusBadge from "@/components/ui/StockStatusBadge";

type Props = {
  outletId: string;
};

export default function InventoryTable({ outletId }: Props) {
  const [items, setItems] = useState<InventorySnapshotItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInventorySnapshot(outletId)
      .then((res) => setItems(res.data))
      .finally(() => setLoading(false));
  }, [outletId]);

  if (loading) {
    return (
      <div className="rounded-lg border border-slate-800 bg-slate-900 p-6 text-slate-400">
        Loading inventory…
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="rounded-lg border border-slate-800 bg-slate-900 p-6 text-center text-slate-400">
        No inventory items found
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-slate-800 bg-slate-900">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-800 text-slate-400">
            <th className="px-4 py-3">Ingredient</th>
            <th className="px-4 py-3">Stock</th>
            <th className="px-4 py-3">Min</th>
            <th className="px-4 py-3">Status</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item) => (
            <tr
              key={item.ingredientId}
              className="border-b border-slate-800 hover:bg-slate-800/40"
            >
              <td className="px-4 py-3 text-white">{item.ingredientName}</td>

              <td className="px-4 py-3">
                {item.currentStock} {item.unit}
              </td>

              <td className="px-4 py-3">{item.minStock}</td>

              <td className="px-4 py-3">
                <StockStatusBadge status={item.isLowStock ? "LOW" : "OK"} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
