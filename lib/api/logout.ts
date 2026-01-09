export function logout() {
  if (typeof window === "undefined") return;

  // Clear auth
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");

  // Clear outlet context
  localStorage.removeItem("activeOutletId");

  // Redirect to login page
  window.location.href = "/login";
}
