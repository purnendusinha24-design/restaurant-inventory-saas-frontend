"use client";

import { useEffect, useState } from "react";
import { useOutlet } from "@/lib/outlet-context";
import CreateOutletModal from "@/components/CreateOutletModal";
import Button from "@/components/ui/Button";

export default function OutletBootstrap() {
  const { outlets, loading } = useOutlet();

  // ✅ local UI control
  const [open, setOpen] = useState(false);

  // auto-open ONCE when user has no outlets
  useEffect(() => {
    if (!loading && outlets.length === 0) {
      setOpen(true);
    }
  }, [loading, outlets.length]);

  if (loading) return null;

  return (
    <>
      {/* Modal */}
      <CreateOutletModal open={open} onClose={() => setOpen(false)} />

      {/* Optional soft banner instead of forcing */}
      {outlets.length === 0 && !open && (
        <div className="fixed bottom-4 right-4 z-40 rounded-lg bg-slate-900 p-4 shadow-lg">
          <p className="text-sm text-slate-300 mb-2">
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
