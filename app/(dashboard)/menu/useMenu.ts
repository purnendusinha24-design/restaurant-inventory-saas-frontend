import { useCallback, useEffect, useState } from "react";
import { apiFetch } from "@/lib/api/client";

/* =========================
   Types
========================= */

export type MenuItem = {
  id: string;
  name: string;
  price: number;
  category?: string;
  isAvailable: boolean;
};

type UseMenuResult = {
  menu: MenuItem[];
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
};

/* =========================
   Hook
========================= */

export function useMenu(outletId?: string): UseMenuResult {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMenu = useCallback(async () => {
    if (!outletId) return;

    setIsLoading(true);
    setError(null);

    try {
      const data = await apiFetch<MenuItem[]>(`/menu/${outletId}`);
      setMenu(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch menu");
    } finally {
      setIsLoading(false);
    }
  }, [outletId]);

  useEffect(() => {
    fetchMenu();
  }, [fetchMenu]);

  return {
    menu,
    isLoading,
    error,
    refresh: fetchMenu,
  };
}
