"use client";

import { Control, UseFormRegister, useFieldArray } from "react-hook-form";
import { useIngredients } from "@/lib/useIngredients";
import type { MenuFormValues } from "./types";

type RecipeEditorProps = {
  control: Control<MenuFormValues>;
  register: UseFormRegister<MenuFormValues>;
};

export default function RecipeEditor({ control, register }: RecipeEditorProps) {
  const { ingredients, isLoading } = useIngredients();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "recipe",
    shouldUnregister: false, // 🔑 keep values during async + reset
  });

  return (
    <div className="border rounded-lg p-4">
      <h3 className="mb-3 font-medium">Recipe</h3>

      {fields.map((field, index) => (
        <div key={field.id} className="mb-2 flex gap-2 items-center">
          {/* 🔑 key forces remount when ingredients load */}
          <select
            key={`${field.id}-${ingredients.length}`}
            {...register(`recipe.${index}.ingredientId`)}
            className="input flex-1"
            disabled={isLoading}
          >
            <option value="">Ingredient</option>
            {ingredients.map((i) => (
              <option key={i.id} value={i.id}>
                {i.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            step="0.01"
            placeholder="Qty"
            className="input w-24"
            {...register(`recipe.${index}.quantity`, {
              required: true,
            })}
          />

          <button
            type="button"
            onClick={() => remove(index)}
            className="text-red-400 hover:text-red-600"
          >
            ✕
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={() => append({ ingredientId: "", quantity: "" })}
        className="mt-2 text-sm text-blue-600 hover:underline"
      >
        + Add ingredient
      </button>
    </div>
  );
}
