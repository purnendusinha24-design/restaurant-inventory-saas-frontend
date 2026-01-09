"use client";

import { useState } from "react";
import { createOutlet, createFirstOutlet } from "@/lib/api/outlets";
import { useOutlet } from "@/lib/outlet-context";

type CreateOutletModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function CreateOutletModal({
  open,
  onClose,
}: CreateOutletModalProps) {
  const { outlets, addOutlet } = useOutlet();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  async function handleCreate() {
    if (!name.trim() || loading) return;

    setLoading(true);
    setError(null);

    try {
      const payload = {
        name: name.trim(),
        address: address.trim() || undefined,
      };

      const outlet =
        outlets.length === 0
          ? await createFirstOutlet(payload)
          : await createOutlet(payload);

      addOutlet(outlet);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create outlet");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-full max-w-md rounded-xl bg-slate-900 p-6 shadow-xl">
        <h2 className="text-lg font-semibold text-white">Create Outlet</h2>

        <p className="mt-1 text-sm text-slate-400">
          You can create an outlet now or later. Some features require at least
          one outlet.
        </p>

        <div className="mt-4 space-y-3">
          <input
            className="w-full rounded-md bg-slate-300 px-3 py-2 text-sm text-black"
            placeholder="Outlet name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
          />

          <input
            className="w-full rounded-md bg-slate-300 px-3 py-2 text-sm text-black"
            placeholder="Address (optional)"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          {error && <p className="text-sm text-red-400">{error}</p>}
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md bg-slate-800 px-4 py-2 text-sm text-white hover:bg-slate-700"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleCreate}
            disabled={loading}
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
          >
            {loading ? "Creating…" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}
