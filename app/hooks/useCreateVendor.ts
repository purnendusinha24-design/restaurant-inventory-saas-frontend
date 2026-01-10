import { apiFetch } from "@/lib/api/client";

export interface CreateVendorInput {
  name: string;
  contactName?: string;
  phone?: string;
  email?: string;
  address?: string;
}

export async function createVendor(data: CreateVendorInput) {
  return apiFetch("/vendors", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
