import { apiFetch } from "./client";

export type MenuItem = {
  id: string;
  name: string;
  price: string;
  isActive: boolean;
};

export async function fetchMenuItems(outletId: string) {
  return apiFetch<MenuItem[]>(`/menu/${outletId}`);
}
