// frontend/lib/api/auth.ts

import { apiFetch } from "./client";
import type { AuthResponse } from "./types";

// 🔐 LOGIN
export async function login(
  email: string,
  password: string
): Promise<AuthResponse> {
  return apiFetch<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

// 🔐 SIGNUP
export async function signup(data: {
  organizationName: string;
  name: string;
  email: string;
  password: string;
}): Promise<AuthResponse> {
  return apiFetch<AuthResponse>("/auth/signup", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export const validateInvite = (token: string) =>
  apiFetch<{
    email: string;
    role: string;
    organization: { id: string; name: string };
  }>(`/auth/invite/${token}`);

// ✅ ACCEPT INVITE
export async function acceptInvite(data: {
  token: string;
  password: string;
}): Promise<{ message: string }> {
  return apiFetch<{ message: string }>("/auth/accept-invite", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
