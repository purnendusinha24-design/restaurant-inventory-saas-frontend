"use client";

import { useCallback, useEffect, useState } from "react";
import { apiFetch } from "@/lib/api/client";
import { useOutlet } from "@/lib/outlet-context";
import type { Vendor } from "@/lib/types/vendors";

export function useVendors() {
  const { activeOutlet, loading: outletLoading } = useOutlet();

  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVendors = useCallback(async () => {
    if (!activeOutlet) return; // 🔒 HARD GUARD

    try {
      setIsLoading(true);
      const data = await apiFetch<Vendor[]>("/vendors");
      setVendors(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to load vendors");
      }
    } finally {
      setIsLoading(false);
    }
  }, [activeOutlet]);

  useEffect(() => {
    if (!outletLoading && activeOutlet) {
      fetchVendors();
    }
  }, [outletLoading, activeOutlet, fetchVendors]);

  return {
    vendors,
    isLoading,
    error,
    refetch: fetchVendors,
  };
}
