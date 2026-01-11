"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { validateInvite, acceptInvite } from "@/lib/api/auth";

type InvitePreview = {
  email: string;
  role: string;
  organization: {
    id: string;
    name: string;
  };
};

export default function AcceptInviteClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [invite, setInvite] = useState<InvitePreview | null>(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      setError("Invalid invite link");
      setLoading(false);
      return;
    }

    validateInvite(token)
      .then(setInvite)
      .catch((err: Error) => {
        if (err.message === "INVITE_EXPIRED") {
          setError("This invite has expired. Please ask the owner to resend.");
        } else if (err.message === "INVITE_ALREADY_USED") {
          setError("This invite has already been used.");
        } else {
          setError("Invalid invite link.");
        }
      })
      .finally(() => setLoading(false));
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setSubmitting(true);

      await acceptInvite({
        token: token!,
        password,
      });

      setSuccess(true);

      setTimeout(() => {
        router.push("/login?inviteAccepted=true");
      }, 1500);
    } catch (err) {
      setError(
        err instanceof Error
          ? "Something went wrong while setting your password."
          : "Unknown error"
      );
    } finally {
      setSubmitting(false);
    }
  };

  /* ---------- UI STATES ---------- */

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-slate-400">
        Verifying invite…
      </div>
    );
  }

  if (error && !invite) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="rounded-lg border border-slate-800 bg-slate-900 p-6 text-center">
          <h2 className="mb-2 text-lg font-semibold text-red-400">
            Invite Error
          </h2>
          <p className="text-slate-300">{error}</p>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-950">
        <div className="rounded-lg border border-slate-800 bg-slate-900 p-6 text-center">
          <h2 className="mb-2 text-lg font-semibold text-green-400">
            Invite accepted 🎉
          </h2>
          <p className="text-slate-300">Redirecting to login…</p>
        </div>
      </div>
    );
  }

  if (!invite) return null;

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950">
      {/* form unchanged */}
    </div>
  );
}
