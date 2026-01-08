"use client";

import { useState } from "react";
import { createIngredient } from "@/lib/api/ingredients";

type Props = {
  onClose: () => void;
  onSuccess: () => void;
};

export default function AddIngredientModal({ onClose, onSuccess }: Props) {
  const [name, setName] = useState("");
  const [unit, setUnit] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!name.trim() || !unit.trim()) {
      setError("Name and unit are required");
      return;
    }

    try {
      setLoading(true);
      await createIngredient({
        name: name.trim(),
        unit: unit.trim(),
      });
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to create ingredient");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-full max-w-sm rounded-lg bg-slate-900 p-6 border border-slate-700">
        <h2 className="mb-4 text-lg font-semibold text-white">
          Add Ingredient
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-slate-400 mb-1">
              Ingredient name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded bg-slate-800 px-3 py-2 text-slate-100"
              placeholder="e.g. Tomato"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-1">
              Unit (how you track it)
            </label>
            <input
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="w-full rounded bg-slate-800 px-3 py-2 text-slate-100"
              placeholder="kg, litre, pcs"
            />
          </div>

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
              className="rounded bg-indigo-600 px-4 py-2 text-white disabled:opacity-60"
            >
              {loading ? "Saving…" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
