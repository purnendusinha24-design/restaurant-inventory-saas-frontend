// frontend/lib/outlet-context.tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { fetchOutlets, Outlet } from "@/lib/api/outlets";

type OutletContextType = {
  outlets: Outlet[];
  activeOutlet: Outlet | null;
  setActiveOutletId: (id: string) => void;
  addOutlet: (outlet: Outlet) => void;
  loading: boolean;
};

const OutletContext = createContext<OutletContextType | null>(null);

export function OutletProvider({ children }: { children: React.ReactNode }) {
  const [outlets, setOutlets] = useState<Outlet[]>([]);
  const [activeOutlet, setActiveOutlet] = useState<Outlet | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchOutlets();
        setOutlets(data);

        const savedId = localStorage.getItem("activeOutletId");
        const initial = data.find((o) => o.id === savedId) || data[0] || null;

        setActiveOutlet(initial);
        if (initial) {
          localStorage.setItem("activeOutletId", initial.id);
        }
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  function setActiveOutletId(id: string) {
    const outlet = outlets.find((o) => o.id === id) || null;
    setActiveOutlet(outlet);
    if (outlet) localStorage.setItem("activeOutletId", outlet.id);
  }

  function addOutlet(outlet: Outlet) {
    setOutlets((prev) => [...prev, outlet]);
    setActiveOutlet(outlet);
    localStorage.setItem("activeOutletId", outlet.id);
  }

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

export function useOutlet() {
  const ctx = useContext(OutletContext);
  if (!ctx) throw new Error("useOutlet must be used within OutletProvider");
  return ctx;
}
