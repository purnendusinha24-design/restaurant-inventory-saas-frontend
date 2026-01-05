import { apiFetch } from "./client";
import type { AuthResponse } from "./types";
import type { AuthUser } from "./types";

type LoginResponse = {
  accessToken: string;
  user: AuthUser;
};

export async function login(email: string, password: string) {
  const res = await apiFetch<LoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  // 🔥 THIS IS CRITICAL
  localStorage.setItem("accessToken", res.accessToken);

  return res;
}

export async function signup(data: {
  organizationName: string;
  name: string;
  email: string;
  password: string;
}) {
  const res = await apiFetch<AuthResponse>("/auth/signup", {
    method: "POST",
    body: JSON.stringify(data),
  });

  localStorage.setItem("accessToken", res.accessToken);
  return res;
}
