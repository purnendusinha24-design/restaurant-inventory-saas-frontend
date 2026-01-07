"use client";

import { useState } from "react";
import { createUser } from "@/lib/api/users";

type Props = {
  onClose: () => void;
  onCreated: (user: any) => void;
};

export function AddUserModal({ onClose, onCreated }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState<"MANAGER" | "STAFF">("STAFF");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const user = await createUser({
        name,
        email,
        phone: phone.startsWith("+") ? phone.slice(1) : phone,
        role,
      });

      // 👉 Build invite URL
      const inviteUrl = `${window.location.origin}/accept-invite?token=${user.inviteToken}`;

      const message = encodeURIComponent(
        `You've been invited to join the restaurant system.\n\nSet your password here:\n${inviteUrl}`
      );

      const whatsappUrl = `https://wa.me/${user.phone}?text=${message}`;

      window.open(whatsappUrl, "_blank");

      onCreated(user);
      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to send invite");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-full max-w-md rounded-lg bg-slate-900 p-6 border border-slate-700">
        <h2 className="text-lg font-semibold text-slate-100 mb-4">
          Invite User via WhatsApp
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            required
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded bg-slate-800 px-3 py-2 text-slate-100"
          />

          <input
            required
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded bg-slate-800 px-3 py-2 text-slate-100"
          />

          <input
            required
            type="tel"
            placeholder="WhatsApp Number (e.g. +919876543210)"
            value={phone}
            onChange={(e) => {
              // allow only numbers
              const value = e.target.value.replace(/[^\d+]/g, "");

              // allow only one leading +
              if (value.startsWith("+")) {
                setPhone("+" + value.slice(1).replace(/\+/g, ""));
              } else {
                setPhone(value.replace(/\+/g, ""));
              }
            }}
            className="w-full rounded bg-slate-800 px-3 py-2 text-slate-100"
            minLength={10}
            maxLength={15}
          />
          <p className="text-xs text-slate-400">
            Include country code. Example: +91XXXXXXXXXX
          </p>

          <select
            value={role}
            onChange={(e) => setRole(e.target.value as any)}
            className="w-full rounded bg-slate-800 px-3 py-2 text-slate-100"
          >
            <option value="STAFF">Staff</option>
            <option value="MANAGER">Manager</option>
          </select>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-slate-300"
            >
              Cancel
            </button>

            <button
              disabled={loading}
              className="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-60"
            >
              {loading ? "Sending…" : "Send Invite"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
