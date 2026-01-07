import { apiFetch } from "./client";
import type { UserListItem, CreatedUser } from "./types";

/**
 * Fetch all users (OWNER only)
 */
export async function fetchUsers(): Promise<UserListItem[]> {
  return apiFetch<UserListItem[]>("/users");
}

/**
 * Toggle user status
 */
export async function updateUserStatus(userId: string): Promise<void> {
  await apiFetch(`/users/${userId}/status`, {
    method: "PATCH",
  });
}

/**
 * Create user + return invite token
 */
export type CreateUserInput = {
  name: string;
  email: string;
  phone: string;
  role: "MANAGER" | "STAFF";
};

export async function createUser(data: CreateUserInput): Promise<CreatedUser> {
  return apiFetch<CreatedUser>("/users", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function deleteUser(userId: string): Promise<void> {
  await apiFetch(`/users/${userId}`, {
    method: "DELETE",
  });
}
