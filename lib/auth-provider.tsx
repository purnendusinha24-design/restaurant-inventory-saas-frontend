"use client";

import { useEffect, useState } from "react";
import { AuthContext } from "./auth-context";
import type { AuthUser } from "@/lib/api/types";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true); // ✅ ADD THIS

  // 🔐 Restore auth on first load
  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    const storedUser = localStorage.getItem("authUser");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }

    setIsLoading(false); // ✅ IMPORTANT
  }, []);

  const login = (token: string, user: AuthUser) => {
    localStorage.setItem("accessToken", token);
    localStorage.setItem("authUser", JSON.stringify(user));
    setToken(token);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("authUser");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user && !!token,
        isLoading, // ✅ PROVIDE IT
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
