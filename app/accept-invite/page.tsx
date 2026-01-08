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

export default function AcceptInvitePage() {
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

  /* ----------------------------------------
     VALIDATE INVITE ON LOAD
  ----------------------------------------- */
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

  /* ----------------------------------------
     SUBMIT PASSWORD
  ----------------------------------------- */
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
      if (err instanceof Error) {
        if (err.message === "INVITE_EXPIRED") {
          setError("This invite has expired.");
        } else if (err.message === "INVITE_ALREADY_USED") {
          setError("This invite has already been used.");
        } else {
          setError(
            "Something went wrong while setting your password. Please try again."
          );
        }
      }
    } finally {
      setSubmitting(false);
    }
  };

  /* ----------------------------------------
     LOADING STATE
  ----------------------------------------- */
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-slate-400">
        Verifying invite…
      </div>
    );
  }

  /* ----------------------------------------
     ERROR STATE (TERMINAL)
  ----------------------------------------- */
  if (error && !invite) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="rounded-lg border border-slate-800 bg-slate-900 p-6 text-center">
          <h2 className="mb-2 text-lg font-semibold text-red-400">
            Invite Error
          </h2>
          <p className="text-slate-300">{error}</p>
          <p className="mt-3 text-sm text-slate-400">
            Please ask the restaurant owner to resend the invite.
          </p>
        </div>
      </div>
    );
  }

  /* ----------------------------------------
     SUCCESS STATE
  ----------------------------------------- */
  if (success) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-950">
        <div className="rounded-lg border border-slate-800 bg-slate-900 p-6 text-center">
          <h2 className="mb-2 text-lg font-semibold text-green-400">
            Invite accepted 🎉
          </h2>
          <p className="text-slate-300">
            Your account has been activated. Redirecting to login…
          </p>
        </div>
      </div>
    );
  }

  if (!invite) return null;

  /* ----------------------------------------
     MAIN FORM
  ----------------------------------------- */
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950">
      <div className="w-full max-w-md rounded-lg border border-slate-800 bg-slate-900 p-6">
        <h1 className="mb-1 text-xl font-semibold text-slate-100">
          You’re invited to join 🎉
        </h1>

        <p className="mb-4 text-sm text-slate-400">
          Join <b>{invite.organization.name}</b> as <b>{invite.role}</b>
        </p>

        <div className="mb-4 rounded bg-slate-800 p-3 text-sm text-slate-300">
          {invite.email}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              placeholder="Create password"
              value={password}
              disabled={submitting}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded bg-slate-800 px-3 py-2 text-slate-100"
              required
            />
            <p className="mt-1 text-xs text-slate-400">
              Minimum 8 characters. Use a strong password.
            </p>
          </div>

          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            disabled={submitting}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full rounded bg-slate-800 px-3 py-2 text-slate-100"
            required
          />

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            disabled={submitting}
            className="w-full rounded bg-blue-600 py-2 text-white disabled:opacity-60"
          >
            {submitting ? "Setting password…" : "Accept Invite"}
          </button>
        </form>
      </div>
    </div>
  );
}
