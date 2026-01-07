"use client";

import { createContext } from "react";
import type { AuthUser } from "@/lib/api/types";

export type AuthContextType = {
  user: AuthUser | null;
  token: string | null;

  /** 🔐 Derived state */
  isAuthenticated: boolean;

  /** ⏳ True while auth is being restored from storage */
  isLoading: boolean;

  /** Actions */
  login: (token: string, user: AuthUser) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
