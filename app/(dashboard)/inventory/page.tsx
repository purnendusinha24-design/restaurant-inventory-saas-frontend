"use client";

import { useEffect, useState } from "react";
import { useOutlet } from "@/lib/outlet-context";
import {
  fetchInventorySnapshot,
  InventorySnapshotItem,
} from "@/lib/api/inventory";

import InitInventoryModal from "@/components/inventory/InitInventoryModal";
import AdjustStockModal from "@/components/inventory/AdjustStockModal";

export default function InventoryPage() {
  const { activeOutlet, loading: outletLoading } = useOutlet();

  const [items, setItems] = useState<InventorySnapshotItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [initOpen, setInitOpen] = useState(false);
  const [selected, setSelected] = useState<InventorySnapshotItem | null>(null);
  const [mode, setMode] = useState<"IN" | "OUT">("IN");

  async function loadInventory() {
    if (!activeOutlet) return;

    setLoading(true);
    try {
      const res = await fetchInventorySnapshot(activeOutlet.id);
      setItems(res.data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!outletLoading && activeOutlet) {
      loadInventory();
    }
  }, [activeOutlet?.id, outletLoading]);

  if (outletLoading) {
    return <p className="text-slate-400">Loading outlet…</p>;
  }

  if (!activeOutlet) {
    return (
      <div className="rounded-lg border border-slate-800 p-6 text-slate-400">
        Please create or select an outlet to manage inventory.
      </div>
    );
  }

  if (loading) {
    return <p className="text-slate-400">Loading inventory…</p>;
  }

  // =====================================================
  // EMPTY STATE
  // =====================================================
  if (items.length === 0) {
    return (
      <div className="space-y-4">
        <h1 className="text-xl font-semibold text-white">
          Inventory — {activeOutlet.name}
        </h1>

        <div className="rounded-lg border border-slate-800 p-8 text-center text-slate-400">
          <p className="mb-4">No inventory initialized for this outlet.</p>

          <button
            onClick={() => setInitOpen(true)}
            className="rounded bg-indigo-600 px-4 py-2 text-sm text-white"
          >
            Initialize Inventory
          </button>
        </div>

        {initOpen && (
          <InitInventoryModal
            outletId={activeOutlet.id}
            onClose={() => setInitOpen(false)}
            onSuccess={loadInventory}
          />
        )}
      </div>
    );
  }

  // =====================================================
  // INVENTORY TABLE
  // =====================================================
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-white">
          Inventory — {activeOutlet.name}
        </h1>

        <button
          onClick={() => setInitOpen(true)}
          className="rounded bg-indigo-600 px-4 py-2 text-sm text-white"
        >
          + Add Ingredient
        </button>
      </div>

      <div className="overflow-hidden rounded-lg border border-slate-800">
        <table className="w-full text-sm">
          <thead className="bg-slate-900 text-slate-300">
            <tr>
              <th className="px-4 py-2 text-left">Ingredient</th>
              <th className="px-4 py-2 text-left">Stock</th>
              <th className="px-4 py-2 text-left">Min</th>
              <th className="px-4 py-2 text-left">Unit</th>
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
                <td className="px-4 py-2 text-blue-900">
                  {item.ingredientName}
                </td>
                <td className="px-4 py-2 text-blue-900">{item.currentStock}</td>
                <td className="px-4 py-2 text-blue-900">{item.minStock}</td>
                <td className="px-4 py-2 text-blue-950">{item.unit}</td>
                <td className="px-4 py-2 text-center">
                  {item.isLowStock ? (
                    <span className="font-extrabold text-red-400 px-2 py-1 text-lg">
                      Low
                    </span>
                  ) : (
                    <span className="font-extrabold text-green-400 px-2 py-1 text-lg">
                      OK
                    </span>
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

      {initOpen && (
        <InitInventoryModal
          outletId={activeOutlet.id}
          onClose={() => setInitOpen(false)}
          onSuccess={loadInventory}
        />
      )}

      {selected && (
        <AdjustStockModal
          outletId={activeOutlet.id}
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
