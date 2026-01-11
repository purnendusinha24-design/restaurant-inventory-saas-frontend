"use client";

import { Control, UseFormRegister, useFieldArray } from "react-hook-form";
import { useIngredients } from "@/lib/useIngredients";
import type { MenuFormValues } from "./types";

type RecipeEditorProps = {
  control: Control<MenuFormValues>;
  register: UseFormRegister<MenuFormValues>;
};

export default function RecipeEditor({ control, register }: RecipeEditorProps) {
  const { ingredients } = useIngredients();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "recipe",
  });

  return (
    <div className="border rounded-lg p-4">
      <h3 className="mb-3 font-medium">Recipe</h3>

      {fields.map((field, index) => (
        <div key={field.id} className="mb-2 flex gap-2">
          <select {...register(`recipe.${index}.ingredientId`)}>
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
            placeholder="Quantity"
            {...register(`recipe.${index}.quantity`, {
              valueAsNumber: true,
            })}
          />

          <button type="button" onClick={() => remove(index)}>
            ✕
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={() => append({ ingredientId: "", quantity: "" })}
        className="text-sm text-blue-600"
      >
        + Add ingredient
      </button>
    </div>
  );
}
