"use client";

import { useState } from "react";
import { login, signup } from "@/lib/api/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // signup modal state
  const [showSignup, setShowSignup] = useState(false);
  const [signupForm, setSignupForm] = useState({
    organizationName: "",
    name: "",
    email: "",
    password: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleLogin = async () => {
    try {
      await login(email, password);
      window.location.href = "/dashboard";
    } catch {
      setError("Invalid email or password");
    }
  };

  const handleSignup = async () => {
    setSubmitting(true);
    try {
      await signup(signupForm);
      window.location.href = "/dashboard";
    } catch (e) {
      alert("Signup failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-700">
      <div className="w-full max-w-sm space-y-4 rounded-lg bg-slate-900 p-6">
        <h1 className="text-2xl font-bold text-blue-500">Login</h1>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <input
          className="w-full rounded border border-slate-700 bg-slate-800 p-2 text-white"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full rounded border border-slate-700 bg-slate-800 p-2 text-white"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full rounded bg-blue-600 py-2 text-white hover:bg-blue-500"
        >
          Login
        </button>

        {/* Signup trigger */}
        <p className="text-center text-sm text-slate-400">
          New restaurant?{" "}
          <button
            onClick={() => setShowSignup(true)}
            className="text-blue-400 hover:underline"
          >
            Create an account
          </button>
        </p>
      </div>

      {/* Signup Modal */}
      {showSignup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-700">
          <div className="w-full max-w-md rounded-lg bg-slate-900 p-6">
            <h2 className="mb-4 text-lg font-semibold text-white">
              Create your restaurant
            </h2>

            <div className="space-y-3">
              <input
                placeholder="Restaurant name"
                className="w-full rounded bg-slate-800 p-2 text-white"
                value={signupForm.organizationName}
                onChange={(e) =>
                  setSignupForm({
                    ...signupForm,
                    organizationName: e.target.value,
                  })
                }
              />

              <input
                placeholder="Owner name"
                className="w-full rounded bg-slate-800 p-2 text-white"
                value={signupForm.name}
                onChange={(e) =>
                  setSignupForm({
                    ...signupForm,
                    name: e.target.value,
                  })
                }
              />

              <input
                placeholder="Email"
                type="email"
                className="w-full rounded bg-slate-800 p-2 text-white"
                value={signupForm.email}
                onChange={(e) =>
                  setSignupForm({
                    ...signupForm,
                    email: e.target.value,
                  })
                }
              />

              <input
                placeholder="Password"
                type="password"
                className="w-full rounded bg-slate-800 p-2 text-white"
                value={signupForm.password}
                onChange={(e) =>
                  setSignupForm({
                    ...signupForm,
                    password: e.target.value,
                  })
                }
              />
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setShowSignup(false)}
                className="text-sm text-slate-400"
              >
                Cancel
              </button>
              <button
                disabled={submitting}
                onClick={handleSignup}
                className="rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-500"
              >
                {submitting ? "Creating..." : "Create account"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
