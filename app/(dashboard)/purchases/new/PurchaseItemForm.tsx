"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useIngredients } from "@/app/hooks/useIngredients";
import type { PurchaseItem } from "@/lib/api/purchase";

type Props = {
  onAdd: (item: PurchaseItem) => Promise<void> | void;
};

export default function PurchaseItemForm({ onAdd }: Props) {
  const { ingredients, loading } = useIngredients();

  const [ingredientId, setIngredientId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const selectedIngredient = ingredients.find((i) => i.id === ingredientId);

  async function handleAdd() {
    if (!selectedIngredient || submitting) return;

    setSubmitting(true);
    try {
      await onAdd({
        ingredientId: selectedIngredient.id,
        ingredientName: selectedIngredient.name,
        unit: selectedIngredient.unit,
        quantity: Number(quantity),
        unitPrice: Number(unitPrice),
      });

      // reset after success
      setIngredientId("");
      setQuantity("");
      setUnitPrice("");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="border rounded-md p-4 space-y-4">
      <h3 className="font-medium text-black">Add Item</h3>

      <select
        className="w-full border rounded bg-gray-800 px-3 py-2"
        value={ingredientId}
        onChange={(e) => setIngredientId(e.target.value)}
        disabled={loading}
      >
        <option value="">Select ingredient</option>
        {ingredients
          .filter((i) => i.isActive)
          .map((i) => (
            <option key={i.id} value={i.id}>
              {i.name}
            </option>
          ))}
      </select>

      <div className="flex gap-3">
        <Input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />

        <Input
          placeholder="Unit"
          value={selectedIngredient?.unit ?? ""}
          disabled
        />
      </div>

      <Input
        type="number"
        placeholder="Unit price"
        value={unitPrice}
        onChange={(e) => setUnitPrice(e.target.value)}
      />

      <Button
        onClick={handleAdd}
        disabled={!ingredientId || !quantity || !unitPrice || submitting}
      >
        {submitting ? "Adding..." : "Add Item"}
      </Button>
    </div>
  );
}
