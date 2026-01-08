"use client";

import { useEffect, useState } from "react";
import { fetchIngredients, Ingredient } from "@/lib/api/ingredients";
import AddIngredientModal from "@/components/ingredients/AddIngredientModal";

export default function IngredientsPage() {
  const [items, setItems] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  async function loadIngredients() {
    setLoading(true);
    try {
      const data = await fetchIngredients();
      setItems(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadIngredients();
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-white">Ingredients</h1>

        <button
          onClick={() => setShowModal(true)}
          className="rounded bg-indigo-600 px-4 py-2 text-sm text-white"
        >
          + Add Ingredient
        </button>
      </div>

      {loading ? (
        <p className="text-slate-400">Loading ingredients…</p>
      ) : items.length === 0 ? (
        <div className="rounded-lg border border-slate-800 p-6 text-slate-400">
          No ingredients added yet.
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-slate-800">
          <table className="w-full text-sm">
            <thead className="bg-slate-900 text-slate-300">
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Unit</th>
                <th className="px-4 py-2 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {items.map((item) => (
                <tr
                  key={item.id}
                  className="border-t border-slate-800 hover:bg-slate-900/40"
                >
                  <td className="px-4 py-2 text-white">{item.name}</td>
                  <td className="px-4 py-2 text-slate-300">{item.unit}</td>
                  <td className="px-4 py-2">
                    {item.isActive ? (
                      <span className="text-green-400">Active</span>
                    ) : (
                      <span className="text-slate-500">Inactive</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <AddIngredientModal
          onClose={() => setShowModal(false)}
          onSuccess={loadIngredients}
        />
      )}
    </div>
  );
}
