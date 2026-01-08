"use client";

import { useEffect, useState } from "react";
import {
  fetchInventorySnapshot,
  InventorySnapshotItem,
} from "@/lib/api/inventory";
import AdjustStockModal from "@/components/inventory/AdjustStockModal";

export default function InventoryPage() {
  const [items, setItems] = useState<InventorySnapshotItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [selected, setSelected] = useState<InventorySnapshotItem | null>(null);
  const [mode, setMode] = useState<"IN" | "OUT">("IN");

  // TEMP (v1)
  const outletId = "OUTLET_ID_HERE";

  async function loadInventory() {
    setLoading(true);
    try {
      const res = await fetchInventorySnapshot(outletId);
      setItems(res.data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadInventory();
  }, [outletId]);

  if (loading) {
    return <p className="text-slate-400">Loading inventory…</p>;
  }

  if (items.length === 0) {
    return (
      <div className="rounded-lg border border-slate-800 p-6 text-slate-400">
        No inventory items found.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-white">Inventory</h1>

      <div className="overflow-hidden rounded-lg border border-slate-800">
        <table className="w-full text-sm">
          <thead className="bg-slate-900 text-slate-300">
            <tr>
              <th className="px-4 py-2 text-left">Ingredient</th>
              <th className="px-4 py-2 text-center">Stock</th>
              <th className="px-4 py-2 text-center">Min</th>
              <th className="px-4 py-2 text-center">Unit</th>
              <th className="px-4 py-2 text-center">Status</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item) => (
              <tr
                key={item.ingredientId}
                className="border-t border-slate-800 hover:bg-slate-900/40"
              >
                <td className="px-4 py-2 text-white">{item.ingredientName}</td>

                <td className="px-4 py-2 text-center">{item.currentStock}</td>

                <td className="px-4 py-2 text-center">{item.minStock}</td>

                <td className="px-4 py-2 text-center">{item.unit}</td>

                <td className="px-4 py-2 text-center">
                  {item.isLowStock ? (
                    <span className="text-red-400 font-medium">Low</span>
                  ) : (
                    <span className="text-green-400 font-medium">OK</span>
                  )}
                </td>

                <td className="px-4 py-2 text-center space-x-2">
                  <button
                    onClick={() => {
                      setSelected(item);
                      setMode("IN");
                    }}
                    className="rounded bg-green-600 px-2 py-1 text-xs text-white"
                  >
                    + In
                  </button>

                  <button
                    onClick={() => {
                      setSelected(item);
                      setMode("OUT");
                    }}
                    className="rounded bg-red-600 px-2 py-1 text-xs text-white"
                  >
                    − Out
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected && (
        <AdjustStockModal
          outletId={outletId}
          ingredientId={selected.ingredientId}
          ingredientName={selected.ingredientName}
          mode={mode}
          onClose={() => setSelected(null)}
          onSuccess={loadInventory}
        />
      )}
    </div>
  );
}
