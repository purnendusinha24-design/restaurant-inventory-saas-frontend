"use client";

import { useEffect, useState } from "react";
import { adjustStock, StockLogReason } from "@/lib/api/inventory";

type Props = {
  outletId: string;
  ingredientId: string;
  ingredientName: string;
  mode: "IN" | "OUT";
  onClose: () => void;
  onSuccess: () => void;
};

export default function AdjustStockModal({
  outletId,
  ingredientId,
  ingredientName,
  mode,
  onClose,
  onSuccess,
}: Props) {
  const [quantity, setQuantity] = useState<number>(0);
  const [reason, setReason] = useState<StockLogReason>(
    mode === "IN" ? "PURCHASE" : "WASTE"
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Reset when modal opens or mode changes
  useEffect(() => {
    setQuantity(0);
    setReason(mode === "IN" ? "PURCHASE" : "WASTE");
    setError(null);
  }, [ingredientId, mode]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (quantity <= 0) {
      setError("Quantity must be greater than zero");
      return;
    }

    try {
      setLoading(true);

      const signedQuantity = mode === "IN" ? quantity : -quantity;

      await adjustStock(outletId, {
        ingredientId,
        quantity: signedQuantity,
        reason,
      });

      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to update stock");
    } finally {
      setLoading(false);
    }
  }

  // Allowed reasons depend on action
  const allowedReasons: StockLogReason[] =
    mode === "IN" ? ["PURCHASE", "ADJUSTMENT"] : ["WASTE", "ADJUSTMENT"];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-full max-w-sm rounded-lg bg-slate-900 p-6 border border-slate-700">
        <h2 className="mb-1 text-lg font-semibold text-white">
          {mode === "IN" ? "Stock In" : "Stock Out"}
        </h2>

        <p className="mb-4 text-sm text-slate-400">{ingredientName}</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="number"
            min={0.01}
            step="0.01"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full rounded bg-slate-800 px-3 py-2 text-slate-100"
            required
          />

          <select
            value={reason}
            onChange={(e) => setReason(e.target.value as StockLogReason)}
            className="w-full rounded bg-slate-800 px-3 py-2 text-slate-100"
          >
            {allowedReasons.map((r) => (
              <option key={r} value={r}>
                {r === "PURCHASE" && "Purchase"}
                {r === "WASTE" && "Wastage"}
                {r === "ADJUSTMENT" && "Adjustment"}
              </option>
            ))}
          </select>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-slate-300"
            >
              Cancel
            </button>

            <button
              disabled={loading}
              className={`rounded px-4 py-2 text-white disabled:opacity-60 ${
                mode === "IN" ? "bg-green-600" : "bg-red-600"
              }`}
            >
              {loading ? "Saving…" : "Confirm"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
