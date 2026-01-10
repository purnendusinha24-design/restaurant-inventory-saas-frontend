export type PurchaseItem = {
  ingredientId: string;
  ingredientName: string;
  unit: string;
  quantity: number;
  unitPrice: number;
};

export type Purchase = {
  id: string;
  status: "DRAFT" | "COMPLETED";
  totalCost: number;
  items: {
    id: string;
    quantity: number;
    unitCost: number;
    ingredient: {
      id: string;
      name: string;
      unit: string;
    };
  }[];
};
