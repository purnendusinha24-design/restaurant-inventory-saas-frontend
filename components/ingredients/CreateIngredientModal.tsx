"use client";

import { useState } from "react";
import { createIngredient } from "@/lib/api/ingredients";

type Props = {
  onClose: () => void;
  onSuccess: () => void;
};

export default function CreateIngredientModal({ onClose, onSuccess }: Props) {
  const [name, setName] = useState("");
  const [unit, setUnit] = useState("kg");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit() {
    if (!name.trim()) return;

    try {
      setLoading(true);
      await createIngredient({ name, unit });
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
      <div className="w-full max-w-sm rounded bg-slate-900 p-6">
        <h2 className="mb-4 text-lg font-semibold text-white">
          Add Ingredient
        </h2>

        <input
          placeholder="Ingredient name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-3 w-full rounded bg-slate-800 px-3 py-2 text-white"
          autoFocus
        />

        <select
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          className="mb-3 w-full rounded bg-slate-800 px-3 py-2 text-white"
        >
          <option value="kg">kg</option>
          <option value="litre">litre</option>
          <option value="pcs">pcs</option>
        </select>

        {error && <p className="mb-2 text-sm text-red-400">{error}</p>}

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="text-slate-300">
            Cancel
          </button>
          <button
            onClick={submit}
            disabled={loading}
            className="rounded bg-indigo-600 px-4 py-2 text-sm text-white"
          >
            {loading ? "Saving…" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}
