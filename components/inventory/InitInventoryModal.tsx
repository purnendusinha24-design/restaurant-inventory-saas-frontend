"use client";

import { useEffect, useState } from "react";
import { initInventory } from "@/lib/api/inventory";
import { fetchIngredients, createIngredient } from "@/lib/api/ingredients";

type Ingredient = {
  id: string;
  name: string;
  unit: string;
};

type Props = {
  outletId: string;
  onClose: () => void;
  onSuccess: () => void;
};

export default function InitInventoryModal({
  outletId,
  onClose,
  onSuccess,
}: Props) {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Ingredient | null>(null);

  const [currentStock, setCurrentStock] = useState(0);
  const [minStock, setMinStock] = useState(0);

  // quick add state
  const [adding, setAdding] = useState(false);
  const [newUnit, setNewUnit] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // =====================================================
  // LOAD INGREDIENT MASTER
  // =====================================================
  useEffect(() => {
    fetchIngredients()
      .then(setIngredients)
      .catch(() => {});
  }, []);

  const suggestions = ingredients.filter((i) =>
    i.name.toLowerCase().includes(query.toLowerCase())
  );

  const exactMatch = ingredients.find(
    (i) => i.name.toLowerCase() === query.toLowerCase()
  );

  // =====================================================
  // CREATE INGREDIENT (QUICK ADD)
  // =====================================================
  async function createAndSelectIngredient() {
    if (!query.trim() || !newUnit.trim()) {
      setError("Ingredient name and unit are required");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const ingredient = await createIngredient({
        name: query.trim(),
        unit: newUnit.trim(),
      });

      setIngredients((prev) => [ingredient, ...prev]);
      setSelected(ingredient);
      setQuery(ingredient.name);
      setAdding(false);
      setNewUnit("");
    } catch (err: any) {
      setError(err.message || "Failed to add ingredient");
    } finally {
      setLoading(false);
    }
  }

  // =====================================================
  // INIT INVENTORY
  // =====================================================
  async function submit() {
    if (!selected) {
      setError("Please select an ingredient");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      await initInventory(outletId, {
        ingredientId: selected.id,
        currentStock,
        minStock,
      });

      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to initialize inventory");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-full max-w-md rounded-lg bg-slate-900 p-6 border border-slate-800">
        <h2 className="text-lg font-semibold text-white">
          Initialize Inventory
        </h2>

        {/* INGREDIENT SEARCH */}
        <div className="mt-4">
          <label className="block text-sm text-slate-300 mb-1">
            Ingredient
          </label>

          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelected(null);
              setAdding(false);
            }}
            placeholder="Start typing ingredient name…"
            className="w-full rounded bg-slate-800 px-3 py-2 text-slate-100"
          />

          {query && !selected && (
            <div className="mt-1 rounded border border-slate-700 bg-slate-900">
              {suggestions.map((i) => (
                <button
                  key={i.id}
                  type="button"
                  onClick={() => {
                    setSelected(i);
                    setQuery(i.name);
                  }}
                  className="block w-full px-3 py-2 text-left text-sm text-slate-200 hover:bg-slate-800"
                >
                  {i.name} ({i.unit})
                </button>
              ))}

              {!exactMatch && (
                <button
                  type="button"
                  onClick={() => setAdding(true)}
                  className="block w-full px-3 py-2 text-left text-sm text-indigo-400 hover:bg-slate-800"
                >
                  + Add ingredient “{query}”
                </button>
              )}
            </div>
          )}
        </div>

        {/* QUICK ADD UNIT */}
        {adding && (
          <div className="mt-4 rounded border border-slate-700 p-3">
            <label className="block text-sm text-slate-300 mb-1">
              Unit for “{query}”
            </label>

            <input
              value={newUnit}
              onChange={(e) => setNewUnit(e.target.value)}
              placeholder="kg, litre, pcs"
              className="w-full rounded bg-slate-800 px-3 py-2 text-slate-100"
            />

            <div className="mt-2 flex justify-end gap-2">
              <button
                onClick={() => setAdding(false)}
                className="px-3 py-1 text-sm text-slate-400"
              >
                Cancel
              </button>
              <button
                onClick={createAndSelectIngredient}
                disabled={loading}
                className="rounded bg-indigo-600 px-3 py-1 text-sm text-white disabled:opacity-60"
              >
                {loading ? "Adding…" : "Add"}
              </button>
            </div>
          </div>
        )}

        {/* CURRENT STOCK */}
        <div className="mt-4">
          <label className="block text-sm text-slate-300">Current Stock</label>
          <p className="text-xs text-slate-500 mb-1">
            How much stock you currently have in this outlet
          </p>
          <input
            type="number"
            min={0}
            value={currentStock}
            onChange={(e) => setCurrentStock(Number(e.target.value))}
            className="w-full rounded bg-slate-800 px-3 py-2 text-slate-100"
          />
        </div>

        {/* MIN STOCK */}
        <div className="mt-4">
          <label className="block text-sm text-slate-300">Minimum Stock</label>
          <p className="text-xs text-slate-500 mb-1">
            Alert will trigger when stock goes below this value
          </p>
          <input
            type="number"
            min={0}
            value={minStock}
            onChange={(e) => setMinStock(Number(e.target.value))}
            className="w-full rounded bg-slate-800 px-3 py-2 text-slate-100"
          />
        </div>

        {error && <p className="mt-3 text-sm text-red-400">{error}</p>}

        <div className="mt-6 flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 text-slate-300">
            Cancel
          </button>

          <button
            disabled={loading}
            onClick={submit}
            className="rounded bg-indigo-600 px-4 py-2 text-white disabled:opacity-60"
          >
            {loading ? "Saving…" : "Initialize"}
          </button>
        </div>
      </div>
    </div>
  );
}
