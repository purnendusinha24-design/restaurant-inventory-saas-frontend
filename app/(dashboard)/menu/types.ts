export type RecipeItem = {
  ingredientId: string;
  quantity: number;
};

export type MenuFormValues = {
  name: string;
  price: number;
  category?: string;
  recipe: RecipeItem[];
};
