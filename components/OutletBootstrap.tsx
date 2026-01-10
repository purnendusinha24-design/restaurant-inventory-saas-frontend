"use client";

import { useEffect, useState } from "react";
import { useOutlet } from "@/lib/outlet-context";
import CreateOutletModal from "@/components/CreateOutletModal";
import Button from "@/components/ui/Button";

export default function OutletBootstrap() {
  const { outlets, loading, activeOutlet, setActiveOutletId } = useOutlet();
  const [open, setOpen] = useState(false);

  // 1️⃣ Auto-open create modal if no outlets
  useEffect(() => {
    if (!loading && outlets.length === 0) {
      setOpen(true);
    }
  }, [loading, outlets.length]);

  // 2️⃣ 🔥 AUTO-SELECT first outlet if none selected
  useEffect(() => {
    if (!loading && outlets.length > 0 && !activeOutlet) {
      setActiveOutletId(outlets[0].id);
    }
  }, [loading, outlets, activeOutlet, setActiveOutletId]);

  if (loading) return null;

  return (
    <>
      <CreateOutletModal open={open} onClose={() => setOpen(false)} />

      {outlets.length === 0 && !open && (
        <div className="fixed bottom-4 right-4 z-40 rounded-lg bg-slate-900 p-4 shadow-lg">
          <p className="mb-2 text-sm text-slate-300">
            Create an outlet to unlock all features
          </p>
          <Button size="sm" onClick={() => setOpen(true)}>
            Create Outlet
          </Button>
        </div>
      )}
    </>
  );
}
