import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api/client";

/* =========================
   Types
========================= */

export type Ingredient = {
  id: string;
  name: string;
  unit: string;
  costPerUnit: number;
  isActive: boolean;
};

type UseIngredientsResult = {
  ingredients: Ingredient[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
};

/* =========================
   Hook
========================= */

export function useIngredients(): UseIngredientsResult {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchIngredients = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await apiFetch<Ingredient[]>("/ingredients");

      // Only active ingredients (important for recipes)
      setIngredients(data.filter((i) => i.isActive));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load ingredients"
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchIngredients();
  }, []);

  return {
    ingredients,
    isLoading,
    error,
    refetch: fetchIngredients,
  };
}
