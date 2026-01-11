export type RecipeItem = {
  ingredientId: string;
  quantity: string;
};

export type MenuFormValues = {
  name: string;
  price: string; // 👈 MUST be string for inputs
  category?: string;
  recipe: {
    ingredientId: string;
    quantity: string;
  }[];
};
