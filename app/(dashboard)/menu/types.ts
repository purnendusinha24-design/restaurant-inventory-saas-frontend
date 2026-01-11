/* =========================
   DOMAIN / API TYPES
   ========================= */

// Matches backend menuIngredient include
export type MenuIngredient = {
  ingredientId: string;
  quantityRequired: number;
  ingredient: {
    name: string;
    unit: string;
  };
};

// Matches backend menuItem response
export type MenuItem = {
  id: string;
  name: string;
  price: number;
  category?: string;
  isActive: boolean;
  ingredients: MenuIngredient[];
};

/* =========================
   FORM TYPES (UI ONLY)
   ========================= */

export type RecipeItem = {
  ingredientId: string;
  quantity: string; // string for inputs
};

export type MenuFormValues = {
  name: string;
  price: string; // 👈 MUST be string for inputs
  category?: string;
  recipe: RecipeItem[];
};
