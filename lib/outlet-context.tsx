"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { fetchOutlets, Outlet } from "@/lib/api/outlets";

/* =========================
   Types
========================= */

type OutletContextType = {
  outlets: Outlet[];
  activeOutlet: Outlet | null;
  setActiveOutletId: (id: string) => void;
  addOutlet: (outlet: Outlet) => void;
  loading: boolean;
};

/* =========================
   Context
========================= */

const OutletContext = createContext<OutletContextType | null>(null);

/* =========================
   Helpers
========================= */

function resolveInitialOutlet(
  outlets: Outlet[],
  savedId: string | null
): Outlet | null {
  if (!outlets.length) return null;
  return outlets.find((o) => o.id === savedId) ?? outlets[0];
}

/* =========================
   Provider
========================= */

export function OutletProvider({ children }: { children: React.ReactNode }) {
  const [outlets, setOutlets] = useState<Outlet[]>([]);
  const [activeOutlet, setActiveOutlet] = useState<Outlet | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function init() {
      try {
        const data = await fetchOutlets();
        if (!mounted) return;

        setOutlets(data);

        const savedId =
          typeof window !== "undefined"
            ? localStorage.getItem("activeOutletId")
            : null;

        const initial = resolveInitialOutlet(data, savedId);

        if (initial) {
          setActiveOutlet(initial);
          localStorage.setItem("activeOutletId", initial.id);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }

    init();

    return () => {
      mounted = false;
    };
  }, []);

  /* =========================
     Actions
  ========================= */

  const setActiveOutletId = (id: string) => {
    const outlet = outlets.find((o) => o.id === id) ?? null;
    setActiveOutlet(outlet);

    if (outlet) {
      localStorage.setItem("activeOutletId", outlet.id);
    }
  };

  const addOutlet = (outlet: Outlet) => {
    setOutlets((prev) => [...prev, outlet]);
    setActiveOutlet(outlet);
    localStorage.setItem("activeOutletId", outlet.id);
  };

  /* =========================
     Render
  ========================= */

  return (
    <OutletContext.Provider
      value={{
        outlets,
        activeOutlet,
        setActiveOutletId,
        addOutlet,
        loading,
      }}
    >
      {children}
    </OutletContext.Provider>
  );
}

/* =========================
   Hook
========================= */

export function useOutlet(): OutletContextType {
  const ctx = useContext(OutletContext);
  if (!ctx) {
    throw new Error("useOutlet must be used within OutletProvider");
  }
  return ctx;
}
