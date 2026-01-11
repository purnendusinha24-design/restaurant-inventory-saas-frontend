import { ApiError } from "./ApiError";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not defined");
}

function getErrorMessage(data: unknown): string | undefined {
  if (
    typeof data === "object" &&
    data !== null &&
    "message" in data &&
    typeof (data as { message?: unknown }).message === "string"
  ) {
    return (data as { message: string }).message;
  }
  return undefined;
}

export async function apiFetch<T = unknown>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  const outletId =
    typeof window !== "undefined"
      ? localStorage.getItem("activeOutletId")
      : null;

  const res = await fetch(`${API_BASE_URL}${path}`, {
    credentials: "include",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...(outletId && { "x-outlet-id": outletId }),
      ...(options.headers || {}),
    },
  });

  // ✅ No content (DELETE, some PUTs)
  if (res.status === 204) {
    return undefined as T;
  }

  let data: unknown = null;

  const contentType = res.headers.get("content-type");
  if (contentType?.includes("application/json")) {
    data = await res.json().catch(() => null);
  }

  if (!res.ok) {
    throw new ApiError(
      getErrorMessage(data) || res.statusText || "Request failed",
      res.status
    );
  }

  return data as T;
}
