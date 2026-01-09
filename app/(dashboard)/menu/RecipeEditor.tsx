import { useFieldArray, useFormContext } from "react-hook-form";
import { useIngredients } from "@/lib/useIngredients";

type RecipeItem = {
  ingredientId: string;
  quantity: number;
};

type FormValues = {
  recipe: RecipeItem[];
};

export default function RecipeEditor() {
  const { control, register } = useFormContext<FormValues>();
  const { ingredients } = useIngredients();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "recipe",
  });

  return (
    <div className="border rounded-lg p-4">
      <h3 className="font-medium mb-3">Recipe</h3>

      {fields.map((field, index) => (
        <div key={field.id} className="flex gap-2 mb-2">
          <select
            {...register(`recipe.${index}.ingredientId`)}
            className="border rounded px-2 py-1"
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
            {...register(`recipe.${index}.quantity`, {
              valueAsNumber: true,
            })}
            placeholder="Qty"
            className="border rounded px-2 py-1 w-24"
          />

          <button
            type="button"
            onClick={() => remove(index)}
            className="text-red-500"
          >
            ✕
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={() => append({ ingredientId: "", quantity: 0 })}
        className="text-sm text-blue-600 mt-2"
      >
        + Add ingredient
      </button>
    </div>
  );
}
