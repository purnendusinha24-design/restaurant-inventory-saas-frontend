// frontend/components/OutletSelector.tsx
"use client";

import { useState } from "react";
import { useOutlet } from "@/lib/outlet-context";
import CreateOutletModal from "./CreateOutletModal";

export default function OutletSelector() {
  const { outlets, activeOutlet, setActiveOutletId, loading } = useOutlet();
  const [open, setOpen] = useState(false);

  if (loading) return null;

  return (
    <>
      {outlets.length === 0 ? (
        <span className="text-sm text-slate-400">No outlet</span>
      ) : (
        <select
          value={activeOutlet?.id}
          onChange={(e) => {
            if (e.target.value === "__add__") {
              setOpen(true);
              return;
            }
            setActiveOutletId(e.target.value);
          }}
          className="rounded-md bg-slate-800 px-3 py-1.5 text-sm text-white"
        >
          {outlets.map((o) => (
            <option key={o.id} value={o.id}>
              {o.name}
            </option>
          ))}
          <option value="__add__">＋ Add outlet</option>
        </select>
      )}

      <CreateOutletModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
