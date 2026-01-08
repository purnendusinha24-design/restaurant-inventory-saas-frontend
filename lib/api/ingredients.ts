import { apiFetch } from "./client";

export type Ingredient = {
  id: string;
  name: string;
  unit: string;
  isActive: boolean;
  createdAt: string;
};

// =====================================================
// GET INGREDIENTS
// Optional search support
// =====================================================
export async function fetchIngredients(search?: string) {
  const query = search ? `?search=${encodeURIComponent(search)}` : "";
  return apiFetch<Ingredient[]>(`/ingredients${query}`);
}

// =====================================================
// CREATE INGREDIENT
// =====================================================
export async function createIngredient(payload: {
  name: string;
  unit: string;
}) {
  return apiFetch<Ingredient>("/ingredients", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
