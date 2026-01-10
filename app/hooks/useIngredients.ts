import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api/client";
import type { Ingredient } from "@/lib/api/ingredients";

export function useIngredients() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchIngredients() {
      setLoading(true);
      try {
        const data = await apiFetch<Ingredient[]>("/ingredients");
        setIngredients(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load ingredients"
        );
      } finally {
        setLoading(false);
      }
    }

    fetchIngredients();
  }, []);

  return {
    ingredients,
    loading,
    error,
  };
}
