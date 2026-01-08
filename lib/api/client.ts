const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export async function apiFetch<T>(
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
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...(outletId && { "x-outlet-id": outletId }), // 🔴 IMPORTANT
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    let message = "API request failed";

    try {
      const data = await res.json();
      message = data.message || message;
    } catch {
      message = await res.text();
    }

    throw new Error(message);
  }

  return res.json();
}
