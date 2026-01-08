// frontend/lib/api/outlets.ts
import { apiFetch } from "./client";

export type Outlet = {
  id: string;
  name: string;
  address?: string;
};

export async function fetchOutlets() {
  return apiFetch<Outlet[]>("/outlets");
}

export async function createFirstOutlet(payload: {
  name: string;
  address?: string;
}) {
  return apiFetch<Outlet>("/outlets/bootstrap", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function createOutlet(payload: {
  name: string;
  address?: string;
}) {
  return apiFetch<Outlet>("/outlets", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
